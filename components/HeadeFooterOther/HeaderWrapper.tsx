"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";

const HeaderWrapper = () => {
  const pathname = usePathname();

  if (
    pathname.includes("/profile") ||
    pathname.includes("register") ||
    pathname.includes("/login")
  ) {
    return null;
  }

  return <Header />;
};

export default HeaderWrapper;
