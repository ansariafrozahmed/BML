"use client";
import React, { useState } from "react";
import { LogOut } from "lucide-react"; // Import Lucide icons
import Modal from "./Modal"; // Import the Modal Component
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "antd";

const ProfileName = ({ userData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const router = useRouter();
  const pathname = usePathname();

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleExitEditMode = () => {
    // Remove "edit" from the URL
    router.push(`/${userData?.username}`);
  };

  return (
    <div className="border-b px-4 py-2 flex items-center justify-between">
      {/* Profile Name Section */}
      <div>
        <h3 className="text-base font-semibold text-user_primary">
          {userData?.first_name} {userData?.last_name}
        </h3>
        <h2 className="text-xs text-dark">{userData?.username}</h2>
      </div>

      {/* Logout Icon */}
      <Tooltip title="Exit edit mode" placement="right">
        <button
          className="flex items-center bg-gray-100 px-2 rounded hover:bg-gray-400 hover:text-white transition-all ease-in-out duration-300 py-1 gap-1"
          onClick={handleExitEditMode}
        >
          exit
          <LogOut size={16} />
        </button>
      </Tooltip>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProfileName;
