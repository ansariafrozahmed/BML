"use client";
import React, { useState } from "react";
import GalleryContainer from "../Gallery/GalleryContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

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
  isLoggedIn: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userData, isLoggedIn }) => {
  const router = useRouter();
  const params = useParams();
  const username = params.username?.[0]; // Extract mode from the URL

  const renderBio = (userData: any) => {
    const router = useRouter();
    return (
      <div className="space-y-4 bg-white p-4 rounded-md shadow-md">
        {isLoggedIn && (
          <div
            className="flex gap-1 items-center justify-end cursor-pointer"
            onClick={() => {
              router.push(
                `/${username}/edit/accountDetails/${Math.random() * 100}`
              );
            }}
          >
            <Edit size={16} /> <p>Edit</p>
          </div>
        )}
        <p
          className="text-sm tracking-wider text-gray-700 leading-loose font-light"
          dangerouslySetInnerHTML={{
            __html:
              userData?.accountDetails?.bio?.trim() || userData?.bio || "",
          }}
        ></p>
      </div>
    );
  };

  const renderContactDetails = (userData: any) => (
    <div className="space-y-4 bg-white p-4 rounded-md shadow-md">
      <div className="flex gap-2 justify-between items-center">
        {/* <h2 className="text-xl font-semibold tracking-wider text-user_primary">
          Contact Details
        </h2> */}
        {isLoggedIn && (
          <div
            className="flex gap-1 items-center justify-end w-full cursor-pointer"
            onClick={() => {
              router.push(
                `/${username}/edit/accountDetails/${Math.random() * 100}`
              );
            }}
          >
            <Edit size={16} /> <p>Edit</p>
          </div>
        )}
      </div>
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
  );

  const tabs = [
    {
      id: 1,
      label: "माझ्या बाप्पा विषयी थोडसं,",
      content: renderBio(userData),
    },
    {
      id: 2,
      label: "Contact Details",
      content: renderContactDetails(userData),
    },
    {
      id: 3,
      label: "Gallery",
      content: <GalleryContainer username={userData?.username} layout={1} />,
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
      <div className="flex border-b gap-2 items-center w-full overflow-x-scroll scrollbar-hide border-gray-200 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`border-b-2 py-3 px-2 tracking-wider whitespace-nowrap text-sm font-normal transition ${
              activeTab === tab.id
                ? "border-user_primary text-user_primary"
                : "text-user_dark border-white hover:text-user_primary"
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
