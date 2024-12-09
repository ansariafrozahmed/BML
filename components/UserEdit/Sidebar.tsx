"use client";
import React, { useState } from "react";
import ProfileName from "../Sidebar/ProfileName";
import { PencilIcon, PlusIcon, XIcon } from "lucide-react";
import UpdateComponent from "./UpdateComponent";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { updateUserProfile } from "@/store/userProfile";
import { useRouter } from "next/navigation";
import { showMessage } from "@/lib/reuse";
import Link from "next/link";

const Sidebar = ({ userData, userSession }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar starts closed
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreview] = useState(false);
  const router = useRouter();
  const validateData =
    (userProfile?.accountDetails?.first_name ||
      userProfile?.accountDetails?.last_name ||
      userProfile?.accountDetails?.email ||
      userProfile?.accountDetails?.bio ||
      userProfile?.accountDetails?.contact_details?.length > 0) &&
    userProfile?.accountDetails;

  const activate =
    userProfile?.banner_image ||
    userProfile?.social_links?.length > 0 ||
    validateData ||
    userProfile?.colorPicker;

  console.log(activate, "userProfile?.colorPicker");
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      // Create FormData object to send as multipart/form-data
      const formData = new FormData();

      // Append banner image if present
      if (userProfile.banner_image) {
        formData.append(
          "banner_image",
          userProfile.banner_image?.originFileObj
        );
      }

      if (userProfile.social_links?.length > 0) {
        formData.append(
          "social_links",
          JSON.stringify(userProfile.social_links)
        );
      }

      if (validateData) {
        formData.append(
          "accountDetails",
          JSON.stringify(userProfile?.accountDetails)
        );
      }

      if (userProfile.colorPicker) {
        formData.append("colorPicker", JSON.stringify(userProfile.colorPicker));
      }

      // Send data to backend using axios with FormData
      const response = await axios.post(
        `${process.env.BACKEND}/api/updateBulkProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userSession?.token}`,
          },
        }
      );

      // Handle response
      if (response.status === 200) {
        showMessage(`Profile updated successfully`, "success");
        router.refresh();
        setLoading(false);
      } else {
        console.error("Failed to update profile", response.data);
      }
    } catch (error) {
      console.error("Error saving profile", error);
    }
  };

  return (
    <>
      {/* Background Mask */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-[998] h-screen w-full bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking on the mask
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-[999] h-svh bg-white shadow-lg  transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:translate-x-0 md:w-[30%] w-[80%]`}
      >
        {/* Sidebar Content */}
        <div>
          <ProfileName userData={userData} />
          <div className="overflow-x-hidden overflow-y-auto">
            <UpdateComponent
              userData={userData}
              token={userSession?.token}
              banner_image={userData?.banner_image}
              social_links={userData?.social_links}
            />
          </div>
        </div>

        <div className="fixed  flex z-99 w-full bottom-0 p-4 border-t justify-between bg-white z-[999999]">
          {/* Footer with Action  */}
          <div></div>
          <div className="flex gap-2">
            <Button
              type="link"
              onClick={() => {
                toggleSidebar();
                setPreview(true);
              }}
              className="md:hidden"
            >
              Preview
            </Button>
            <Button
              disabled={!activate}
              loading={loading}
              onClick={handleSaveProfile}
              className="cursor-pointer transition-all bg-primary text-white px-6 py-2 rounded-lg border-primary border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white fixed top-0 z-[888] flex justify-between w-full shadow-2xl">
        <div></div>
        <div className={previewMode ? "flex-1" : ""}>
          <button
            className={`transition-all md:hidden duration-300 ease-in-out p-3 ${
              isSidebarOpen
                ? "bg-white"
                : previewMode
                ? " bg-blue-500 text-white w-full rounded-none" // Styles for preview mode
                : " bg-orange-500 text-white" // Styles for edit mode
            }`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              ""
            ) : previewMode ? (
              <div onClick={() => setPreview(false)}>
                <h2 className="text-sm font-bold">Preview Mode</h2>
                <p className="text-xs">Back to edit mode to save changes</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <PencilIcon size={16} />
                <p>Edit</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
