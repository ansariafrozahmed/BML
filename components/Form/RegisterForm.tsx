"use client";
import { Button, Form, FormProps, Input, Space } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);

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
      router.push("/login");
      form.resetFields();
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
                placeholder="For Example : shindeChaRaaja"
                className="border-gray-500 text-sm"
                onChange={handleUsernameChange}
              />
            </Form.Item>

            <Form.Item<FieldType>
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
              <Input
                prefix={<Mail size={14} className="mr-1" />}
                placeholder="Email"
                className="border-gray-500 text-sm"
              />
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

            <div>
              <Form.Item>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center  capitalize justify-center w-full gap-2 border border-dark bg-dark hover:opacity-90 py-2.5 rounded-md text-sm tracking-widest text-white font-medium ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
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
    </>
  );
};

export default RegisterForm;
