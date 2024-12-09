import { Calendar, Eye } from "lucide-react";
import React from "react";

const ProfileSidebar = () => {
  return (
    <div className="p-5 mt-3 md:mt-5 space-y-3 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold tracking-wider text-user_primary">
        Profile Overview
      </h2>
      {/* <div className="h-[2px] w-20 bg-user_primary"></div> */}
      <div>
        <div className="flex justify-between py-3 items-center">
          <span className="text-sm tracking-wider font-medium text-user_dark">
            Profile Views
          </span>
          <span className="flex items-center gap-2 text-gray-700">
            <span className="text-sm font-medium">4,000</span>
            <Eye size={18} className="text-user_primary" />
          </span>
        </div>
        <hr />
        <div className="flex justify-between py-3 items-center">
          <span className="text-sm tracking-wider font-medium text-user_dark">
            Joined On
          </span>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-sm font-medium">20 Feb 2024</span>
            <Calendar size={18} className="text-user_primary" />
          </div>
        </div>
        <hr />
        <div className="flex justify-between py-3 items-center">
          <span className="text-sm tracking-wider font-medium text-user_dark">
            Last Updated
          </span>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-sm font-medium">20 Feb 2024</span>
            <Calendar size={18} className="text-user_primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
