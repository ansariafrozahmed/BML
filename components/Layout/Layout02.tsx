"use client";
import Image from "next/image";
import React from "react";
import Shareprofile from "../Gallery/Shareprofile";
import GalleryContainer from "../Gallery/GalleryContainer";
import SocialMediaLinks from "../HeadeFooterOther/SocialMediaLinks";
import Link from "next/link";
import ViewsCounter from "../Tabs/ViewsCounter";
import { Calendar, Edit, House, LayoutPanelLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AccountandGalleryUpload from "../UserEdit/AccountandGalleryUpload";
interface ContactDetail {
  label: string;
  value: string;
}

interface Layout02Props {
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
  };
  username: string;
  isLoggedIn: any;
  isEdit: any;
}

const Layout02: React.FC<Layout02Props> = ({
  userData,
  username,
  isEdit,
  isLoggedIn,
}) => {
  let bannerImage = `${process.env.BACKEND}/upload/banner/${userData.banner_image}`;
  const router = useRouter();

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
            <ViewsCounter />
          </div>
        </div>
      </div>
      {/* ----------- */}
      {/* BIO */}
      {/* ----------- */}
      <div>
        <div className="bg-user_primary">
          <div className="templateContainer py-3 lg:py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-wider text-user_dark">
                Bio
              </h2>
              {isLoggedIn && (
                <Link
                  className="flex gap-1 items-center text-user_dark justify-end cursor-pointer"
                  href={`/${userData?.username}/edit/accountDetails/${
                    Math.random() * 100
                  }`}
                >
                  <Edit size={16} /> <p>Edit</p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="templateContainer py-6 lg:py-5">
            <p
              className="text-sm tracking-wider text-gray-700 leading-loose font-light"
              dangerouslySetInnerHTML={{
                __html: userData?.bio?.trim() || userData?.bio || "",
              }}
            ></p>
          </div>
        </div>
      </div>
      {/* ----------- */}
      {/* Contact Details */}
      {/* ----------- */}
      <div>
        <div className="bg-user_primary">
          <div className="templateContainer py-3 lg:py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-wider text-user_dark">
                Contact Details
              </h2>
              {isLoggedIn && (
                <div
                  className="flex gap-1 items-center text-user_dark justify-end cursor-pointer"
                  onClick={() => {
                    router.push(
                      `/${userData?.username}/edit/accountDetails/${
                        Math.random() * 100
                      }`
                    );
                  }}
                >
                  <Edit size={16} /> <p>Edit</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="templateContainer py-8 lg:py-5">
            <div className="space-y-4">
              <div>
                {userData?.first_name && userData?.first_name && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-600 w-32 text-[13px] lg:text-base">
                        Full Name
                      </span>
                      <span className="text-gray-800 text-[13px] lg:text-base">
                        {userData?.first_name || ""} {userData?.last_name || ""}
                      </span>
                    </div>
                    <hr />
                  </div>
                )}
              </div>
              <div>
                {userData?.email && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-600 w-32 text-[13px] lg:text-base">
                        Email
                      </span>
                      <span className="text-gray-800 text-[13px] lg:text-base">
                        {userData?.email}
                      </span>
                    </div>
                    <hr />
                  </div>
                )}
              </div>
              {userData?.contact_details?.length > 0 &&
                userData?.contact_details?.map((item: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-4">
                      {item?.label && (
                        <span className="font-medium text-gray-600 w-32 text-[13px] lg:text-base">
                          {item.label}
                        </span>
                      )}
                      {item?.value && (
                        <span className="text-gray-800 text-[13px] lg:text-base">
                          {item.value || "NA"}
                        </span>
                      )}
                    </div>
                    {index !== userData.contact_details.length - 1 && <hr />}{" "}
                    {/* Hide for last item */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* ----------- */}
      {/* Contact Details */}
      {/* ----------- */}
      <div>
        <div className="bg-user_primary">
          <div className="templateContainer py-3 lg:py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-wider text-user_dark">
                Gallery
              </h2>
              {isLoggedIn && (
                <div className="flex gap-1 items-center text-user_dark justify-end cursor-pointer">
                  <Edit size={16} /> <p>Edit</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="templateContainer py-8 lg:py-5">
            <GalleryContainer username={userData?.username} layout={2} />
          </div>
        </div>
      </div>
      {/* ----------- */}
      {/* Profile Overview */}
      {/* ----------- */}
      <div>
        <div className="bg-user_primary">
          <div className="templateContainer py-3 lg:py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-wider text-user_dark">
                Profile Overview
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div className="templateContainer py-6 lg:py-5">
            <div className="flex justify-between py-3 items-center">
              <span className="text-sm tracking-wider font-medium text-user_primary">
                Joined On
              </span>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-sm font-medium">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(userData?.joined_at))}
                </span>
                <Calendar size={18} className="text-user_primary" />
              </div>
            </div>

            <hr />
            <div className="flex justify-between py-3 items-center">
              <span className="text-sm tracking-wider font-medium text-user_primary">
                Last Updated
              </span>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-sm font-medium">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(
                    new Date(userData?.updated_at || userData?.joined_at)
                  )}
                </span>
                <Calendar size={18} className="text-user_primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----------- */}
      {/* Share Profile */}
      {/* ----------- */}
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

export default Layout02;
