"use client";

import React, { useRef, useState } from "react";
import { Frame, Modal, Text, TextField, Toast } from "@shopify/polaris";
import { Input } from "antd";
import SetNewPassword from "./SetNewPassword";

const ForgotPassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>();

  const clearAllFields = () => {
    if (!emailDisabled) {
      setIdentifier("");
    }
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleEmailChange = (value: string) => {
    setIdentifier(value);
  };

  const handleChange = (value: string, index: number) => {
    // Accept only numbers
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSave = async () => {
    if (emailDisabled) {
      const requestBody = {
        otp: otp.join(""),
        identifier,
      };
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.BACKEND}/api/recover-verify-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const result = await response.json();
        if (response.ok) {
          setToastMessage(result.message);
          setLoading(false);
          setVerified(true);
          setOpenModal(false);
        } else {
          setToastMessage(result.error);
        }
      } catch (error) {
        setToastMessage("Internal Server Error");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        setTimeout(() => {
          setEmailDisabled(true);
          setLoading(false);
          setToastMessage("An OTP has been sent to your email");
        }, 200);
        const response = await fetch(
          `${process.env.BACKEND}/api/forgot-password-send-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          //   setToastMessage(result.message);
        } else {
          //   setToastMessage(result.error);
        }
      } catch (error) {
        setToastMessage("Internal Server Error");
      }
    }
  };

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="leading-none cursor-pointer"
      >
        <h2 className="text-right underline">Forgot Password</h2>
      </div>
      <Modal
        title="Recover your password"
        open={openModal}
        onClose={() => setOpenModal(false)}
        primaryAction={{
          content: "Submit",
          loading,
          disabled: loading || identifier === "",
          onAction: handleSave,
        }}
        secondaryActions={[
          {
            content: "Clear All",
            onAction: clearAllFields,
          },
        ]}
      >
        <div className="px-4 lg:px-10">
          <div className="text-center py-3">
            <Text as="p" variant="bodySm">
              Please enter your registered email or username to get reset code.
            </Text>
          </div>

          <div className="text-center px-6 py-3">
            <TextField
              label="Email or Username"
              value={identifier}
              disabled={emailDisabled}
              onChange={handleEmailChange}
              placeholder="Enter your email or username"
              autoComplete="username"
              type="text"
            />
          </div>

          {emailDisabled && (
            <>
              <div className="text-center py-3">
                <Text as="p" variant="bodySm">
                  An OTP has been sent to your registerd email{" "}
                  <strong>
                    {identifier.includes("@")
                      ? identifier
                      : `of username ${identifier}`}
                  </strong>
                  . Please enter the 4-digit OTP below to verify.
                </Text>
              </div>
              <div className="flex justify-center space-x-2 py-4">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    ref={(ref: any) => (inputRefs.current[index] = ref)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    maxLength={1}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      textAlign: "center",
                      fontSize: "1.5rem",
                    }}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <div className="pb-2">
                <Text as="p" alignment="center">
                  <strong className="text-red-500">Note:</strong> Please check
                  your spam or junk folder if you do not receive the email
                  promptly. The email may take a few moments to arrive depending
                  on your internet connection.
                </Text>
              </div>
            </>
          )}
        </div>
      </Modal>
      {toastMessage && (
        <Toast
          content={toastMessage}
          onDismiss={() => setToastMessage(null)} // Clear toast on dismiss
          //   error={!toastMessage.toLowerCase().includes("success")} // Show as error if not a success message
        />
      )}

      {verified && <SetNewPassword open={verified} identifier={identifier} />}
    </>
  );
};

export default ForgotPassword;
