"use client";
import React from "react";
import ProfileTabs from "../Tabs/ProfileTabs";
import ProfileSidebar from "../Gallery/ProfileSidebar";
import Shareprofile from "../Gallery/Shareprofile";
import Image from "next/image";
import SocialMediaLinks from "../HeadeFooterOther/SocialMediaLinks";
import EditBanner from "../UserEdit/EditBanner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
    social_links: {
      key: string;
      url: string;
    }[];
    status: boolean;
    user_id: number;
    username: string;
  };
  username: string;
  isLoggedIn: any;
  isEdit: any;
}

const Layout01: React.FC<Layout01Props> = ({
  userData,
  username,
  isLoggedIn,
  isEdit,
}) => {
  const userProfile = useSelector((state: RootState) => state.userProfile);

  // Check if isEdit is true or 'true' string
  const isEditMode = isEdit === true || isEdit === "true";

  // Fallback to userData if userProfile is missing certain data (e.g., banner_image)
  let bannerImage =
    (userProfile?.banner_image?.url as any) ||
    `${process.env.BACKEND}/upload/banner/${userData.banner_image}`;

  // Handle the case where the banner image might be a Blob
  if (isEditMode && bannerImage instanceof Blob) {
    bannerImage = URL.createObjectURL(bannerImage); // Convert Blob to URL for preview
  }

  return (
    <div className="">
      <div className={`group h-[250px] lg:h-[350px] relative `}>
        <Image
          src={
            bannerImage
              ? bannerImage // If it's a Blob, use the URL created from Blob
              : "https://nichemedia.co.nz/wp-content/uploads/2023/03/placeholder-banner.png"
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
          <div className="group-hover:bg-black/40 transition-all ease duration-100 absolute inset-0 "></div>
        )}
        <div className="absolute inset-0 templateContainer flex items-end justify-start pb-10">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-5xl font-light text-white">
              {userData?.username}
            </h1>
            <SocialMediaLinks
              socialMedia={
                (userProfile?.social_links?.length > 0 &&
                  userProfile?.social_links) ||
                (userData?.social_links as any)
              }
            />
          </div>
        </div>
      </div>
      {/* ----------- */}
      <div className="templateContainer flex flex-col lg:flex-row gap-16 w-full">
        <div className="w-full lg:w-[70%]">
          <ProfileTabs userData={userData} />
        </div>
        <div className="w-full lg:w-[30%] space-y-5 lg:sticky top-0 h-full">
          <ProfileSidebar />
          <div className="p-5 space-y-2 rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <h2 className="text-xl font-semibold tracking-wider text-primary">
              Bio
            </h2>
            <div>
              <p className="text-sm tracking-wider text-gray-700 leading-relaxed">
                {userData?.bio}
              </p>
            </div>
          </div>
          <Shareprofile username={username} />
        </div>
      </div>
    </div>
  );
};

export default Layout01;
