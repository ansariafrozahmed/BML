import React, { useState, useRef } from "react";
import { Modal, Text } from "@shopify/polaris";
import { Input } from "antd";

const OtpVerifyModal = ({
  active,
  email,
  setToastMessage,
  setOpenOtpVerifyModal,
  saveRegistration,
}: {
  active: boolean;
  email: string;
  setToastMessage: any;
  setOpenOtpVerifyModal: any;
  saveRegistration: any;
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);

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

  const clearAll = () => {
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleSave = async () => {
    setLoading(true);
    const requestBody = {
      otp: otp.join(""),
      email,
    };

    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/verify_otp_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setToastMessage(`${data.message}`);
        setLoading(false);
      } else {
        saveRegistration();
        setOpenOtpVerifyModal(false);
        setToastMessage(`${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Verify your email"
      onClose={() => setOpenOtpVerifyModal(false)}
      open={active}
      primaryAction={{
        content: "Submit",
        loading: loading,
        disabled: loading || otp.some((digit) => digit === ""),
        onAction: handleSave,
      }}
      secondaryActions={[
        {
          content: "Clear All",
          onAction: clearAll,
        },
      ]}
    >
      <div className="text-center py-3">
        <Text as="p" variant="bodySm">
          An OTP has been sent to your email: <strong>{email}</strong>. Please enter the 4-digit OTP below to verify.
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
    </Modal>
  );
};

export default OtpVerifyModal;
