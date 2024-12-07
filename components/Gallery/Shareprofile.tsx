"use client";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

interface ShareProfileProps {
  username: string;
}

const Shareprofile: React.FC<ShareProfileProps> = ({ username }) => {
  let courseTitle = "";
  return (
    <div className="p-5 space-y-4 rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <h2 className="text-xl font-semibold tracking-wider text-primary">
        Share Profile
      </h2>
      <div className="space-x-1">
        <FacebookShareButton
          url={`${process.env.FRONTEND}/${username}`}
          quote={courseTitle}
          hashtag={"#bappamajhalaadka"}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url={`${process.env.FRONTEND}/${username}`}
          appId={""}
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <TelegramShareButton
          url={`${process.env.FRONTEND}/${username}`}
          title={courseTitle}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <TwitterShareButton
          url={`${process.env.FRONTEND}/${username}`}
          title={courseTitle}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={`${process.env.FRONTEND}/${username}`}
          title={courseTitle}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default Shareprofile;
