import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import EditBanner from "./EditBanner";
import EditSocialLinks from "./EdiSocailLinks";
import EditAccountDetails from "./EditAccountDetails";
import ColorTheme from "./ColorTheme";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@shopify/polaris";

const UpdateComponent = ({
  social_links,
  banner_image,
  token,
  userData,
}: any) => {
  const [activeEdit, setActiveEdit] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loader state
  const params = useParams();
  const mode = params.username?.[2]; // Extract mode from the URL
  const router = useRouter();

  const toggleEdit = (key: string) =>
    setActiveEdit(activeEdit === key ? null : key);

  const sections = [
    {
      key: "banner",
      label: "Banner",
      component: <EditBanner token={token} banner_image={banner_image} />,
    },
    {
      key: "socialLinks",
      label: "Social Links",
      component: <EditSocialLinks social_links={social_links} />,
    },
    {
      key: "accountDetails",
      label: "Account Details",
      component: <EditAccountDetails userData={userData} />,
    },
    {
      key: "customizeTheme",
      label: "Color Theme",
      component: <ColorTheme userData={userData} />,
    },
  ];

  // Automatically activate edit mode based on `mode`
  useEffect(() => {
    setIsLoading(true); // Start loader
    if (mode) {
      const matchingSection = sections.find(
        (section) => section.key.toLowerCase() === mode.toLowerCase()
      );
      if (matchingSection) {
        setActiveEdit(matchingSection.key);
      }
    }
    setTimeout(() => setIsLoading(false), 500); // Simulate a slight delay for loading
  }, []);

  return (
    <div className="relative ">
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
          <div className="loader">
            <Spinner />
          </div>
        </div>
      )}

      {/* Main View */}
      <div
        className={`absolute inset-0 mt-5 px-4 transition-transform duration-500 ease-in-out ${
          activeEdit ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        {sections.map((section) => (
          <div
            key={section.key}
            className="py-2 cursor-pointer"
            onClick={() => {
              router.push(`/${params.username?.[0]}/edit/${section.key}`);
            }}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-600">
                {section.label}
              </h4>
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Section Views */}
      {sections.map((section) => (
        <div
          key={section.key}
          className={`absolute inset-0 h-screen px-4 transition-transform duration-500 ease-in-out ${
            activeEdit === section.key ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="py-3 cursor-pointer">
            <div
              className="flex items-center gap-1"
              onClick={() => {
                toggleEdit(section.key);
                router.push(`/${params.username?.[0]}/edit`);
              }}
            >
              <ChevronLeft size={18} className="text-gray-800" />
              <h4 className="text-xs font-medium">{section.label}</h4>
            </div>
            {section.component}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateComponent;
