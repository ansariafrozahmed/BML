import React from "react";
import ViewsCounter from "../Tabs/ViewsCounter";
import { Edit, House, LayoutPanelLeft } from "lucide-react";
import Link from "next/link";
import SocialMediaLinks from "../HeadeFooterOther/SocialMediaLinks";
import Image from "next/image";
import AccordionTab from "./AccordionTab";
import Shareprofile from "../Gallery/Shareprofile";
import AccountandGalleryUpload from "../UserEdit/AccountandGalleryUpload";

interface ContactDetail {
  label: string;
  value: string;
}

interface Layout03Props {
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

const Layout03: React.FC<Layout03Props> = ({
  userData,
  username,
  isEdit,
  isLoggedIn,
}) => {
  let bannerImage = `${process.env.BACKEND}/upload/banner/${userData.banner_image}`;
  return (
    <div className="pb-24">
      {isLoggedIn.logged && (
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
      )}
      {/* ------------- */}
      <div className={`group h-[250px] lg:h-[350px] relative `}>
        <Image
          src={
            bannerImage
              ? bannerImage // If it's a Blob, use the URL created from Blob
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
            <ViewsCounter count={userData?.profile_views as any} />
          </div>
        </div>
      </div>
      {/* ----------- */}
      {/* BIO */}
      {/* ----------- */}
      <AccordionTab isLoggedIn={isLoggedIn} userData={userData} />
      <div className="templateContainer py-6 lg:py-5">
        <Shareprofile layout={2} username={userData?.username} />
      </div>

      <AccountandGalleryUpload
        isLoggedIn={isLoggedIn?.logged}
        token={isLoggedIn?.token}
        isEdit={isEdit === "edit"}
      />
    </div>
  );
};

export default Layout03;
