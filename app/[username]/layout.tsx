import Sidebar from "@/components/UserEdit/Sidebar";
import React from "react";
import { fetchUserData } from "./page";
import ValidateUser from "@/lib/validateUser";

const RootLayout = async ({ children, params }: any) => {
  const { username } = params;

  const userData = await fetchUserData(username);
  const isLoggedIn = await ValidateUser();

  const isUserMatch = isLoggedIn?.username === username;

  // Enhance the `isLoggedIn` object to include the match status
  const userSession = {
    ...isLoggedIn,
    logged: isUserMatch,
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {userSession.logged && (
        <Sidebar userData={userData} userSession={userSession} />
      )}

      {/* Main Content */}
      <div className="w-full bg-gray-50">{children}</div>
    </div>
  );
};

export default RootLayout;
