import ValidateUser from "@/lib/validateUser";
import { redirect } from "next/navigation";
import React from "react";
import SubscriptionBuyed from "./_component/SubscriptionBuyed";
import HeaderWrapper from "@/components/HeadeFooterOther/HeaderWrapper";

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

  console.log(userData);

  if (!isUserMatch) return redirect(`/`);

  return (
    <div>
      <SubscriptionBuyed userData={userData} subscriptionId={userData?.subscriptions?.id || userData?.subscriptions?.subscriptionId } />
    </div>
  );
};

export default Page;
