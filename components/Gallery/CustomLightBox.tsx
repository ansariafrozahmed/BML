import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const CustomLightBox = () => {
  return (
    <div className="fixed top-0 left-0 z-[999] inset-0 flex p-4 items-center justify-center">
      <div className="fixed top-0 left-0 h-full w-full bg-black/90"></div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
};

export default CustomLightBox;
