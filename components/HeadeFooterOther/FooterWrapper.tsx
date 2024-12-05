"use client";
import React from "react";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const FooterWrapper = () => {
  const pathname = usePathname();

  if (
    pathname.includes("/profile") ||
    pathname.includes("register") ||
    pathname.includes("/login")
  ) {
    return null;
  }

  return <Footer />;
};
export default FooterWrapper;
