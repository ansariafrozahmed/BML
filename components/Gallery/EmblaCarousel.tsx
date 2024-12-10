"use client";
import React, { useRef, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./Style.css";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";

type PropType = {
  slides: any[]; // Array of image URLs
  options?: EmblaOptionsType;
  selectedIndex?: number; // Index to start from
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  selectedIndex = 0,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      delay: 3000,
    }),
  ]);
  const [loading, setLoading] = useState(true);

  const progressNode = useRef<HTMLDivElement>(null);
  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  useEffect(() => {
    if (emblaApi) {
      setLoading(true); // Show loading state when re-initializing

      // Reinitialize the carousel (this might help reset any state from previous renders)
      emblaApi.reInit();

      // Once the carousel is ready, set the selected index directly
      if (selectedIndex >= 0 && selectedIndex < slides.length) {
        emblaApi.scrollTo(selectedIndex, false); // Jump to selected index without animation
      }

      // Listen for the carousel's "select" event to check when the correct image is displayed
      emblaApi.on("select", () => {
        if (emblaApi.selectedScrollSnap() === selectedIndex) {
          setLoading(false); // Hide the loader when the selected image is displayed
        }
      });
    }
  }, [emblaApi, selectedIndex, slides.length]);

  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="fixed top-0 left-0 z-[999] inset-0 flex items-center justify-center bg-black/60">
          <div className="loader">Loading...</div>{" "}
          {/* You can style this loader as you like */}
        </div>
      )}

      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide: any, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number flex flex-col justify-center">
                  <Image
                    height={800}
                    width={800}
                    src={`${process.env.BACKEND}/upload/gallery/${slide.path}`}
                    alt={`Gallery image ${index + 1}`}
                    className="lg:h-[450px] h-[450px] md:w-[350px] w-[350px] z-[999] object-contain"
                    onLoadingComplete={() => {
                      if (index === selectedIndex) {
                        setLoading(false); // Mark loading as done once the selected image is loaded
                      }
                    }}
                  />
                  <div className="md:w-full w-44 mt-5">
                    <h2
                      className="text-center  text-gray-100 font-medium 
                  text-sm md:text-base lg:text-lg xl:text-xl tracking-wide px-2 lg:px-4 
                  "
                      style={{ wordBreak: "break-word" }} // Ensure long titles break gracefully
                    >
                      {slide.title || "Untitled"}{" "}
                      {/* Fallback for missing titles */}
                    </h2>
                  </div>
                </div>
                {/* Responsive Caption */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autoplay progress bar */}
      <div
        className={`embla__progress ${
          showAutoplayProgress ? "" : "embla__progress--hidden"
        }`}
      >
        <div className="embla__progress__bar" ref={progressNode} />
      </div>
    </div>
  );
};

export default EmblaCarousel;
