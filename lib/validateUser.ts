"use server";
import { cookies } from "next/headers"; // For Next.js 13+ (app directory)

interface Data {
  status: boolean;
  error?: string; // Include an error message if validation fails
  username?: string;
  logged?: boolean; // User is logged in or not
}

export default async function ValidateUser(): Promise<Data> {
  try {
    const cookieStore = await cookies();
    const bmltkCookie = cookieStore.get("BMLTK");

    if (!bmltkCookie?.value) {
      return { status: false, error: "Cookie Not Found" };
    }

    const cookieValue = bmltkCookie.value;

    // API call to validate user
    const response = await fetch(`${process.env.BACKEND}/api/verify_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieValue}`,
      },
    });

    const result = await response.json();

    const data = {
      token: cookieValue,
      status: result.status,
      username: result.username,
      error: result.error,
      logged: true,
    };

    return data; // Ensure we always return a boolean
  } catch (error) {
    return { status: false, error: "Internal Server Error" };
  }
}
