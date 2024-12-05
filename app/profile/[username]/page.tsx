// import React from "react";
import Layout01 from "@/components/Layout/Layout01";
import Layout02 from "@/components/Layout/Layout02";
import ValidateUser from "@/lib/validateUser";
import Image from "next/image";
import Link from "next/link";

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

type UsernameParams = Promise<{ username: string }>;

const ProfilePending = () => (
  <div
    style={{
      backgroundImage: 'url("/background.jpeg")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className="h-screen w-screen flex items-center justify-center relative"
  >
    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
    <div className="z-10 text-center text-white px-4">
      <h1 className="text-3xl md:text-4xl capitalize font-bold mb-4">
        Profile approval is pending
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Please wait while the account is being reviewed.
      </p>
    </div>
  </div>
);

const ProfileBlocked = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-gray-100 relative">
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="z-10 flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-md">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
        Profile Blocked
      </h1>
      <p className="text-gray-700 text-lg md:text-xl mb-6">
        The account has been blocked due to a violation of our terms and
        conditions.
      </p>
      <Link href={"/contact"}>
        <button className="px-7 py-3 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-medium">
          Contact Support
        </button>
      </Link>
    </div>
  </div>
);

const ProfileExpired = () => (
  <div className="h-screen w-screen flex p-2 items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 relative">
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="z-10 flex flex-col items-center text-center bg-white rounded-lg shadow-md p-8 md:p-12 max-w-md">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Profile Expired
      </h1>
      <p className="text-gray-600 text-lg md:text-xl mb-6">
        The profile has expired. Renew now to regain access and keep your
        account active.
      </p>
      <Link href={"/contact"}>
        <button className="px-7 py-3 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-medium">
          Renew Now
        </button>
      </Link>
    </div>
  </div>
);

export default async function ProfilePage({
  params,
}: {
  params: UsernameParams;
}) {
  const { username } = await params;
  const userData = await fetchUserData(username);

  if (!userData) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Image
          src="https://media.licdn.com/dms/image/v2/C4D12AQF1DVZg4wMt1w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520112491771?e=2147483647&v=beta&t=O-wbaXhOWFt2JPFxlyu9pSWF_nKbdZ41iXrAQGomGKQ"
          alt="Profile expired"
          height={800}
          width={800}
        />
        <Link href={"/register"} className="hidden md:block">
          <button className="px-7 py-3 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-medium">
            Create yours now
          </button>
        </Link>
      </div>
    );
  }

  // 0 Pending
  // 1 Active
  // 2 Blocked
  // 3 Expired

  let isLoggedIn = await ValidateUser();

  switch (userData.status) {
    case 0:
      return <ProfilePending />;
    case 1:
      return <Layout01 username={username} userData={userData} />;
    case 2:
      return <ProfileBlocked />;
    case 3:
      return <ProfileExpired />;
    default:
      return (
        <div className="h-screen w-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Unknown Profile Status</h1>
        </div>
      );
  }
}
