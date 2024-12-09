"use client";
import React, { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./Style.css";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const progressNode = useRef<HTMLDivElement>(null);
  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  return (
    <div>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <Image
                    height={800}
                    width={800}
                    src={
                      "https://pics.craiyon.com/2023-09-18/4c7a3461fbed47a289656147f5f9ea15.webp"
                    }
                    alt={`Gallery image `}
                    className="h-auto lg:h-[450px]  w-full lg:w-[450px] z-[999]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`embla__progress`.concat(
          showAutoplayProgress ? "" : " embla__progress--hidden"
        )}
      >
        <div className="embla__progress__bar" ref={progressNode} />
      </div>
    </div>
  );
};

export default EmblaCarousel;
