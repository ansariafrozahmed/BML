import Sidebar from "@/components/UserEdit/Sidebar";
import React from "react";
import { fetchUserData } from "./page";
import ValidateUser from "@/lib/validateUser";

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

  console.log(data, 'in layout')

  return (
    <div className="flex">
      {/* Sidebar */}

      {userSession.logged && data?.username?.[1] === 'edit' && (
        <Sidebar userData={userData} userSession={userSession} />
      )}

      {/* Main Content */}
      <div className="w-full bg-gray-50 md:pb-10 pb-20">{children}</div>
    </div>
  );
};

export default RootLayout;
