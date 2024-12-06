"use client";
import React, { useState } from "react";
import GalleryContainer from "../Gallery/GalleryContainer";

interface ContactDetail {
  label: string;
  value: string;
}

const renderContactDetails = (contact_details: ContactDetail[]) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold tracking-wider text-primary">
      Contact Details
    </h2>
    <div className="space-y-4">
      {contact_details?.map((item, index) => (
        <>
          <div key={index} className="flex items-center gap-4">
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
        </>
      ))}
    </div>
  </div>
);

interface ProfileTabsProps {
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
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userData }) => {
  const tabs = [
    {
      id: 1,
      label: "About",
      content: renderContactDetails(userData?.contact_details),
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
            className={`border-b-2 py-3 tracking-wider text-sm font-medium transition ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "text-dark border-white hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="my-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-content ${
              activeTab === tab.id ? animationClass : "hidden-content"
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
