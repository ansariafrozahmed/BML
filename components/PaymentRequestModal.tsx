import { Modal, Button, Divider } from "antd";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { closeModal, togglePaymentModal } from "@/store/paymentSlice";
import axios from "axios"; // For making the API call to create the subscription
import { getCookie, showMessage } from "@/lib/reuse";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay?: any; // Replace 'any' with a proper type if you know it.
  }
}

const PaymentRequestModal = ({ userData }: any) => {
  const { paymentModal } = useSelector(
    (state: RootState) => state.paymentSlice
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle modal close and set a cookie for 24 hours
  const handleSkipForNow = () => {
    Cookies.set("hideModal", "true", { expires: 1 }); // Cookie expires in 1 day
    dispatch(togglePaymentModal());
  };

  // Function to load Razorpay script dynamically
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

  // Function for pay button action
  const handlePay = async () => {
    try {
      setLoading(true);
      // Make an API request to create a subscription
      const response = await fetch(`${process.env.BACKEND}/api/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("BMLTK")}`,
        },
      });

      const responseData = await response.json(); // Parse the JSON response

      if (response.ok && responseData.id) {
        const subscriptionId = responseData.id;
        console.log(subscriptionId, "subscriptionId");

        // Load Razorpay script dynamically
        await loadRazorpayScript();

        if (window.Razorpay) {
          const options = {
            key: process.env.RAZORPAY_KEY_ID, // Your Razorpay Key ID
            amount: 36000, // Amount in paise (₹360 = 36000 paise)
            currency: "INR",
            name: "BappaMajhaLaadka",
            description: "Subscription for Your Plan",
            subscription_id: subscriptionId, // Link it with the created subscription ID
            handler: async function (response: any) {
              console.log("Payment successful:", response);

              // Send payment details to the server for further processing
              const backendRes = await fetch(
                `${process.env.BACKEND}/api/updateSubscriptionRecord`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${getCookie("BMLTK")}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    subscriptionId,
                  }),
                }
              );

              if (backendRes.ok) {
                const result = await backendRes.json();
                console.log(result, "Backend response");
                router.push(`/${userData?.username}/subscription`);
                showMessage("Subscription created successfully", "success");
              } else {
                console.error(
                  "Error updating subscription record:",
                  await backendRes.text()
                );
              }
            },
            prefill: {
              name: `${userData?.first_name} ${userData?.last_name}`,
              email: `${userData?.email}`,
              contact: `${userData?.contact_details?.phone}`,
            },
            theme: {
              color: "#F37254",
            },
            modal: {
              ondismiss: async function () {
                console.log("Transaction was cancelled or modal was closed.");
                alert("Transaction cancelled or modal closed");
                window.location.href = "/";
              },
            },
          };

          // Open Razorpay checkout window
          const rzp = new window.Razorpay(options);
          rzp.on("payment.failed", function (response: any) {
            alert(response.error.description);
          });
          rzp.open();
        } else {
          console.error("Razorpay script not loaded");
        }
      } else {
        console.error("Subscription creation failed", responseData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      setLoading(false);
    }
  };

  // Check if the modal should be shown based on the cookie
  useEffect(() => {
    const hideModal = Cookies.get("hideModal");
    console.log(hideModal, "hideModal");
    if (!hideModal) {
      if (userData?.subscriptions?.status === "authenticated") {
        dispatch(closeModal());
      } else {
        const timer = setTimeout(() => {
          dispatch(togglePaymentModal());
        }, 5000);

        // Cleanup timer on unmount
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div>
      {/* Ant Design Modal */}
      <Modal
        title={
          <h2 className="px-4 pt-2 text-xl font-semibold">
            Subscription Plans
          </h2>
        }
        open={paymentModal}
        onCancel={() => {
          dispatch(togglePaymentModal());
        }}
        footer={[
          <Button className="mb-5 " key="skip" onClick={handleSkipForNow}>
            Skip for Now
          </Button>,
          <Button
            loading={loading}
            className="mb-5 mr-4"
            key="pay"
            type="primary"
            onClick={handlePay}
          >
            Pay ₹360
          </Button>,
        ]}
      >
        <Divider />
        <p>Add proper design for plan</p>
        <Divider />
      </Modal>
    </div>
  );
};

export default PaymentRequestModal;
