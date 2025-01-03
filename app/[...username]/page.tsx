// import React from "react";
import Layout01 from "@/components/Layout/Layout01";
import {
  defaultDescription,
  defaultTitle,
  openGraphImage,
} from "@/lib/constants";
import ValidateUser from "@/lib/validateUser";
import { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";
import path from "path";
import NotFound from "./not-found";
import Layout04 from "@/components/Layout/Layout04";
import Layout03 from "@/components/Layout/Layout03";
import Layout02 from "@/components/Layout/Layout02";

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
    className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

    {/* Content */}
    <div className="z-10 text-center text-white px-4 max-w-screen-md mx-auto">
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

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { username } = await params;
  // const url = `${process.env.FRONTEND}/${username}`;

  try {
    const data = await fetchUserData(username);

    return {
      title: data.username || defaultTitle,
      description: defaultDescription,
      openGraph: {
        title: data.username || defaultTitle,
        description: "माझा बाप्पा किती गोड दिसतो!",
        url: `${process.env.FRONTEND}/blog/${data.username}`,
        type: "website",
        images: [
          {
            url: `${process.env.GALLERYURL}/${data?.profile_qr}` || "/og.webp",
            width: 1200,
            height: 630,
            alt: data.username || defaultTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.username || defaultTitle,
        description: "माझा बाप्पा किती गोड दिसतो!",
        images: [`${process.env.GALLERYURL}/${data?.profile_qr}` || "/og.webp"],
      },
      alternates: {
        canonical: `${process.env.FRONTEND}/${data.username}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: defaultTitle,
      description: defaultDescription,
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: `${process.env.FRONTEND}/${username}`,
        type: "website",
        images: [
          {
            url: `${process.env.FRONTEND}${openGraphImage}`,
            width: 1200,
            height: 630,
            alt: defaultTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: defaultDescription,
        images: [`${process.env.FRONTEND}${openGraphImage}`],
      },
      alternates: {
        canonical: `${process.env.FRONTEND}/${username}`,
      },
    };
  }
}

export default async function ProfilePage({ params }: { params: any }) {
  const data = await params;

  // Access the query parameter 'isedit' from searchParams object
  const isEdit = data?.username?.[1] || null; // If 'isedit' exists in searchParams, access it

  // Fetch user data
  const userData = await fetchUserData(data?.username?.[0]);

  const isLoggedIn = await ValidateUser();

  // Handle user not found case
  if (!userData) {
    return <NotFound />;
  }

  // Check if the logged-in user matches the profile being accessed
  const isUserMatch = isLoggedIn?.username === data?.username?.[0];
  const userSession = isLoggedIn?.status
    ? {
        ...isLoggedIn,
        logged: isUserMatch,
      }
    : { ...isLoggedIn };

  // Handle different user statuses
  switch (userData.status) {
    case 0:
      return <ProfilePending />;
    case 1:
      return (
        <>
          {(() => {
            switch (userData?.layout_id) {
              case 1:
                return (
                  <Layout01
                    username={data?.username?.[0]}
                    isLoggedIn={userSession}
                    userData={userData}
                    isEdit={isEdit}
                  />
                );
              case 2:
                return (
                  <Layout02
                    username={data?.username?.[0]}
                    isLoggedIn={userSession}
                    userData={userData}
                    isEdit={isEdit}
                  />
                );
              case 3:
                return (
                  <Layout03
                    username={data?.username?.[0]}
                    isLoggedIn={userSession}
                    userData={userData}
                    isEdit={isEdit}
                  />
                );
              case 4:
                return (
                  <Layout04
                  // username={data?.username?.[0]}
                  // isLoggedIn={userSession}
                  // userData={userData}
                  // isEdit={isEdit}
                  />
                );
              default:
                return <div>Invalid Layout</div>; // Optional default case
            }
          })()}
        </>
      );

    case 2:
      return <ProfileBlocked isLoggedIn={userSession} />;
    case 3:
      return <ProfileExpired isLoggedIn={userSession} />;
    default:
      return <NotFound />;
  }
  // return <DummyLayout userData={userData} />;
}
