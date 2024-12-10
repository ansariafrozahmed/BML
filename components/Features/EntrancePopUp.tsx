"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Style.css"; // Import the CSS for animations

const EntrancePopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupData, setPopupData] = useState({
    status: false,
    image: "",
  });

  // Fetch popup data from the backend
  const fetchPopup = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND}/api/getPopup`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch popup data");
      }

      const data = await response.json();
      setPopupData(data);
    } catch (error) {
      console.error("Error fetching popup data:", error);
      setPopupData({ status: false } as any);
    }
  };

  useEffect(() => {
    // Fetch popup data and set visibility timer
    const initializePopup = async () => {
      await fetchPopup();

      // Show popup after 2 seconds if status is true
      if (popupData.status) {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
      }
    };

    initializePopup();

    return () => {
      // Cleanup any residual timers or events
      setIsVisible(false);
    };
  }, [popupData.status]);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Do not render the popup if the status is false
  if (!popupData.status) return null;

  return isVisible ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      onClick={handleClose} // Close popup when clicking outside
    >
      <div
        className="bg-white popup shadow-lg h-auto lg:h-[550px] w-[95%] lg:w-[550px] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <Image
          src={popupData.image}
          alt="Popup Image"
          className="w-full h-auto object-contain"
          height={1000}
          width={1000}
          sizes="100vw"
        />
      </div>
    </div>
  ) : null;
};

export default EntrancePopUp;
