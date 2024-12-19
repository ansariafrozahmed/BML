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
  title: `Privacy & Policy | Bappa Majha Laadka`,
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
    canonical: `${frontendURL}/privacy-policy`,
  },
};

const Privacy = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="bg-gray-50 p-6 sm:p-10 lg:p-16 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Last Updated:{" "}
            <span className="font-medium">10th December 2024</span>
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Information We Collect
              </h2>
              <p className="text-gray-700">
                <strong>Personal Information:</strong> Name, email address, and
                contact details when you register.
              </p>
              <p className="text-gray-700">
                <strong>Content Information:</strong> Photos, videos, and
                descriptions you upload.
              </p>
              <p className="text-gray-700">
                <strong>Usage Data:</strong> IP address, browser type, and
                activity logs for analytics.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700">
                To provide, maintain, and improve our services.
              </p>
              <p className="text-gray-700">
                To communicate with users about updates and promotional offers.
              </p>
              <p className="text-gray-700">
                To ensure compliance with our Terms and Conditions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Cookies
              </h2>
              <p className="text-gray-700">
                We use cookies to enhance user experience:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">
                  <strong>Essential Cookies:</strong> Necessary for the
                  website’s functionality.
                </li>
                <li className="text-gray-700">
                  <strong>Performance Cookies:</strong> Collect data on user
                  interactions to improve services.
                </li>
                <li className="text-gray-700">
                  <strong>Third-Party Cookies:</strong> May be used for
                  analytics (e.g., Google Analytics).
                </li>
              </ul>
              <p className="text-gray-700">
                You can manage or disable cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Sharing Information
              </h2>
              <p className="text-gray-700">
                We do not sell or share your personal information with third
                parties except:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">With your consent.</li>
                <li className="text-gray-700">
                  To comply with legal obligations.
                </li>
                <li className="text-gray-700">
                  With service providers assisting us in maintaining the
                  website.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Data Security
              </h2>
              <p className="text-gray-700">
                We implement industry-standard measures to protect your data but
                cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. User Rights
              </h2>
              <p className="text-gray-700">
                You may request access to, modification, or deletion of your
                personal data by contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                7. Children’s Privacy
              </h2>
              <p className="text-gray-700">
                Our website is not intended for children under 13 without
                parental consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                8. Updates to this Policy
              </h2>
              <p className="text-gray-700">
                We may update this policy periodically. Changes will be posted
                on this page with a revised date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Contact Us
              </h2>
              <p className="text-gray-700">
                For any concerns, contact us at{" "}
                <a
                  href="mailto:techmobilize@gmail.com"
                  className="text-blue-600 underline"
                >
                  techmobilize@gmail.com
                </a>{" "}
                or WhatsApp us at{" "}
                <a href="tel:+918652885995" className="text-blue-600 underline">
                  8652885995
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default Privacy;
