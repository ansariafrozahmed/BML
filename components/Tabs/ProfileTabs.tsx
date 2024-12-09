"use client";
import React, { useState } from "react";
import GalleryContainer from "../Gallery/GalleryContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";



const renderContactDetails = (userData: any) => (
  <div className="space-y-4 bg-white p-4 rounded-md shadow-md">
    <h2 className="text-xl font-semibold tracking-wider text-primary">
      Contact Details
    </h2>
    <div className="space-y-4">
      <div >
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600 w-32 text-base">
            Full Name
          </span>
          <span className="text-gray-800 text-base">
            {userData?.first_name || ""} {userData?.last_name || ""}
          </span>
        </div>
        <hr />
      </div>
      <div >
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600 w-32 text-base">
            Email
          </span>
          <span className="text-gray-800 text-base">
            {userData?.email}
          </span>
        </div>
        <hr />
      </div>
      {userData?.contact_details?.length > 0 && userData?.contact_details?.map((item: any, index: number) => (
        <div key={index}>
          <div className="flex items-center gap-4">
            {item?.label && (
              <span className="font-medium text-gray-600 w-32 text-base">
                {item.label}
              </span>
            )}
            {item?.value && (
              <span className="text-gray-800 text-base">
                {item.value || "NA"}
              </span>
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  </div>
);

interface ProfileTabsProps {
  userData: {
    banner_image: string;
    bio: string;
    contact_details: any[];
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
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userData }) => {
  const userProfile = useSelector((state: RootState) => state.userProfile)
  const validateData = (userProfile?.accountDetails?.first_name || userProfile?.accountDetails?.last_name || userProfile?.accountDetails?.email || userProfile?.accountDetails?.bio || userProfile?.accountDetails?.contact_details?.length > 0) && userProfile?.accountDetails

  const tabs = [
    {
      id: 1,
      label: "About",
      content: renderContactDetails(validateData || userData),
    },
    {
      id: 2,
      label: "Gallery",
      content: <GalleryContainer username={userData?.username} />,
    },
    // { id: 3, label: "Bio", content: renderOverView() },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [animationClass, setAnimationClass] = useState("");

  const handleTabChange = (tabId: number) => {
    if (activeTab === tabId) return;

    setAnimationClass("fade-down");
    setTimeout(() => {
      setActiveTab(tabId);
      setAnimationClass("fade-up");
    }, 300);
  };

  return (
    <>
      {/* Tabs */}
      <div className="flex border-b gap-5 items-center border-gray-200 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`border-b-2 py-3 tracking-wider text-sm font-medium transition ${activeTab === tab.id
              ? "border-primary text-primary"
              : "text-dark border-white hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content ${activeTab === tab.id ? animationClass : "hidden-content"
              }`}
          >
            {activeTab === tab.id && (
              <div className="text-sm py-2">{tab.content}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileTabs;
