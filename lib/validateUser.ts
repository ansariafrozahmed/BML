import { cookies } from "next/headers"; // For Next.js 13+ (app directory)

export default async function ValidateUser(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const bmltkCookie = cookieStore.get("BMLTK");

    if (!bmltkCookie?.value) {
      console.error("BMLTK cookie not found or empty.");
      return false;
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

    if (!response.ok) {
      console.error(`API call failed: ${response.statusText}`);
      return false;
    }

    const result = await response.json();
    console.log(result, "RESULT");

    return result; // Ensure we always return a boolean
  } catch (error) {
    console.error("Error validating user:", error);
    return false;
  }
}
