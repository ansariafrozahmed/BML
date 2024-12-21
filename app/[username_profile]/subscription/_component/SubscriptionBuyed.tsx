"use client";
import { getCookie, showMessage } from "@/lib/reuse";
import { Button } from "@shopify/polaris";
import React, { useState, useEffect, useCallback } from "react";

// Function to load Razorpay script dynamically, ensuring it's loaded only once
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject("Failed to load Razorpay script");
    document.body.appendChild(script);
  });
};

const SubscriptionBuyed = ({ subscriptionId, userData }: any) => {
  // State management
  const [isSUbscribedCreated, setisSUbscribedCreated] = useState(false);
  const [isSubscribedAuthenticate, setisSubscribedAuthenticate] =
    useState(false);
  const [hasPaidFirstInstallment, setHasPaidFirstInstallment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch subscription and payment status from the backend
  const fetchSubscriptionData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/getSubscriptionStatus?subscriptionId=${subscriptionId}`
      );
      const data = await response.json();
      console.log(data, "data");
      if (response.ok) {
        setisSUbscribedCreated(data.isSUbscribedCreated);
        setisSubscribedAuthenticate(data.isSubscribedAuthenticate);
        setHasPaidFirstInstallment(data.hasPaidFirstInstallment);
        setLoading(false);
      } else {
        setError("Failed to fetch subscription data");
        setLoading(false);
      }
    } catch (err) {
      setError("Error fetching subscription data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    subscriptionId ? fetchSubscriptionData() : setLoading(false);
  }, [subscriptionId]);

  console.log(subscriptionId, "subscriptionId");

  // Render subscription status based on conditions
  const renderSubscriptionStatus = () => {
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    // Case where the subscription is created but the first installment is pending
    if (isSUbscribedCreated && !hasPaidFirstInstallment) {
      return (
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Subscription Active
          </h3>
          <p className="text-gray-700">
            You have subscribed, but the Authorization is pending.
          </p>
          <Button variant="primary" onClick={handlePayment}>
            Authorize your payment
          </Button>
        </div>
      );
    }

    // Case where the subscription is created and authenticated, and first installment is paid
    if (isSubscribedAuthenticate && !hasPaidFirstInstallment) {
      return (
        <div className="bg-green-100 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Subscription Authenticated
          </h3>
          <p className="text-gray-700">Your subscription is authenticated.</p>
        </div>
      );
    }

    // Case where subscription is not active
    return (
      <div className="bg-red-100 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Subscription Required
        </h3>
        <p className="text-gray-700">You have not yet subscribed.</p>
        <Button variant="primary" onClick={handleSubscribe}>
          Subscribe Now
        </Button>
      </div>
    );
  };

  // Payment handling function
  const handlePayment = async (id: number) => {
    try {
      await loadRazorpayScript();
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: 5 * 100, // Amount in paise
        currency: "INR",
        name: "BappaMajhaLaadka",
        description: "Subscription for Your Plan",
        subscription_id: subscriptionId,
        handler: async function (response: any) {
          console.log("Payment successful:", response);
          await updateSubscriptionRecord(id);
        },
        prefill: {
          name: `${userData?.first_name} ${userData?.last_name}`,
          email: userData?.email,
          contact: userData?.contact_details?.phone,
        },
        theme: { color: "#F37254" },
        modal: {
          ondismiss: () => {
            console.log("Transaction was cancelled.");
            alert("Transaction cancelled");
            window.location.href = "/";
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        alert(response.error.description);
      });
      rzp.open();
    } catch (err) {
      console.error("Failed to load Razorpay:", err);
    }
  };

  // Update subscription status after successful payment
  const updateSubscriptionRecord = async (id: number) => {
    try {
      const backendRes = await fetch(
        `${process.env.BACKEND}/api/updateSubscriptionRecord`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getCookie("BMLTK")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscriptionId: id }),
        }
      );

      if (backendRes.ok) {
        const result = await backendRes.json();
        console.log(result, "Backend response");
        showMessage("Subscription created successfully", "success");
      } else {
        console.error(
          "Error updating subscription record:",
          await backendRes.text()
        );
      }
    } catch (err) {
      console.error("Failed to update subscription record:", err);
    }
  };

  // Subscription creation
  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.BACKEND}/api/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("BMLTK")}`,
        },
      });
      const responseData = await response.json();
      console.log(responseData, "responseData");
      if (response.ok && responseData.id) {
        await handlePayment(responseData.id);
      } else {
        setError("Failed to create subscription");
      }
    } catch (error) {
      setError("Error creating subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Subscription Plan
      </h2>
      {renderSubscriptionStatus()}
    </div>
  );
};

export default SubscriptionBuyed;
