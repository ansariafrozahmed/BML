import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/HeadeFooterOther/Header";
import Footer from "@/components/HeadeFooterOther/Footer";
import AnnouncementBarV1 from "@/components/HeadeFooterOther/AnnouncementBarV1";
import NextTopLoader from "nextjs-toploader";
import HeaderWrapper from "@/components/HeadeFooterOther/HeaderWrapper";
import FooterWrapper from "@/components/HeadeFooterOther/FooterWrapper";
import ProviderComp from "@/components/provider";

export const metadata: Metadata = {
  title: "Bappa Majha Laadka",
  description: "Bappa Majha Laadka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-serif`}>
        <NextTopLoader color="#EE851C" showSpinner={false} />
        {/* <HeaderWrapper /> */}
        <ProviderComp>{children}</ProviderComp>
        {/* <FooterWrapper /> */}
      </body>
    </html>
  );
}
