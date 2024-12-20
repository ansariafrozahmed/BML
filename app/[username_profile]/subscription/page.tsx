import Header from "@/components/HeadeFooterOther/Header";
import ValidateUser from "@/lib/validateUser";
import { redirect } from "next/navigation";
import React from "react";
import SubscriptionBuyed from "./_component/SubscriptionBuyed";

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

const Page = async ({ params }: any) => {
  const { username_profile } = await params;
  const userData = await fetchUserData(username_profile);
  const isLoggedIn = await ValidateUser();

  const isUserMatch = isLoggedIn?.username === username_profile;

  // Enhance the `isLoggedIn` object to include the match status
  const userSession = {
    ...isLoggedIn,
    logged: isUserMatch,
  };

  console.log(userData);

  if (!isLoggedIn?.logged) return redirect(`/`);
  return (
    <div>
      <Header />

      <SubscriptionBuyed />
    </div>
  );
};

export default Page;
