"use client";
import React, { useState } from "react";
import ProfileName from "../Sidebar/ProfileName";
import { PencilIcon, XIcon } from "lucide-react";
import UpdateComponent from "./UpdateComponent";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { updateUserProfile } from "@/store/userProfile";

const Sidebar = ({ userData, userSession }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar starts closed
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  const activate =
    userProfile?.banner_image || userProfile?.social_links?.length > 0;
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleSaveProfile = async () => {
    try {
      // Create FormData object to send as multipart/form-data
      const formData = new FormData();

      // Append banner image if present
      if (userProfile.banner_image) {
        formData.append("banner_image", userProfile.banner_image[0]);
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
        console.log("Profile updated successfully");

        // Nullify each field in userProfile after successful save
        dispatch(updateUserProfile({ banner_image: null, social_links: null }));
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
        className={`fixed top-0 left-0 z-[999] h-svh bg-white shadow-lg border-b-4 border-orange-600 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:sticky md:translate-x-0 md:w-[30%] w-[80%]`}
      >
        {/* Sidebar Content */}
        <div>
          <ProfileName userData={userData} />
          <div className="mt-5 overflow-y-auto">
            <UpdateComponent social_links={userData?.social_links} />
          </div>
        </div>

        <div className="fixed flex z-99 w-full bottom-0 p-4 border-t justify-between">
          {/* Footer with Action  */}
          <div></div>
          <Button
            disabled={!activate}
            onClick={handleSaveProfile}
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Publish
          </Button>
        </div>
      </div>
      <button
        className="md:hidden fixed bottom-4 right-4 bg-orange-500 text-white p-3 rounded-full z-[1000]"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <XIcon /> : <PencilIcon />}
      </button>
    </>
  );
};

export default Sidebar;
