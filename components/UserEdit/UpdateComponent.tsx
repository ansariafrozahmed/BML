import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import EditBanner from "./EditBanner";
import EditSocialLinks from "./EdiSocailLinks";
import EditAccountDetails from "./EditAccountDetails";
// import EditSocialLinks from "./EditSocialLinks"; // Uncomment when the component is ready

const UpdateComponent = ({ social_links, banner_image, token }: any) => {
  const [activeEdit, setActiveEdit] = useState<string | null>(null);

  const toggleEdit = (key: string) =>
    setActiveEdit(activeEdit === key ? null : key);

  const sections = [
    { key: "banner", label: "Edit Banner", component: <EditBanner token={token} banner_image={banner_image} /> },
    {
      key: "socialLinks",
      label: "Edit Social Links",
      component: <EditSocialLinks social_links={social_links} />, // Replace with <EditSocialLinks />
    },
    {
      key: "accountDetails",
      label: "Edit Account Details",
      component: <EditAccountDetails />, // Replace with <EditSocialLinks />
    },
  ];

  return (
    <div className="relative w-full h-screen ">
      {/* Main View */}
      <div
        className={`absolute inset-0 px-4 transition-transform duration-500 ease-in-out ${activeEdit ? "-translate-x-full" : "translate-x-0"
          }`}
      >
        {sections.map((section) => (
          <div
            key={section.key}
            className="py-3 cursor-pointer"
            onClick={() => toggleEdit(section.key)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">{section.label}</h4>
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Section Views */}
      {sections.map((section) => (
        <div
          key={section.key}
          className={`absolute inset-0 h-screen px-4 transition-transform duration-500 ease-in-out ${activeEdit === section.key ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="py-3 cursor-pointer">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleEdit(section.key)}
            >
              <ChevronLeft size={18} />
              <h4 className="text-sm font-semibold">{section.label}</h4>
            </div>
            {section.component}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateComponent;
