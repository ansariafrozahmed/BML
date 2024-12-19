import type { Metadata } from "next";
import "./globals.css";
import "@shopify/polaris/build/esm/styles.css";
import NextTopLoader from "nextjs-toploader";
import ProviderComp from "@/components/provider";

import {
  defaultDescription,
  defaultTitle,
  frontendURL,
  openGraphImage,
} from "@/lib/constants";
import CustomLightBox from "@/components/Gallery/CustomLightBox";
import AosComp from "@/components/Aos";
import HeaderWrapper from "@/components/HeadeFooterOther/HeaderWrapper";
import FooterWrapper from "@/components/HeadeFooterOther/FooterWrapper";
import Header from "@/components/HeadeFooterOther/Header";
import Footer from "@/components/HeadeFooterOther/Footer";
// import ogImage from "@/assets/images/og.png";

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: `${frontendURL}`,
    type: "website",
    images: [
      {
        url: `/og.webp`,
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
    images: [`/og.webp`],
  },
  alternates: {
    canonical: `${frontendURL}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <NextTopLoader color="#EE851C" showSpinner={false} />
        <ProviderComp>
          <HeaderWrapper />
          <AosComp />
          {children}
          <CustomLightBox />
          <FooterWrapper />
        </ProviderComp>
      </body>
    </html>
  );
}
