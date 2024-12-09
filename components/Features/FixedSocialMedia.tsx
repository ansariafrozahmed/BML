import { Tooltip } from "antd";
import React from "react";

const FixedSocialMedia = () => {
  return (
    <div className="fixed bottom-1/2 space-y-2 right-0 z-[999]">
      <Tooltip title="Our facebook handle" placement="left">
        <a
          href="https://www.instagram.com/bappamajhalaadka?igsh=MXhzd3NmOGV3ODhwaw=="
          target="_blank"
          className="block"
        >
          <img
            src="/social media icons/facebook.png"
            alt=""
            className="w-10 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out"
          />
        </a>
      </Tooltip>
      <Tooltip title="Our Instagram handle" placement="left">
        <a
          href="https://www.facebook.com/profile.php?id=61566128680849&mibextid=ZbWKwL"
          target="_blank"
          className=""
        >
          <img
            src="/social media icons/instagram.png"
            alt=""
            className="w-10 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out"
          />
        </a>
      </Tooltip>
    </div>
  );
};

export default FixedSocialMedia;
