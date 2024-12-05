"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Image from "next/image";

type PropType = {
  options?: EmblaOptionsType;
  desktopBanner: string[]; // Assuming string[] for images
  mobileBanner: string[]; // Assuming string[] for images
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

const Banner: React.FC<PropType> = ({
  desktopBanner,
  mobileBanner,
  options,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Mobile breakpoint

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const banners = isMobile ? mobileBanner : desktopBanner;

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex ml-[-1rem] touch-pan-y">
        {banners?.map((item: string, index: number) => (
          <div
            key={index}
            className={`flex-none pl-4 w-full ${
              isMobile ? "h-[400px]" : "h-[750px]"
            }`}
          >
            <Image
              className="block w-full h-full object-cover"
              src={item}
              height={1000}
              width={1600}
              priority={true}
              alt={`Banner ${index + 1}`}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
