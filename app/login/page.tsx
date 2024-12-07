import LoginForm from "@/components/Form/LoginForm";
import ValidateUser from "@/lib/validateUser";
import { redirect } from "next/navigation";
import {
  defaultDescription,
  defaultTitle,
  frontendURL,
  openGraphImage,
} from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Login | Bappa Majha Laadka`,
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
    canonical: `${frontendURL}/login`,
  },
};

const Loginpage = async () => {
  let isLoggedIn = await ValidateUser();

  if (isLoggedIn.status) {
    redirect(`/${isLoggedIn.username}`);
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/408.webp")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
      className="bg-gray-100 h-screen"
    >
      <div className="templateContainer h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};
export default Loginpage;
