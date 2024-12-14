"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FixedWhatsapp from "../Features/FixedWhatsapp";
import FixedSocialMedia from "../Features/FixedSocialMedia";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-dark">
      <div className="templateContainer grid grid-cols-1 md:grid-cols-4 py-4 md:py-6 lg:py-10 gap-8">
        <div className="space-y-5">
          <div className="w-full text-center">
            <Image
              src="/logo.webp"
              alt=""
              className="w-[60%] lg:w-[90%] object-contain"
              height={200}
              width={250}
              priority
            />
          </div>
          {/* <p className="text-base w-full font-normal text-gray-700">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
          </p> */}
        </div>
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl text-primary tracking-wide font-normal">
            HELPFUL LINKS
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-pritext-primary"></div>
          <div className="flex flex-col gap-4 text-primaryDark text-xs tracking-widest font-medium uppercase">
            <Link href={"/faqs"}>FAQs</Link>
            <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
            <Link href={"/refund-policy"}>Refund Policy</Link>
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl text-primary tracking-wide font-normal">
            USEFUL DETAILS
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-pritext-primary"></div>
          <div className="flex flex-col gap-4 text-primaryDark text-xs tracking-widest font-medium uppercase">
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/register"}>Register</Link>
            <Link href={"/login"}>Login</Link>
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl uppercase text-primary font-normal">
            Contact Details
          </h2>
          <div className="h-[2px] rounded-full w-24 bg-pritext-primary"></div>
          <div className="flex flex-col gap-5 text-primaryDark text-sm tracking-widest font-medium">
            <div className="flex items-center gap-2">
              <img
                src="/social media icons/whatsapp.png"
                className="h-6"
                alt=""
              />
              <a
                className="hover:text-primary"
                href="https://wa.me/+917021187655"
              >
                +91 70211 87655
              </a>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/social media icons/telephone.png"
                className="h-6"
                alt=""
              />
              <a className="hover:text-primary" href="tel:+918652885995">
                +91 86528 85995
              </a>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/social media icons/location-pin.png"
                className="h-6"
                alt=""
              />
              <span className="hover:text-primary">
                1904/D-1, Shreepati Castle, Khetwadi Back Road, Mumbai, MH,
                400004
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/social media icons/gmail.png" className="h-6" alt="" />
              <a
                className="hover:text-primary"
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
        <span className="text-primary font-medium">Bappa Majha Laadka</span> |
        All Rights Reserved
      </p>
      {/* ---------- */}
      <FixedWhatsapp />
      <FixedSocialMedia />
    </div>
  );
};

export default Footer;
