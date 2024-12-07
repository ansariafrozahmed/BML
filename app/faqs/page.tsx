import FAQSection from "@/components/Features/FAQs";
import {
  defaultDescription,
  defaultTitle,
  frontendURL,
  openGraphImage,
} from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `FAQs | Bappa Majha Laadka`,
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
    canonical: `${frontendURL}/faqs`,
  },
};

const Faqs = () => {
  return <FAQSection />;
};

export default Faqs;
