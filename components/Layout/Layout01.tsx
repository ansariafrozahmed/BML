import React from "react";
import ProfileTabs from "../Tabs/ProfileTabs";
import ProfileSidebar from "../Gallery/ProfileSidebar";
import Shareprofile from "../Gallery/Shareprofile";
import Image from "next/image";
import OurSocialMedia from "../Gallery/OurSocialMedia";
import SocialMediaLinks from "../HeadeFooterOther/SocialMediaLinks";
import EditBanner from "../UserEdit/EditBanner";
import { Pencil } from "lucide-react";
import { QRCode } from "antd";

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
}

const Layout01: React.FC<Layout01Props> = ({
  userData,
  username,
  isLoggedIn,
}) => {
  return (
    <>
      {isLoggedIn.status && (
        <div className="bg-gradient-to-b from-black to-transparent text-white fixed w-full z-50 flex items-center gap-2 justify-center p-3">
          <Pencil size={15} />
          <span>Edit mode is on</span>
        </div>
      )}

      <div className={`group h-[250px] lg:h-[350px] relative `}>
        <Image
          src={
            userData?.banner_image
              ? `${process.env.BACKEND}/upload/banner/${userData.banner_image}`
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
        {isLoggedIn.status && (
          <div className="group-hover:bg-black/40 transition-all eas duration-100 absolute inset-0 "></div>
        )}
        <div className="absolute inset-0 templateContainer flex  items-end justify-start pb-10">
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-5xl font-light text-white">
              {userData?.username}
            </h2>
            <SocialMediaLinks socialMedia={userData?.social_links} />
          </div>
        </div>
        {/* ------------ */}
        {/* SHOW IF USER IS LOGGED IN */}
        {isLoggedIn.status && (
          <div className="absolute z-[999] top-5 right-5">
            <EditBanner token={isLoggedIn.token} />
          </div>
        )}
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
    </>
  );
};

export default Layout01;
