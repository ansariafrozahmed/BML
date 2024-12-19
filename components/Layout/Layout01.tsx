"use client";
import React, { useEffect } from "react";
import ProfileTabs from "../Tabs/ProfileTabs";
import ProfileSidebar from "../Gallery/ProfileSidebar";
import Shareprofile from "../Gallery/Shareprofile";
import Image from "next/image";
import SocialMediaLinks from "../HeadeFooterOther/SocialMediaLinks";
import AccountandGalleryUpload from "../UserEdit/AccountandGalleryUpload";
import { Edit, House, LayoutPanelLeft } from "lucide-react";
import Link from "next/link";
import ViewsCounter from "../Tabs/ViewsCounter";
import PaymentRequestModal from "../PaymentRequestModal";
import NoticeModal from "./NoticeModal";

interface ContactDetail {
  label: string;
  value: string;
}

interface Layout01Props {
  userData: {
    banner_image: string;
    bio: string;
    contact_details: ContactDetail[];
    email: string;
    first_name: string;
    last_name: string;
    joined_at: string;
    updated_at: string;
    social_links: {
      key: string;
      url: string;
    }[];
    status: boolean;
    user_id: number;
    username: string;
    profile_views: any;
  };
  username: string;
  isLoggedIn: any;
  isEdit: any;
}

const Layout01: React.FC<Layout01Props> = ({
  userData,
  username,
  isEdit,
  isLoggedIn,
}) => {
  const profileViews = async (username: string) => {
    try {
      // Get the user's IP address
      const response = await fetch("https://api.ipify.org/?format=json");
      const { ip } = await response.json();

      // Send the IP to your backend
      const backendResponse = await fetch(
        `${process.env.BACKEND}/api/profile-views`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ip, username }),
        }
      );

      if (backendResponse.ok) {
        const result = await backendResponse.json();
        console.log(result, "Response from backend");
      } else {
        console.error(
          "Failed to send data to backend",
          backendResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  let isExpired = false;

  useEffect(() => {
    profileViews(username);
  }, []);

  return (
    <>
      {isLoggedIn.logged && (
        <>
          {/* <PaymentRequestModal userData={userData} /> */}
          <div className="bg-white flex items-center justify-center px-4 py-2">
            <Link
              href={`/${userData?.username}/edit/customizeTheme/${
                Math.random() * 100
              }`}
              className="flex gap-1 items-center"
            >
              <h2 className="text-user_primary flex items-center gap-1.5 hover:text-dark font-normal tracking-wider text-sm">
                <LayoutPanelLeft size={16} />
                Customize layout
              </h2>
            </Link>
          </div>
        </>
      )}
      <div className={`pb-28 overflow-hidden`}>
        <div className={`group h-[250px] lg:h-[350px] relative `}>
          <Image
            src={
              userData?.banner_image
                ? `${process.env.BACKEND}/upload/banner/${userData.banner_image}`
                : "/placeholder-banner.png"
            }
            alt={userData?.username}
            height={500}
            priority
            width={1500}
            className="h-full w-full object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          {isLoggedIn.logged && (
            <>
              <div className="cursor-pointer top-4 left-4 text-white absolute z-[990]">
                <Link href={"/"} className="flex gap-1 items-center">
                  <House size={15} /> <p className="mt-0.5">Home</p>
                </Link>
              </div>
            </>
          )}
          {isLoggedIn.logged && (
            <>
              <div className="bg-black/40 lg:group-hover:bg-black/40 transition-all ease duration-100 absolute inset-0 "></div>
              <div className="cursor-pointer top-4 right-4 text-white absolute z-[990]">
                <Link
                  href={`/${userData?.username}/edit/banner/${
                    Math.random() * 100
                  }`}
                  className="flex gap-1 items-center"
                >
                  <Edit size={16} /> <p>Edit</p>
                </Link>
              </div>
            </>
          )}
          <div className="absolute inset-0 templateContainer flex items-end justify-between pb-7 lg:pb-10">
            <div className="space-y-4">
              <h1 className="text-[22px] tracking-wide leading-none text-wrap lg:text-[45px] font-normal text-white">
                {userData?.username}
              </h1>

              <div className="flex items-center gap-2">
                <SocialMediaLinks socialMedia={userData?.social_links as any} />
                {isLoggedIn.logged && (
                  <>
                    <div className="cursor-pointer text-white z-[990]">
                      <Link
                        href={`/${userData?.username}/edit/socialLinks/${
                          Math.random() * 100
                        }`}
                        className="flex gap-1 items-center"
                      >
                        <Edit size={16} /> <p>Edit</p>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <ViewsCounter count={userData?.profile_views} />
            </div>
          </div>
        </div>
        {/* ----------- */}
        <div className="templateContainer flex flex-col  lg:flex-row md:gap-16 w-full">
          <div className="w-full lg:w-[70%]">
            <ProfileTabs userData={userData} isLoggedIn={isLoggedIn?.logged} />
          </div>
          <div className="w-full lg:w-[30%] space-y-5 lg:sticky top-0 h-full">
            <ProfileSidebar userData={userData} />
            <Shareprofile layout={1} username={userData?.username} />
          </div>
        </div>
      </div>
      {!isExpired && (
        <AccountandGalleryUpload
          isLoggedIn={isLoggedIn?.logged}
          token={isLoggedIn?.token}
          isEdit={isEdit === "edit"}
        />
      )}
      {/* -------------- */}
      {/* NOTICE MODAL */}
      {/* <NoticeModal /> */}
    </>
  );
};

export default Layout01;
