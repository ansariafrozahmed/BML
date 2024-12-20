"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";
import { allowedPaths } from "@/lib/constants";

const FooterWrapper = () => {
  const pathname = usePathname();

  const shouldShowHeader = allowedPaths.includes(pathname);

  return shouldShowHeader ? (
    <>
      <Footer />
    </>
  ) : null;
};

export default FooterWrapper;
