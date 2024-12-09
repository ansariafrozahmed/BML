import React, { useState } from "react";
import { Modal as AntdModal, Button } from "antd"; // Import Ant Design Modal and Button
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [isLoggedOut, setIsLoggedOut] = useState(false); // Track logout status
  const router = useRouter(); // Use Next.js router for redirection

  // Handle the confirm button click
  const handleConfirm = async () => {
    setIsLoading(true); // Set loading to true when the process starts

    // Simulate an API/logout delay (remove for production)
    setTimeout(() => {
      // Remove the cookie (e.g., "authToken" for authentication)
      Cookies.remove("BMLTK"); // Replace with your actual cookie name

      // Set logged-out state
      setIsLoggedOut(true);
      setIsLoading(false);

      // After showing confirmation, redirect to homepage
      setTimeout(() => {
        router.push("/login"); // Redirect to the home page
      }, 2000); // Redirect after 2 seconds
    }, 1500);
  };

  return (
    <AntdModal
      visible={isOpen}
      title={isLoggedOut ? "Logged Out" : "Confirm Logout"}
      onCancel={!isLoading && !isLoggedOut ? onClose : undefined} // Disable closing during logout or logged-out state
      footer={
        !isLoggedOut && [
          <Button key="cancel" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            danger
            onClick={handleConfirm}
            loading={isLoading} // Show loading spinner in the button
          >
            Confirm
          </Button>,
        ]
      }
      zIndex={99999}
      bodyStyle={{ padding: "20px" }}
      destroyOnClose
    >
      {isLoggedOut ? (
        <div className="text-center">
          <p>You have been logged out successfully.</p>
          <p>Redirecting you back to the homepage...</p>
        </div>
      ) : (
        <p>Are you sure you want to log out?</p>
      )}
    </AntdModal>
  );
};

export default Modal;
