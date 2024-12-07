// import { Badge } from "@/components/ui/badge"

import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Register Your Profile",
      description: <p>Sign up to create your profile and get started.</p>,
    },
    {
      step: "02",
      title: "Update Profile",
      description: <p>Share your Ganpati images with a few clicks.</p>,
    },
    {
      step: "03",
      title: "Share and Inspire",
      description: <p>Showcase your profile and spread the joy!</p>,
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="templateContainer mx-auto  py-10 lg:py-16">
        <div className="text-center mb-10 lg:mb-20">
          <h2 className="text-[25px] md:text-[30px] leading-none font-medium lg:tracking-wide text-dark">
            Get Started in 3 Easy Steps
          </h2>
        </div>

        {/* Timeline Section */}
        <div className="relative lg:mb-10">
          {/* Timeline Line - Hidden on mobile */}
          {/* <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-amber-100 -translate-y-1/2">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div> */}

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div
                data-aos="fade-up"
                key={step.step}
                className={`text-center relative ${
                  index === 1 ? "md:mt-20" : "md:mt-0"
                }`}
              >
                {/* Content */}
                <h3 className="text-base text-left lg:text-center font-medium text-primary lg:mb-3">
                  <span className="text-primary">{step.step}</span> {step.title}
                </h3>
                <p className="text-gray-600 text-left lg:text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Curved Lines - Hidden on mobile */}
          <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
            <Image
              height={200}
              width={1500}
              sizes="100vw"
              alt=""
              src="/timeline.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
