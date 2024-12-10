"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { RootState } from "@/store";
import { toggleActive } from "@/store/gallerSlideShow";
import { XIcon } from "lucide-react";

// Define Embla options (e.g., looping)
const OPTIONS: EmblaOptionsType = { loop: true };

const CustomLightBox = () => {
  const dispatch = useDispatch();
  const { images, isActive, selectedIndex } = useSelector(
    (state: RootState) => state.gallerySlideShow
  );

  if (!isActive) return null; // Don't render if the lightbox is not active

  const handleClose = () => {
    dispatch(toggleActive()); // Close the lightbox
  };

  return (
    <div
      onClick={handleClose}
      className="fixed top-0 left-0 z-[999] inset-0 flex p-4 items-center justify-center"
    >
      {/* Background overlay */}
      <div className="fixed top-0 left-0 h-full w-full bg-black/90"></div>
      {/* Close button */}
      <button
        className="absolute top-2 right-2 z-[1000] bg-white text-black p-2 rounded-full"
      >
        <XIcon />
      </button>
      {/* Lightbox content */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Pass the slide URLs and options to EmblaCarousel */}
        <EmblaCarousel
          slides={images}
          options={OPTIONS}
          selectedIndex={selectedIndex}
        />
      </div>
    </div>
  );
};

export default CustomLightBox;
