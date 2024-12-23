"use client";
import React from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { allowedPaths } from "@/lib/constants";

const HeaderWrapper = () => {
  const pathname = usePathname();

  // Check if pathname matches allowed paths or ends with 'subscription'
  const shouldShowHeader =
    allowedPaths.includes(pathname) || pathname.endsWith("subscription");

  return shouldShowHeader ? <Header /> : null;
};

export default HeaderWrapper;
