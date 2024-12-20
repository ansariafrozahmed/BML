"use client";
import React from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { allowedPaths } from "@/lib/constants";

const HeaderWrapper = () => {
  const pathname = usePathname();

  // Show Header only if pathname matches the specified paths
  const shouldShowHeader = allowedPaths.includes(pathname);

  return shouldShowHeader ? (
    <>
      <Header />
    </>
  ) : null;
};

export default HeaderWrapper;
