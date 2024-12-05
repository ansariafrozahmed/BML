import RegisterForm from "@/components/Form/RegisterForm";
import React from "react";

const Register = () => {
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
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
