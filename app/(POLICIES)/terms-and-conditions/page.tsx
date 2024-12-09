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
  title: `Terms & Conditions | Bappa Majha Laadka`,
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
    canonical: `${frontendURL}/terms-and-conditions`,
  },
};

const Terms = () => {
  return (
    <>
      <Header />
      <section className="bg-gray-50 p-6 sm:p-10 lg:p-16 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Last Updated:{" "}
            <span className="font-medium">10th December 2024</span>
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By using bappamajhalaadka.com, you agree to these Terms and
                Conditions and our Privacy Policy. If you do not agree, you may
                not access or use our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Eligibility
              </h2>
              <p className="text-gray-700">
                You must be at least 18 years old or have parental consent to
                use our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. User Responsibilities
              </h2>
              <p className="text-gray-700">
                Ensure the information you provide is accurate and complete.
                Avoid uploading inappropriate or offensive content, including
                but not limited to illegal, defamatory, or copyrighted material.
                Do not misuse the website to distribute spam, malware, or engage
                in fraudulent activities.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Account and Profile Creation
              </h2>
              <p className="text-gray-700">
                Users are responsible for maintaining the confidentiality of
                their login credentials. BappaMajhaLaadka.com is not liable for
                any unauthorized access or activities under your account.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Content Ownership
              </h2>
              <p className="text-gray-700">
                Users retain ownership of the content they upload. By submitting
                content, you grant us a non-exclusive, royalty-free license to
                use, display, and share it on our platform. You warrant that you
                own or have the right to upload all content shared on our
                website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. Subscription and Free Trial
              </h2>
              <p className="text-gray-700">
                Free trial for up to 6 months is offered for profiles created
                before <strong>15th February 2025</strong>. Free trial for up to
                3 months is offered for profiles created from{" "}
                <strong>16th February 2025 to 15th August 2025</strong>. After
                the trial period, a subscription fee of INR 360/year applies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                BappaMajhaLaadka.com is not liable for loss or damage caused by
                the misuse of the website or for temporary unavailability or
                technical issues.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                8. Termination of Access
              </h2>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate accounts for
                violations of these Terms or misuse of our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                9. Governing Law
              </h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of India. Any disputes
                shall be resolved exclusively in the courts of{" "}
                <strong>Mumbai jurisdiction</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                10. Amendments
              </h2>
              <p className="text-gray-700">
                We may revise these Terms at any time. Continued use of the
                website constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Contact Us
              </h2>
              <p className="text-gray-700">
                For questions, contact us at{" "}
                <a
                  href="mailto:techmobilize@gmail.com"
                  className="text-primary underline"
                >
                  techmobilize@gmail.com
                </a>{" "}
                or WhatsApp us at{" "}
                <a
                  href="https://wa.me/+918652885995"
                  className="text-primary underline"
                >
                  8652885995
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Terms;
