import ValidateUser from "@/lib/validateUser";
import React from "react";

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

  return (
    <div>
      <h2 className="text-3xl">UserData</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>

      <h2 className="text-3xl">isLoggedIn</h2>
      <pre>{JSON.stringify(userSession, null, 2)}</pre>
    </div>
  );
};

export default Page;
