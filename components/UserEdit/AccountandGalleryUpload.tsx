"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GalleryUploadModal from "./GalleryUploadModal";
import { Pencil, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const AccountandGalleryUpload = ({
  isLoggedIn,
  isEdit,
  token,
}: {
  isLoggedIn: boolean;
  isEdit: boolean;
  token: string;
}) => {
  console.log(isLoggedIn, "isLoggedIn");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false); // Track dismissal of the card
  const [currentPath, setCurrentPath] = useState<string>(""); // Track current pathname
  const path = usePathname();

  useEffect(() => {
    // Only runs on the client side
    setCurrentPath(path);
  }, []);

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to dismiss the floating card
  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed)
    return (
      <div
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-5 right-5 bg-user_primary p-2.5 text-white rounded-full cursor-pointer hover:scale-90 transition-all eas duration-200 z-[990]"
      >
        <Plus size={20} />
      </div>
    ); // Do not render the card if dismissed

  return (
    <>
      {/* Main floating action button */}
      <div className="fixed  w-auto lg:w-[480px] grid grid-cols-2 lg:grid-cols-[65%,35%] items-center bottom-4 md:right-0 z-[990]  mx-4 bg-user_primary text-white rounded-xl p-3 shadow-lg border border-user_primary ">
        {/* Dismiss Button */}
        {isLoggedIn && (
          <button
            onClick={handleDismiss}
            className="absolute -top-3 right-0 text-white bg-user_primary border border-dark hover:bg-user_primary rounded-full min-h-8 min-w-8 flex items-center justify-center shadow-sm"
          >
            ✖
          </button>
        )}

        {/* Floating Card Content */}
        <div className="flex flex-col items-center text-left">
          {/* <h3 className="text-xl font-bold">Ganpati Bappa Morya! 🙏</h3> */}
          <p className="text-xs font-light leading-snug- text-white/90 mt-1">
            {isLoggedIn
              ? "You're all set! Share your Ganpati Bappa memories now! 🌟"
              : "Join our community and share your Ganpati Bappa memories! 🌟"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={isLoggedIn ? toggleModal : undefined}
            className="ml-auto bg-white text-user_primary font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            {isLoggedIn ? (
              "Upload Memory"
            ) : (
              <Link href="/register">Create yours now !</Link>
            )}
          </button>
          {/* {!isEdit && isLoggedIn && (
            <button className="ml-auto bg-white text-user_primary font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
              <Link href={`${currentPath}/edit`}>Edit Profile</Link>
            </button>
          )} */}
        </div>
      </div>

      {/* Modal for creating a post */}
      {isModalOpen && (
        <>
          {/* You can include your modal content here */}
          <GalleryUploadModal
            active={isModalOpen}
            handleChange={toggleModal}
            token={token}
          />
        </>
      )}
    </>
  );
};

export default AccountandGalleryUpload;
