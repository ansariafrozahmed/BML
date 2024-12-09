import Footer from "@/components/HeadeFooterOther/Footer";
import Header from "@/components/HeadeFooterOther/Header";
import {
  defaultDescription,
  defaultTitle,
  frontendURL,
  openGraphImage,
} from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Refund Policy | Bappa Majha Laadka`,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: `${frontendURL}`,
    type: "website",
    images: [
      {
        url: `${frontendURL}${openGraphImage}`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${frontendURL}${openGraphImage}`],
  },
  alternates: {
    canonical: `${frontendURL}/refund-policy`,
  },
};

const Refund = () => {
  return (
    <>
      <Header />
      <section className="bg-gray-50 p-6 sm:p-10 lg:p-16 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Refund Policy
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Last Updated:{" "}
            <span className="font-medium">10th December 2024</span>
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Free Trial Period
              </h2>
              <p className="text-gray-700">
                All users are eligible for a 6-month free trial if they register
                before <strong>15th February 2025</strong>
                or a 3-month free trial if they register between{" "}
                <strong>16th February 2025 to 15th August 2025</strong>.
              </p>
              <p className="text-gray-700">
                No charges are incurred during the free trial; hence, no refunds
                apply for this period.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Paid Subscription Refunds
              </h2>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Eligibility for Refunds:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">
                  Refunds are applicable only if a technical issue or error
                  caused by BappaMajhaLaadka.com prevents you from using the
                  service.
                </li>
                <li className="text-gray-700">
                  Refund requests must be made within <strong>7 days</strong> of
                  the payment date.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Non-Refundable Cases:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">
                  If you decide to discontinue the service after using it
                  without any issues.
                </li>
                <li className="text-gray-700">
                  Refunds are not provided for partially unused subscription
                  periods.
                </li>
                <li className="text-gray-700">
                  Payments made through promotional offers or discounts are
                  non-refundable.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Process for Refund Requests
              </h2>
              <p className="text-gray-700">
                To request a refund, email us at{" "}
                <a
                  href="mailto:techmobilize@gmail.com"
                  className="text-blue-600 underline"
                >
                  techmobilize@gmail.com
                </a>{" "}
                with the following details:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li className="text-gray-700">Name and registered email ID.</li>
                <li className="text-gray-700">
                  Payment receipt or transaction ID.
                </li>
                <li className="text-gray-700">Description of the issue.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our team will review your request and respond within{" "}
                <strong>5–7 business days</strong>. Approved refunds will be
                processed within <strong>10 business days</strong> via the
                original payment method.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Changes to the Refund Policy
              </h2>
              <p className="text-gray-700">
                We reserve the right to update this refund policy at any time.
                Changes will be effective immediately upon posting on this page.
              </p>
              <p className="text-gray-700 mt-4">
                For any further questions or concerns, feel free to contact us
                at:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:techmobilize@gmail.com"
                  className="text-blue-600 underline"
                >
                  techmobilize@gmail.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <a href="tel:+918652885995" className="text-blue-600 underline">
                  8652885995
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Refund;
