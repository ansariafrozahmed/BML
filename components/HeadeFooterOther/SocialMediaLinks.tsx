import Image from "next/image";
import React from "react";

interface SocialMediaLinksProps {
  socialMedia: {
    key: string;
    url: string;
  }[];
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ socialMedia }) => {
  // Frontend icon paths
  const icons = [
    {
      key: "facebook",
      iconPath: "/social media icons/facebook.png",
    },
    {
      key: "instagram",
      iconPath: "/social media icons/instagram.png",
    },
    {
      key: "twitter",
      iconPath: "/social media icons/twitter.png",
    },
    {
      key: "linkedin",
      iconPath: "/social media icons/linkedin.png",
    },
    {
      key: "youtube",
      iconPath: "/social media icons/youtube.png",
    },
  ];

  // Data from backend
  //   const socialMediaLinks = [
  //     {
  //       key: "Facebook",
  //       url: "https://facebook.com/yourprofile",
  //     },
  //     {
  //       key: "Instagram",
  //       url: "https://instagram.com/yourprofile",
  //     },
  //     {
  //       key: "Twitter",
  //       url: "https://twitter.com/yourprofile",
  //     },
  //     {
  //       key: "LinkedIn",
  //       url: "https://linkedin.com/in/yourprofile",
  //     },
  //     {
  //       key: "Youtube",
  //       url: "https://youtube.com/yourchannel",
  //     },
  //   ];

  if (!socialMedia) {
    return null;
  }

  // Map backend data with frontend icons
  const combinedData = socialMedia?.map((platform) => {
    const matchingIcon = icons.find((icon) => icon.key === platform.key);
    return {
      ...platform,
      iconPath: matchingIcon?.iconPath || "", // Fallback if no matching icon is found
    };
  });


  return (
    <div className="flex text-white items-center justify-start gap-2">
      {combinedData?.map(
        ({ key, url, iconPath }) =>
          url && (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[25px] lg:h-[30px] w-auto"
            >
              <Image
                src={iconPath}
                alt={`${key} Icon`}
                className="h-full w-auto  rounded-lg overflow-hidden object-contain"
                height={30}
                width={30}
              />
            </a>
          )
      )}
    </div>
  );
};

export default SocialMediaLinks;
