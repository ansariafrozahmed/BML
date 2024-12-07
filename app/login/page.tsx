import LoginForm from "@/components/Form/LoginForm";
import ValidateUser from "@/lib/validateUser";
import { redirect } from "next/navigation";
import React from "react";

const Loginpage = async () => {
  let isLoggedIn = await ValidateUser();

  if (isLoggedIn.status) {
    redirect(`/${isLoggedIn.username}`);
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/408.webp")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
      className="bg-gray-100 h-screen"
    >
      <div className="templateContainer h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};
export default Loginpage;
