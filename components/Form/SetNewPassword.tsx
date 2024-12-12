import { Modal, TextField } from "@shopify/polaris";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SetNewPasswordProps {
  open: boolean;
  identifier: string;
}

const SetNewPassword: React.FC<SetNewPasswordProps> = ({
  open,
  identifier,
}) => {
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [identifier, setIdentifier] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  //   if (open) setOpenModal(true);

  const handleSave = async () => {
    // Implement password reset logic here
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.BACKEND}/api/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier,
            newPassword: password,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        // Handle successful password reset
        // setPassword("")
        router.push("/login");
        setOpenModal(false);
        // console.log(result);
      } else {
        console.log(result);
        // Handle failed password reset
        // setPasswordError(result.error);
      }
      // setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Recover your password"
      open={openModal}
      onClose={() => setOpenModal(false)}
      primaryAction={{
        content: "Submit",
        loading,
        // disabled: loading || identifier === "",
        onAction: handleSave,
      }}
      // secondaryActions={[
      //   {
      //     content: "Clear All",
      //     onAction: clearAllFields,
      //   },
      // ]}
    >
      <div className="p-4 space-y-2">
        <TextField
          autoComplete=""
          label="New Password"
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
      </div>
    </Modal>
  );
};

export default SetNewPassword;
