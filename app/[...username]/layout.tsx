import Sidebar from "@/components/UserEdit/Sidebar";
import React from "react";
// import { fetchUserData } from "./page";
import ValidateUser from "@/lib/validateUser";

const fetchUserData = async (username: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND}/api/getUserData/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // throw new Error("Failed to fetch user data.");
      const errorResult = await response.json();
      return false;
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(error);
  }
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

      {userSession.logged && data?.username?.[1] === "edit" && (
        <Sidebar userData={userData} userSession={userSession} />
      )}

      {/* Main Content */}
      <div className="w-full bg-gray-50 md:pb-10 pb-20">{children}</div>
    </div>
  );
};

export default RootLayout;
