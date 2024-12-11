"use client";

import React, { useState, useCallback } from "react";
import {
  TextField,
  Button,
  FormLayout,
  Frame,
  Toast,
  Link,
  Text,
} from "@shopify/polaris";
import Nextlink from "next/link";

import Image from "next/image";
import debounce from "lodash.debounce";
import OtpVerifyModal from "./OtpVerifyModal";
import { useRouter } from "next/navigation";

// Form
const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameLoading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [openOtpVerifyModal, setOpenOtpVerifyModal] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameStatus, setUsernameStatus] = useState<
    "available" | "taken" | "error" | null
  >(null);

  const route = useRouter();

  // Debounced function to check if the username exists
  const checkUsernameExistence = useCallback(
    debounce(async (username: string) => {
      if (username) {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.BACKEND}/api/validate-username`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username }),
            }
          );

          const result = await response.json();

          if (response.ok && result.isValid) {
            setUsernameStatus("available");
          } else if (!response.ok || !result.isValid) {
            setUsernameStatus("taken");
            // Display backend error message if available
            if (result.message) {
              setUsernameError(result.message); // Assuming backend provides a 'message' field
            } else {
              setUsernameError("Username is already taken.");
            }
          }
        } catch (error) {
          setUsernameStatus("error");
          setUsernameError("An error occurred while checking the username.");
          console.error("Error checking username:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setUsernameStatus(null); // Clear status when input is empty
        setUsernameError(null); // Clear error when input is empty
      }
    }, 500),
    []
  );

  const handleUsernameChange = (value: string) => {
    const lowerCaseValue = value.toLowerCase(); // Convert value to lowercase for uniformity
    setUsername(lowerCaseValue); // Store only the lowercase version
    setUsernameError(null); // Clear validation errors
    setUsernameStatus(null); // Clear status on change

    console.log(lowerCaseValue, "lowerCaseValue");

    // Regex explanation:
    // ^[a-z0-9_]+$ : Only allows lowercase letters (a-z), numbers (0-9), and underscores (_).
    // It does not allow any other special characters or spaces.
    if (!/^[a-z0-9_]+$/.test(lowerCaseValue)) {
      setUsernameError(
        "Username can only contain lowercase letters, numbers, and underscores. No spaces or special characters are allowed."
      );
      return;
    }

    if (lowerCaseValue.trim().length > 0) {
      checkUsernameExistence(lowerCaseValue);
    }
  };

  const verifyEmail = async () => {
    try {
      setSendingOtp(true);
      const response = await fetch(
        `${process.env.BACKEND}/api/verifyEmailandSendOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setToastMessage(`${data.error}`);
        setSendingOtp(false);
      } else {
        setOpenOtpVerifyModal(true);
      }
    } catch (error) {
      console.error("Error");
      setSendingOtp(false);
    }
  };

  const handleSubmit = async () => {
    if (!firstName) return setToastMessage("First Name is required.");
    if (!lastName) return setToastMessage("Last Name is required.");
    if (!username) return setToastMessage("Username is required.");
    if (usernameError || usernameStatus === "taken")
      return setToastMessage("Please choose a valid and unique username.");
    if (!email || emailError) return setToastMessage("Email is invalid.");
    if (!password) return setToastMessage("Password is required.");
    if (passwordError) return setToastMessage("Password is invalid.");
    if (password !== confirmPassword)
      return setToastMessage("Passwords do not match.");

    await verifyEmail();
  };

  const saveRegistration = async () => {
    const requestData = {
      first_name: firstName,
      username,
      last_name: lastName,
      email,
      password,
      joinedAt: new Date().toISOString(), // Add current timestamp
    };

    try {
      const response = await fetch(`${process.env.BACKEND}/api/user_register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setToastMessage(errorResult.error);
        return;
      }

      const result = await response.json();
      setToastMessage(result.message);
      route.push(`/login`);
    } catch (error: any) {
      console.error("Internal Server Error");
      setToastMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <Frame>
      {toastMessage && (
        <Toast
          content={toastMessage}
          onDismiss={() => setToastMessage(null)}
          duration={5000}
        />
      )}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg p-6 rounded-md w-96 space-y-2">
          <Nextlink href="/">
            <Image
              src="/logo.webp"
              alt="Logo"
              height={50}
              width={100}
              className="object-contain"
            />
          </Nextlink>
          <h2 className="text-lg font-semibold text-gray-800">
            Create an Account
          </h2>
          <FormLayout>
            <div className="flex gap-2">
              <TextField
                autoComplete=""
                label="First Name"
                value={firstName}
                onChange={(value) => setFirstName(value)}
              />
              <TextField
                autoComplete=""
                label="Last Name"
                value={lastName}
                onChange={(value) => setLastName(value)}
              />
            </div>
            <TextField
              autoComplete=""
              label="आपल्या बाप्पाचं नाव आपल्या Username म्हणून वापरा."
              loading={usernameLoading}
              value={username}
              placeholder="for example : sindecharaja"
              onChange={handleUsernameChange}
              error={
                usernameError ||
                (usernameStatus === "taken"
                  ? "Username is already taken."
                  : undefined)
              }
              helpText={
                usernameStatus === "available" ? (
                  <Text variant="bodySm" as="h3" tone="success">
                    Username is available! ✅
                  </Text>
                ) : usernameStatus === "error" ? (
                  "An error occurred while checking username."
                ) : (
                  "Username must be unique and valid."
                )
              }
            />
            <TextField
              autoComplete=""
              label="Email"
              value={email}
              onChange={(value) => {
                setEmail(value);
                if (
                  !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
                ) {
                  setEmailError("Please enter a valid email address.");
                } else {
                  setEmailError(null);
                }
              }}
              error={emailError as any}
            />
            <TextField
              autoComplete=""
              label="Password"
              value={password}
              onChange={(value) => {
                setPassword(value);
                setPasswordError(
                  value.length < 8 ? "Password is too short." : null
                );
              }}
              type="password"
              error={passwordError as any}
            />
            <TextField
              autoComplete=""
              label="Confirm Password"
              value={confirmPassword}
              onChange={(value) => {
                setConfirmPassword(value);
                setConfirmPasswordError(
                  value !== password ? "Passwords do not match." : null
                );
              }}
              type="password"
              error={confirmPasswordError as any}
            />
            <Button
              onClick={handleSubmit}
              variant="primary"
              loading={sendingOtp}
              fullWidth
            >
              Register
            </Button>
            <p className="text-center text-xs text-gray-600 mt-2">
              Already have an account?{" "}
              <Link url="/login" monochrome>
                Login here
              </Link>
            </p>
          </FormLayout>

          <OtpVerifyModal
            active={openOtpVerifyModal}
            email={email}
            setToastMessage={setToastMessage}
            setOpenOtpVerifyModal={setOpenOtpVerifyModal}
            saveRegistration={saveRegistration}
          />
        </div>
      </div>
    </Frame>
  );
};

export default RegisterForm;
