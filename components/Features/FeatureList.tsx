// import { Badge } from "@/components/ui/badge"
import {
  Bell,
  FileStack,
  LayoutGrid,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function FeatureList() {
  const features = [
    {
      icon: FileStack,
      title: "High Usability",
      description: "There are many variations of passages of Lorem Ipsum",
    },
    {
      icon: Bell,
      title: "Action Reminder",
      description: "There are many variations of passages of Lorem Ipsum",
    },
    {
      icon: LayoutGrid,
      title: "Merge Files",
      description: "There are many variations of passages of Lorem Ipsum",
    },
    {
      icon: MessageCircle,
      title: "Free Live Chat",
      description: "There are many variations of passages of Lorem Ipsum",
    },
    {
      icon: Users,
      title: "Social Share",
      description: "There are many variations of passages of Lorem Ipsum",
    },
    {
      icon: Share2,
      title: "Custom Shortcuts",
      description: "There are many variations of passages of Lorem Ipsum",
    },
  ];

  return (
    <div className="templateContainer mx-auto py-8 lg:py-16">
      <div className="text-center mb-0 lg:mb-16">
        <h2 className="text-4xl md:text-5xl max-w-4xl mx-auto leading-snug">
          Our App Is Great For Individuals, Startups And Enterprises
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-between pt-10 items-center gap-8 relative z-20">
        {/* Left Column (First Three Features) */}
        <div className="flex w-full lg:w-[30%] flex-col  space-y-8">
          {features.slice(0, 3).map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                data-aos="fade-right"
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Image */}
        <div className="relative w-full lg:w-[40%]">
          <div className="aspect-square rounded-full bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]  md:w-[100%]" />
          <div className="aspect-square rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-[110px] md:-translate-y-[135px] w-[74%]  md:w-[80%]" />
          <Image
            height={600}
            width={600}
            data-aos="fade-up"
            src="/mockup2.png"
            alt="Features"
            className="relative z-10 bounce -mb-6 lg:-mb-10 w-full h-auto"
          />
        </div>

        {/* Right Column (Last Three Features) */}
        <div className="flex flex-col space-y-8 w-full lg:w-[30%] ">
          {features.slice(3).map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                data-aos="fade-up"
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
