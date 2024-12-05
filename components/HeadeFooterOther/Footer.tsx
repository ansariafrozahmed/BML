"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100">
      <div className="templateContainer grid grid-cols-1 md:grid-cols-3 py-4 md:py-6 lg:py-10 gap-8">
        <div className="space-y-5">
          <div className="w-full">
            <Image
              src="/logo.webp"
              alt=""
              className="w-24 lg:w-32 object-contain"
              height={100}
              width={250}
              priority
            />
          </div>
          <p className="text-sm tracking-wide w-full text-left leading-relaxed text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
            vitae dolorem fugiat nostrum iusto facilis harum tempora commodi
            eius soluta ipsum accusamus maxime, quasi recusandae cupiditate
            animi nulla? Atque, deleniti.
          </p>
        </div>
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl text-primaryGreen font-normal">
            USEFUL DETAILS
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-primaryGreen"></div>
          <div className="flex flex-col gap-4 text-primaryDark text-xs tracking-widest font-medium uppercase">
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>FAQs</Link>
            <Link href={"/"}>Contact Us</Link>
            <Link href={"/"}>Register</Link>
            <Link href={"/"}>Login</Link>
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl uppercase text-primaryGreen font-normal">
            Contact Details
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-primaryGreen"></div>
          <div className="flex flex-col gap-5 text-primaryDark text-xs tracking-widest font-medium">
            <a className="hover:text-primaryGreen" href="tel:1234567890">
              +91 12345 67890
            </a>
            <a
              className="hover:text-primaryGreen"
              href="mailto:info@bappamajhalaadka.com"
            >
              info@bappamajhalaadka.com
            </a>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center bg-dark text-white text-sm py-4">
        Copyright 2024{" "}
        <span className="text-primaryGreen font-medium">
          Bappa Majha Laadka
        </span>{" "}
        | All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
