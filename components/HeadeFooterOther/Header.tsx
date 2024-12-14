"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import AnnouncementBarV1 from "./AnnouncementBarV1";
import ValidateUser from "@/lib/validateUser";
import { Popover } from "antd";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<{
    status?: any;
    username?: any;
    error?: any;
  } | null>(null);
  const path = usePathname();

  const menu = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/about",
      label: "About Us",
    },
    {
      path: "/faqs",
      label: "FAQs",
    },
    // {
    //   path: "/contact",
    //   label: "Contact Us",
    // },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    document.cookie = "BMLTK=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(null);
  };

  const renderProfileDropdown = (username: string) => {
    return (
      <div className="min-w-40">
        <Link
          href={`/${username}`}
          className="block w-full hover:text-primary hover:bg-gray-100 cursor-pointer p-2 rounded"
        >
          My Profile
        </Link>
        <div
          onClick={handleLogout}
          className="hover:bg-gray-100 cursor-pointer p-2 rounded"
        >
          Logout
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getUserStatus = async () => {
      if (!isLoggedIn) {
        const result = await ValidateUser();
        setIsLoggedIn(result);
      }
    };

    getUserStatus();
  }, []);

  return (
    <>
      <AnnouncementBarV1 />
      <div
        data-aos="zoom-out"
        className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] z-[999] bg-white"
      >
        <header className="w-full templateContainer flex items-center justify-between py-2 px-4 md:px-8">
          <Link href={"/"} className="block h-[50px] w-auto">
            <Image
              src={"/logo.webp"}
              className="h-full w-full object-contain"
              alt="Logo"
              priority
              height={500}
              width={500}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {menu.map((item, index) => {
              return (
                <Link href={item.path} key={index}>
                  <span
                    className={`block font-normal text-sm text-dark tracking-wide ${
                      path === item.path ? "active-class" : "hover-class"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div>
            {isLoggedIn?.status ? (
              <Popover
                content={() => renderProfileDropdown(isLoggedIn?.username)}
                placement="bottom"
              >
                <button className="px-7 py-3 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-normal">
                  My Account
                </button>
              </Popover>
            ) : (
              // <div className="space-x-2">
              //   <Link href={`/login`} className="">
              //     <button className="px-7 py-2.5 hover:scale-105 transition-all  ease-in-out border border-dark text-dark duration-200 text-sm bg-white rounded-full leading-none tracking-wide font-normal">
              //       Login
              //     </button>
              //   </Link>
              <Link href={`/register`} className="">
                <button className="px-7 py-2.5 border border-dark hover:scale-105 transition-all  ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-normal">
                  Register for free
                </button>
              </Link>
              // </div>
            )}
          </div>

          <button
            className="lg:hidden text-2xl"
            onClick={toggleDrawer}
            aria-label="Menu"
          >
            ☰
          </button>
        </header>

        {/* Mobile Drawer */}
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
              isDrawerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleDrawer}
          ></div>

          {/* Drawer */}
          <div
            className={`lg:hidden fixed top-0 left-0 h-full w-[90%] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="w-full relative flex items-center justify-start px-6 shadow-lg py-3">
              <div className="h-[55px]">
                <Image
                  src={"/logo.webp"}
                  className="h-full w-full object-contain"
                  alt="Logo"
                  priority
                  height={500}
                  width={500}
                />
              </div>
              <button
                className="self-end text-xl absolute top-4 right-4"
                onClick={toggleDrawer}
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              {menu.map((item, index) => (
                <Link href={item.path} key={index}>
                  <span className="text-sm" onClick={toggleDrawer}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Header;
