"use client";
import { Button, Form, FormProps, Input, Modal, Space } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { error } from "console";

type FieldType = {
  first_name?: string;
  username?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

const RegisterForm = () => {
  const [form] = useForm();
  const router = useRouter();
  const [sendingOtp, setSendingOtp] = useState(false);
  const [openOtpVerifyModal, setOpenOtpVerifyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  console.log(checked);

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
        toast(`${data.error}`);
      } else {
        setOpenOtpVerifyModal(true);
        setSendingOtp(false);
      }
    } catch (error) {
      console.error("Error");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email using a simple regex pattern or Form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsButtonDisabled(!emailRegex.test(value));
  };

  const validateUsername = (username: string) => {
    // The regex checks for lowercase letters and numbers only.
    return /^[a-z0-9]+$/.test(username);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validateUsername(value)) {
      // You can set error state here or trigger UI feedback if needed
      console.log(
        "Invalid username! Must contain only lowercase letters and numbers."
      );
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);

    const joinedAt = new Date().toISOString();
    const requestBody = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      email: values.email,
      password: values.password,
      joinedAt,
    };

    try {
      const response = await fetch(`${process.env.BACKEND}/api/user_register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error message if available
        const errorMessage =
          data?.error || "An error occurred during registration.";
        toast(errorMessage);
        return;
      }

      toast("Registered successfully");
      form.resetFields();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      // Redirect to login page or perform further actions
    } catch (error) {
      console.error("Registration failed:", error);
      toast("Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {};

  const handleOtpSubmit = async (value: any) => {
    const requestBody = {
      otp: value.otp,
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
        toast(`${data.message}`);
      } else {
        setEmailVerified(true);
        setOpenOtpVerifyModal(false);
        toast(`${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[350px] space-y-3 p-6 rounded-md">
        <Link href={"/"} className="block">
          <Image
            src={`/logo.webp`}
            alt={"Logo"}
            height={100}
            width={200}
            className="w-[60px] h-full lg:w-[80px] object-contain"
          />
        </Link>
        <div className="space-y-0.5">
          <h2 className="text-base font-medium text-templateText">Welcome</h2>
          <p className="text-xs text-templateText">
            Register to create your profile
          </p>
        </div>
        <div className="">
          <Form
            form={form}
            name="register_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
          >
            <Space>
              <Form.Item<FieldType>
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    type: "string",
                  },
                ]}
              >
                <Input
                  prefix={<UserRound size={14} className="mr-1" />}
                  placeholder="First Name"
                  className="border-gray-500 text-sm"
                />
              </Form.Item>
              <Form.Item<FieldType>
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    type: "string",
                  },
                ]}
              >
                <Input
                  prefix={<UserRound size={14} className="mr-1" />}
                  placeholder="Last Name"
                  className="border-gray-500 text-sm"
                />
              </Form.Item>
            </Space>

            <Form.Item<FieldType>
              name="username"
              className="-mt-2"
              rules={[
                {
                  required: true,
                  type: "string",
                },
                {
                  validator: (_, value) => {
                    if (!/^[a-z0-9]+$/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Username must contain only lowercase letters and numbers"
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                prefix={<UserRound size={14} className="mr-1" />}
                placeholder="For Example : shindecharaja"
                className="border-gray-500 text-sm"
                onChange={handleUsernameChange}
              />
            </Form.Item>

            <Form.Item
              name="email"
              className="-mt-2"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <div className="flex items-center gap-2">
                <Input
                  disabled={emailVerified}
                  value={`${email}`}
                  prefix={<Mail size={14} className="mr-1" />}
                  placeholder="Email"
                  onChange={handleEmailChange}
                  className="border-gray-500 text-sm"
                />
                {emailVerified ? (
                  <div
                    className={`flex bg-green-500 items-center py-[10px] justify-center rounded-lg leading-none !text-xs tracking-wide w-28 text-white`}
                  >
                    Verified
                  </div>
                ) : (
                  <>
                    {!isButtonDisabled && (
                      <div
                        onClick={() => {
                          !sendingOtp && verifyEmail();
                        }}
                        className={`flex cursor-pointer hover:bg-primary/90 items-center py-[10px] justify-center rounded-lg leading-none !text-xs tracking-wide w-28 text-white ${
                          isButtonDisabled ? "bg-gray-400" : "bg-primary"
                        }`}
                      >
                        {sendingOtp ? (
                          <LoaderCircle size={15} className="animate-spin" />
                        ) : (
                          "GET OTP"
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </Form.Item>

            <Form.Item
              className="-mt-2"
              name="password"
              rules={[
                {
                  pattern: /^.{3,}$/,
                  message: "Password must be at least 3 characters long",
                },
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockKeyhole size={14} className="mr-1" />}
                type="password"
                className="border-gray-500 text-sm"
                placeholder="Password"
              />
            </Form.Item>

            <div className="flex items-center gap-2 text-xs pb-2">
              <input
                type="checkbox"
                onChange={(e) => setChecked(e.target.checked)}
                className=""
              />
              <label>By accepting you agree to our polcies</label>
            </div>

            <div>
              <Form.Item>
                <button
                  type="submit"
                  disabled={loading || !emailVerified || !checked}
                  className={`flex items-center  capitalize justify-center w-full gap-2 border border-dark bg-dark  py-2.5 rounded-md text-sm tracking-widest text-white font-medium ${
                    loading || !emailVerified || !checked
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:opacity-90"
                  }`}
                >
                  {loading && (
                    <LoaderCircle className="animate-spin" size={15} />
                  )}
                  {loading ? "Registering..." : "Register"}
                </button>
              </Form.Item>
              <p className="text-center -mt-4 text-templateText text-xs">
                Already <span className="text-primary">Bappa Majha Laadka</span>{" "}
                user ?{" "}
                <Link href={"/login"} className="text-primary underline">
                  Login now
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>

      {/* ----------- */}

      <Modal
        open={openOtpVerifyModal}
        footer={null}
        width={350}
        // onCancel={() => setOpenOtpVerifyModal(false)}
        centered
        className="otp-modal"
      >
        <div className="text-center p-2">
          <h2 className="text-lg font-semibold mb-2">Verify OTP</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter the 4-digit OTP sent to your email{" "}
            <span className="text-primary">{email}</span>
          </p>
          <Form onFinish={handleOtpSubmit} className="space-y-0">
            <Form.Item
              name="otp"
              rules={[
                { required: true, message: "Please enter the OTP!" },
                { len: 4, message: "OTP must be exactly 4 digits!" },
              ]}
            >
              <Input.OTP
                length={4}
                className="w-full text-center text-lg tracking-widest p-2 rounded-md border-gray-300 focus:ring focus:ring-primary focus:border-primary"
              />
            </Form.Item>
            <button
              type="submit"
              className="w-full bg-primary text-white rounded-md py-2 font-medium hover:bg-primary-dark"
            >
              Verify OTP
            </button>
          </Form>
          {/* <p className="text-sm text-gray-600 mt-3">
            Didn't receive the OTP?{" "}
            <span
              className="text-primary font-semibold cursor-pointer hover:underline"
              onClick={() => console.log("Resend OTP")}
            >
              Resend
            </span>
          </p> */}
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
