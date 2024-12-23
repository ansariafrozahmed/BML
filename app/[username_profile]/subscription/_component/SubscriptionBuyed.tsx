"use client";
import { getCookie, showMessage } from "@/lib/reuse";
import { Button } from "@shopify/polaris";
import React, { useState, useEffect, useCallback } from "react";
import {
  Pencil,
  FileText,
  Coins,
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  HelpCircle,
} from "lucide-react";

interface Order {
  id: string;
  order_id: string;
  status: string;
  subscription_id: string;
  payment_id: string;
  issued_at: number;
  gross_amount: number;
  amount_paid: number;
  currency: string;
  short_url: string;
  created_at: number;
  type: string;
}

interface OrderProps {
  [x: string]: any;
  orders: Order[];
  itemsPerPage?: number;
}

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
  const [id, setSid] = useState(null);
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

  // Render subscription status based on conditions
  const renderSubscriptionStatus: React.FC<OrderProps> = (orders) => {
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const paidInvoice =
      orders?.filter((item: Order) => item.status === "paid") || [];

    // console.log(paidInvoice);

    // Case where the subscription is created and authenticated, and first installment is paid
    if (isSubscribedAuthenticate) {
      return (
        <div className="bg-gray-50 border-l-4 border-red-500 p-5 rounded-lg shadow-md space-y-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m2-4h.01M17 9l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <h3 className="text-base font-normal text-red-700">
              Attention Required!
            </h3>
          </div>
          <p className="text-gray-800 text-sm tracking-wide">
            <span className="font-semibold">Subscription Alert:</span> To
            continue using this platform, you need to pay
            <span className="text-red-700 font-bold"> ₹360 annually.</span>
          </p>
          <div className="">
            <p className="text-gray-800 text-sm tracking-wide">
              <span className="font-semibold">Next Payment Due:</span>{" "}
              <span className="text-red-700 font-bold">
                {paidInvoice?.[0]?.billing_end
                  ? new Date(
                      paidInvoice[0].billing_end * 1000
                    ).toLocaleDateString("en-IN")
                  : "NA"}
              </span>
            </p>
          </div>
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
        subscription_id: id,
        handler: async function (response: any) {
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
        setSid(responseData.id);
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

  const RenderTable: React.FC<OrderProps> = ({ orders, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    // Get the orders for the current page
    const currentOrders = orders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const formatPrice = (price: number, currency: string) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency || "INR",
      }).format(price);
    };

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <div className="rounded shadow-md overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left bg-dark text-white">
              <tr>
                {[
                  "Sr. No.",
                  "Order Id",
                  "Issued At",
                  "Created At",
                  "Status",
                  "Amount Paid",
                  "Invoice",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 lg:px-4 lg:py-4 text-xs font-normal tracking-wide"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200 group`}
                  >
                    {/* Serial Number */}
                    <td className="p-4 text-xs font-normal tracking-wide">
                      {((currentPage - 1) * itemsPerPage + index + 1)
                        .toString()
                        .padStart(2, "0")}
                    </td>
                    <td className="p-4 text-xs font-normal tracking-wide">
                      {order.order_id || "NA"}
                    </td>
                    <td className="p-4 text-xs font-normal tracking-wide">
                      {new Date(order.issued_at * 1000).toLocaleDateString() ||
                        "NA"}
                    </td>
                    <td className="p-4 text-xs font-normal tracking-wide">
                      {new Date(order.created_at * 1000).toLocaleDateString() ||
                        "NA"}
                    </td>
                    <td
                      className={`p-4 text-xs font-normal tracking-wide ${
                        {
                          draft: "text-gray-600",
                          issued: "text-blue-600",
                          partially_paid: "text-yellow-600",
                          paid: "text-green-600",
                          expired: "text-red-600",
                          cancelled: "text-red-600",
                          deleted: "text-gray-600",
                        }[order.status] || "text-black"
                      }`}
                    >
                      <span
                        className={`flex items-center bg-gray-100 group-hover:bg-white px-2 py-2 capitalize rounded ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <span className="mr-2">
                          {{
                            draft: <Pencil size={16} />,
                            issued: <FileText size={16} />,
                            partially_paid: <Coins size={16} />,
                            paid: <CheckCircle size={16} />,
                            expired: <XCircle size={16} />,
                            cancelled: <Ban size={16} />,
                            deleted: <Trash2 size={16} />,
                          }[order.status] || <HelpCircle size={16} />}
                        </span>
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-normal tracking-wide">
                      {formatPrice(order.amount_paid, order.currency) || "NA"}
                    </td>
                    <td className="p-4 text-xs underline font-normal tracking-wide">
                      <a
                        href={order.short_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 text-center text-gray-500 font-normal"
                  >
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="templateContainer py-4 md:py-6 lg:py-10 space-y-6">
      {renderSubscriptionStatus(userData?.invoices || [])}
      <h2 className="text-2xl font-semibold text-left text-gray-800">
        My Order Details
      </h2>
      {/* <pre>{JSON.stringify(userData?.invoices, null, 2)}</pre> */}
      <RenderTable orders={userData?.invoices || []} />
    </div>
  );
};

export default SubscriptionBuyed;
