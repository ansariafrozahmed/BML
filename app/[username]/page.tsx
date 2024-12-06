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

interface DataProps {
  isLoggedIn: any;
}

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

const ProfileBlocked: React.FC<DataProps> = ({ isLoggedIn }) => (
  <div className="h-screen w-screen flex items-center px-4 justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="z-10 flex flex-col items-center text-center bg-white rounded-lg shadow-2xl overflow-hidden max-w-lg">
      <div className="bg-red-600 w-full py-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          Account Blocked
        </h1>
      </div>
      <div className="p-8 md:p-12">
        {isLoggedIn.status ? (
          <p className="text-gray-800 text-lg md:text-xl mb-6 leading-relaxed">
            Your account has been blocked due to a violation of our terms and
            conditions. If you believe this is an error, please reach out to our
            support team for assistance.
          </p>
        ) : (
          <p className="text-gray-800 text-lg md:text-xl mb-6 leading-relaxed">
            This account has been blocked due to a violation of our terms and
            conditions.
          </p>
        )}
        {isLoggedIn.status && (
          <Link href={"/contact"}>
            <button className="px-8 py-3 bg-red-600 text-white font-medium text-lg rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-200 ease-in-out">
              Contact Support
            </button>
          </Link>
        )}
      </div>
      <div className="bg-gray-100 w-full py-4 text-gray-600 text-sm">
        {isLoggedIn.status ? (
          <p>
            Need help? Visit our{" "}
            <Link href="/faq" className="text-red-600 underline">
              FAQ
            </Link>
            .
          </p>
        ) : (
          <p>
            Learn more about our policies in the{" "}
            <Link href="/terms" className="text-red-600 underline">
              Terms & Conditions
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  </div>
);

const ProfileExpired: React.FC<DataProps> = ({ isLoggedIn }) => (
  <div className="h-screen w-screen flex items-center px-4 justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-gray-300 relative">
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="z-10 flex flex-col items-center text-center bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg">
      <div
        className={`w-full py-6 ${isLoggedIn ? "bg-blue-600" : "bg-gray-600"}`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          {isLoggedIn.status ? "Profile Expired" : "Profile Inactive"}
        </h1>
      </div>
      <div className="p-8 md:p-12">
        {isLoggedIn.status ? (
          <>
            <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
              Your profile has expired! Renew now to regain access and enjoy
              uninterrupted services.
            </p>
            <p className="text-red-600 font-medium mb-6">
              Note: If you do not renew within 30 days, your account will be
              deleted, and your username will become available for others to
              claim.
            </p>
            <Link href="/renew">
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-200 ease-in-out">
                Renew Now
              </button>
            </Link>
          </>
        ) : (
          <>
            <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
              This profile is currently inactive. To access it, please contact
              support or log in to renew your account.
            </p>
          </>
        )}
      </div>
      <div className="bg-gray-100 w-full py-4 text-gray-600 text-sm">
        <p>
          Need help? Visit our{" "}
          <Link href="/faq" className="text-blue-600 underline">
            FAQ
          </Link>{" "}
          or{" "}
          <Link href="/support" className="text-blue-600 underline">
            Contact Support
          </Link>{" "}
          or{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
          .
        </p>
      </div>
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

  let isLoggedIn = await ValidateUser();

  switch (userData.status) {
    case 0:
      return <ProfilePending />;
    case 1:
      return (
        <Layout01
          username={username}
          isLoggedIn={isLoggedIn}
          userData={userData}
        />
        // <Layout02
        // username={username}
        // isLoggedIn={isLoggedIn}
        // userData={userData}
        // />
      );
    case 2:
      return <ProfileBlocked isLoggedIn={isLoggedIn} />;
    case 3:
      return <ProfileExpired isLoggedIn={isLoggedIn} />;
    default:
      return (
        <div className="h-screen w-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Unknown Profile Status</h1>
        </div>
      );
  }
}
