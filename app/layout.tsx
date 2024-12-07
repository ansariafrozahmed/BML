import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/HeadeFooterOther/Header";
import Footer from "@/components/HeadeFooterOther/Footer";
import AnnouncementBarV1 from "@/components/HeadeFooterOther/AnnouncementBarV1";
import NextTopLoader from "nextjs-toploader";
import HeaderWrapper from "@/components/HeadeFooterOther/HeaderWrapper";
import FooterWrapper from "@/components/HeadeFooterOther/FooterWrapper";
import {
  defaultDescription,
  defaultTitle,
  frontendURL,
  openGraphImage,
} from "@/lib/constants";

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
      <body className={`antialiased`}>
        <NextTopLoader color="#EE851C" showSpinner={false} />
        {/* <HeaderWrapper /> */}
        {children}
        {/* <FooterWrapper /> */}
      </body>
    </html>
  );
}
