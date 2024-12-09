import Sidebar from "@/components/UserEdit/Sidebar";
import React from "react";
import { fetchUserData } from "./page";
import ValidateUser from "@/lib/validateUser";
import ColorPallete from "@/components/Colorpallete";
const ColorPalette01 = {
  user_primary: "#F5762E", // Deep brown as the primary color for a grounded feel.
  user_dark: "#262626", // Dark gray for main text, softer than black.
};

const RootLayout = async ({ children, params }: any) => {
  const data = await params;
  const userData = await fetchUserData(data?.username?.[0]);
  const isLoggedIn = await ValidateUser();

  const isUserMatch = isLoggedIn?.username === data?.username?.[0];

  // Enhance the `isLoggedIn` object to include the match status
  const userSession = {
    ...isLoggedIn,
    logged: isUserMatch,
  };

  return (
    <div className="flex">
      {/* Sidebar */}

      <ColorPallete colorPallete={userData?.colors || ColorPalette01} />
      {userSession.logged && data?.username?.[1] === "edit" && (
        <Sidebar userData={userData} userSession={userSession} />
      )}

      {/* Main Content */}
      <div className="w-full bg-gray-50 md:pb-10 pb-20">{children}</div>
    </div>
  );
};

export default RootLayout;
