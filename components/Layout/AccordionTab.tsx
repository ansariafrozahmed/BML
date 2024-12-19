"use client";
import { Calendar, ChevronDown, Edit } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import GalleryContainer from "../Gallery/GalleryContainer";

interface ContactDetail {
  label: string;
  value: string;
}

interface AccordionTabProps {
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
  isLoggedIn: boolean;
}

const AccordionTab: React.FC<AccordionTabProps> = ({
  userData,
  isLoggedIn,
}) => {
  const [openTab, setOpenTab] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenTab(openTab === index ? null : index);
  };

  const renderHeader = (title: string, index: number) => (
    <div
      onClick={() => toggleAccordion(index)}
      className="bg-user_primary rounded-md mt-3 mx-2 cursor-pointer"
    >
      <div className="templateContainer py-3 lg:py-5 flex items-center justify-between">
        <h2 className="text-base font-medium tracking-wider text-user_dark">
          {title}
        </h2>
        <ChevronDown
          size={20}
          className={`${
            openTab === index ? "rotate-180" : ""
          } text-user_dark transition-transform duration-200`}
        />
      </div>
    </div>
  );

  const renderContent = (content: React.ReactNode, index: number) => (
    <div
      className={`templateContainer overflow-hidden transition-[max-height] duration-300 ease-in-out ${
        openTab === index ? "max-h-[500px] " : "max-h-0"
      }`}
    >
      {content}
    </div>
  );

  return (
    <>
      {/* Bio Tab */}
      {renderHeader("Bio", 0)}
      {renderContent(
        <div className="py-6 lg:py-5">
          {isLoggedIn && (
            <Link
              className="flex gap-1 items-center text-user_primary justify-end cursor-pointer"
              href={`/${userData?.username}/edit/accountDetails/${
                Math.random() * 100
              }`}
            >
              <Edit size={16} /> <p>Edit</p>
            </Link>
          )}
          <p
            className="text-sm tracking-wider text-gray-700 leading-loose font-light"
            dangerouslySetInnerHTML={{
              __html:
                userData?.bio?.trim() || userData?.bio || "No Bio Available",
            }}
          ></p>
        </div>,
        0
      )}

      {/* Contact Details Tab */}
      {renderHeader("Contact Details", 1)}
      {renderContent(
        <div className="space-y-4 py-6 lg:py-5">
          {userData?.first_name && userData?.last_name && (
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-600 w-32 text-sm lg:text-base">
                Full Name
              </span>
              <span className="text-gray-800 text-sm lg:text-base">
                {userData.first_name} {userData.last_name}
              </span>
            </div>
          )}
          {userData?.email && (
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-600 w-32 text-sm lg:text-base">
                Email
              </span>
              <span className="text-gray-800 text-sm lg:text-base">
                {userData.email}
              </span>
            </div>
          )}
          {userData?.contact_details?.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="font-medium text-gray-600 w-32 text-sm lg:text-base">
                {item.label}
              </span>
              <span className="text-gray-800 text-sm lg:text-base">
                {item.value || "NA"}
              </span>
            </div>
          ))}
        </div>,
        1
      )}

      {/* Gallery Tab */}
      {renderHeader("Gallery", 2)}
      {renderContent(
        <GalleryContainer
          isLoggedIn={isLoggedIn}
          username={userData?.username}
          layout={2}
        />,
        2
      )}

      {/* Overview Tab */}
      {renderHeader("Overview", 3)}
      {renderContent(
        <div className="space-y-4 py-6 lg:py-5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-user_primary">
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
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-user_primary">
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
        </div>,
        3
      )}
    </>
  );
};

export default AccordionTab;
