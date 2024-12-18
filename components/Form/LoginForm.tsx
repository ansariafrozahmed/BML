"use client";

import React, { useState } from "react";
import {
  FormLayout,
  TextField,
  Button,
  Toast,
  Frame,
  Icon,
} from "@shopify/polaris";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ForgotPassword from "./ForgotPassword";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { ViewIcon } from "@shopify/polaris-icons";
import { HideIcon } from "@shopify/polaris-icons";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const requestData = {
      identifier,
      password,
    };

    try {
      const response = await fetch(`${process.env.BACKEND}/api/user_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setToastMessage(errorResult.error); // Set the error message for the Toast
        return;
      }

      const result = await response.json();
      setToastMessage(result.message); // Optionally set success message
      document.cookie = `BMLTK=${result.token}; path=/; SameSite=None; Secure`;
      router.push(`${process.env.FRONTEND}/${result.username}`);
    } catch (error: unknown) {
      console.error("Internal Server Error");
      setToastMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Frame>
        <div data-aos="fade" className="flex items-center h-screen">
          <div className="bg-white shadow w-[350px] space-y-4 p-6 rounded-md mx-auto">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="Logo"
                height={80}
                width={160}
                className="mx-auto object-contain"
              />
            </Link>
            <div className="space-y-1">
              <h2 className="text-base font-medium text-gray-800">Welcome</h2>
              <p className="text-sm text-gray-600">
                Login to access your profile
              </p>
            </div>
            <FormLayout>
              <TextField
                label="Email or Username"
                value={identifier}
                onChange={(value) => handleIdentifierChange(value)}
                placeholder="Enter your email or username"
                autoComplete="username"
                type="text"
              />
              <TextField
                label="Password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                suffix={
                  <div
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <Icon source={ViewIcon} tone="base" />
                    ) : (
                      <Icon source={HideIcon} tone="base" />
                    )}
                  </div>
                  // <Button plain onClick={togglePasswordVisibility}>
                  //   {isPasswordVisible ? "Hide" : "Show"}
                  // </Button>
                }
              />
              <ForgotPassword />
              <Button
                onClick={handleSubmit}
                variant="primary"
                loading={loading}
                fullWidth
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
              <p className="text-center text-xs text-gray-600 mt-2">
                New to <span>Bappa Majha Laadka</span>?{" "}
                <Link href={"/register"}>Create an account</Link>
              </p>
            </FormLayout>
          </div>
        </div>
        {toastMessage && (
          <Toast
            content={toastMessage}
            onDismiss={() => setToastMessage(null)} // Clear toast on dismiss
            error={!toastMessage.toLowerCase().includes("success")} // Show as error if not a success message
          />
        )}
      </Frame>
    </>
  );
};

export default LoginForm;
