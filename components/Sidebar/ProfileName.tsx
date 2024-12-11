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
        <h3 className="text-lg font-semibold text-gray-800">
          {userData?.first_name} {userData?.last_name}
        </h3>
        <h2 className="text-sm text-gray-700">{userData?.username}</h2>
      </div>

      {/* Logout Icon */}
      <div className="flex items-center">
        <Tooltip title="Exit edit mode" placement="right">
          <button onClick={handleExitEditMode}>
            <LogOut size={16} />
          </button>
        </Tooltip>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProfileName;
