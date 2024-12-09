import { Check, CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewFeature = () => {
  return (
    <>
      <div>
        <div className="flex templateContainer relative py-8 lg:py-16 flex-col-reverse lg:flex-row items-center w-full gap-12  justify-center ">
          <div className="relative order-2 lg:order-2  w-full lg:w-[40%]">
            {/* Analytics Graph */}

            {/* Main Image */}
            <div className="relative z-10">
              <div
                data-aos="zoom-in"
                className="overflow-hidden rounded-3xl relative"
              >
                {/* Background Element */}

                {/* Foreground Image */}
                <Image
                  height={600}
                  width={600}
                  src="/mockup1.png"
                  alt="Analytics Dashboard Preview"
                  className="object-cover max-w-[550px] mx-auto w-full h-full relative z-10"
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="order-1 lg:order-1 w-full lg:w-[60%]"
          >
            <div className="space-y-6">
              {/* Heading */}
              {/* <div className="h-[2px] w-28 lg:w-40 bg-primary rounded-full"></div> */}
              <span className="bg-amber-100 px-4 py-2 rounded-lg text-primary">
                Feature 01
              </span>
              <h2 className="text-[25px] md:text-[36px] leading-none font-medium lg:tracking-wide text-dark">
                Get Started in 3 Easy Steps
              </h2>

              {/* Description */}
              <p className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly
              </p>

              {/* Feature List */}
              <ul className=" grid grid-cols-2 gap-4">
                {[
                  "Friendly Design",
                  "Friendly Design",
                  "Friendly Design",
                  "Friendly Design",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CircleCheck
                      fill="green"
                      stroke="white"
                      strokeWidth={1.5}
                      size={30}
                    />
                    <span className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="px-7 py-4 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-normal">
                <Link href={"/register"}>Create your profile</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------- */}
      <div className="bg-gray-100">
        <div className="flex templateContainer relative py-8 lg:py-16 flex-col-reverse lg:flex-row-reverse items-center w-full gap-12  justify-center ">
          <div className="relative order-2 lg:order-2  w-full lg:w-[40%]">
            {/* Analytics Graph */}

            {/* Main Image */}
            <div className="relative z-10">
              <div
                data-aos="zoom-in"
                className="overflow-hidden rounded-3xl relative"
              >
                {/* Background Element */}

                {/* Foreground Image */}
                <Image
                  height={600}
                  width={600}
                  src="/mockup1.png"
                  alt="Analytics Dashboard Preview"
                  className="object-cover max-w-[550px] mx-auto w-full h-full relative z-10"
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="order-1 lg:order-1 w-full lg:w-[60%]"
          >
            <div className="space-y-6">
              {/* Heading */}
              {/* <div className="h-[2px] w-28 lg:w-40 bg-primary rounded-full"></div> */}
              <span className="bg-amber-100 px-4 py-2 rounded-lg text-primary">
                Feature 01
              </span>
              <h2 className="text-[25px] md:text-[36px] leading-none font-medium lg:tracking-wide text-dark">
                Get Started in 3 Easy Steps
              </h2>

              {/* Description */}
              <p className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly
              </p>

              {/* Feature List */}
              <ul className=" grid grid-cols-2 gap-4">
                {[
                  "Friendly Design",
                  "Friendly Design",
                  "Friendly Design",
                  "Friendly Design",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CircleCheck
                      fill="green"
                      stroke="white"
                      strokeWidth={1.5}
                      size={30}
                    />
                    <span className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="px-7 py-4 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-normal">
                <Link href={"/register"}>Create your profile</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------- */}
      <div className="">
        <div className="flex templateContainer relative py-8 lg:py-16 flex-col-reverse lg:flex-row items-center w-full gap-12  justify-center ">
          <div className="relative order-2 lg:order-2  w-full lg:w-[40%]">
            {/* Analytics Graph */}

            {/* Main Image */}
            <div className="relative z-10">
              <div
                data-aos="zoom-in"
                className="overflow-hidden rounded-3xl relative"
              >
                {/* Background Element */}

                {/* Foreground Image */}
                <Image
                  height={600}
                  width={600}
                  src="/mockup1.png"
                  alt="Analytics Dashboard Preview"
                  className="object-cover max-w-[550px] mx-auto w-full h-full relative z-10"
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="order-1 lg:order-1 w-full lg:w-[60%]"
          >
            <div className="space-y-6">
              {/* Heading */}
              {/* <div className="h-[2px] w-28 lg:w-40 bg-primary rounded-full"></div> */}
              <span className="bg-amber-100 px-4 py-2 rounded-lg text-primary">
                Feature 01
              </span>
              <h2 className="text-[25px] md:text-[36px] leading-none font-medium lg:tracking-wide text-dark">
                Get Started in 3 Easy Steps
              </h2>

              {/* Description */}
              <p className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly
              </p>

              {/* Feature List */}
              <ul className=" grid grid-cols-2 gap-4">
                {[
                  "Friendly Design",
                  "Friendly Design",
                  "Friendly Design",
                  "Friendly Design",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CircleCheck
                      fill="green"
                      stroke="white"
                      strokeWidth={1.5}
                      size={30}
                    />
                    <span className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="px-7 py-4 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-normal">
                <Link href={"/register"}>Create your profile</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewFeature;
