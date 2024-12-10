import RegisterForm from "@/components/Form/RegisterForm";
import {
  defaultDescription,
  defaultTitle,
  frontendURL,
  openGraphImage,
} from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Register | Bappa Majha Laadka`,
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
    canonical: `${frontendURL}/register`,
  },
};

const Register = () => {
  return (
    <div className="bg-gray-100 h-full flex items-center justify-center">
        <RegisterForm />
    </div>
  );
};

export default Register;
