"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FixedWhatsapp from "../Features/FixedWhatsapp";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-dark">
      <div className="templateContainer grid grid-cols-1 md:grid-cols-4 py-4 md:py-6 lg:py-10 gap-8">
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
          <p className="text-base w-full font-normal text-gray-700">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
          </p>
        </div>
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl text-primary tracking-wide font-normal">
            HELPFUL LINKS
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-primaryGreen"></div>
          <div className="flex flex-col gap-4 text-primaryDark text-xs tracking-widest font-medium uppercase">
            <Link href={"/"}>FAQs</Link>
            <Link href={"/"}>Terms & Conditions</Link>
            <Link href={"/"}>Privacy Policy</Link>
            <Link href={"/"}>Refund Policy</Link>
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl text-primary tracking-wide font-normal">
            USEFUL DETAILS
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-primaryGreen"></div>
          <div className="flex flex-col gap-4 text-primaryDark text-xs tracking-widest font-medium uppercase">
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Register</Link>
            <Link href={"/"}>Login</Link>
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl uppercase text-primary font-normal">
            Contact Details
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-primaryGreen"></div>
          <div className="flex flex-col gap-5 text-primaryDark text-sm tracking-widest font-medium">
            <div className="flex items-center gap-2">
              <img
                src="/social media icons/whatsapp.png"
                className="h-6"
                alt=""
              />
              <a className="hover:text-primaryGreen" href="tel:1234567890">
                +91 12345 67890
              </a>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/social media icons/telephone.png"
                className="h-6"
                alt=""
              />
              <a className="hover:text-primaryGreen" href="tel:1234567890">
                +91 12345 67890
              </a>
            </div>
            <div className="flex items-center gap-2">
              <img src="/social media icons/gmail.png" className="h-6" alt="" />
              <a
                className="hover:text-primaryGreen"
                href="mailto:info@bappamajhalaadka.com"
              >
                info@bappamajhalaadka.com
              </a>
            </div>
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
      {/* ---------- */}
      <FixedWhatsapp />
    </div>
  );
};

export default Footer;
