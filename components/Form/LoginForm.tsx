"use client";
import { Form, FormProps, Input } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useForm } from "antd/es/form/Form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

type FieldType = {
  password?: string;
  identifier?: string;
};

const LoginForm = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const requestData = {
      identifier: values.identifier,
      password: values.password,
    };

    setLoading(true);

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
        toast(errorResult.error);
        return;
      }

      const result = await response.json();
      toast(result.message);
      document.cookie = `BMLTK=${result.token}; path=/; SameSite=None; Secure`;
      router.push(`${process.env.FRONTEND}/${result.username}`);
    } catch (error: unknown) {
      console.error("Internal Server Error");
      toast(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[350px] space-y-2 p-6 rounded-md">
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
            Login to access your profile
          </p>
        </div>
        <div className="pt-4">
          <Form
            form={form}
            name="login_form"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
          >
            <Form.Item<FieldType>
              name="identifier"
              rules={[
                {
                  required: true,
                  message: "Please enter username or email!",
                  type: "string",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email or Username"
                className="border-gray-500 text-sm"
              />
            </Form.Item>

            {/* <div className="-mt-4 mb-4 text-right">
              <Link
                href={"/forgot-password"}
                className="text-xs w-full underline tracking-wide font-medium cursor-pointer hover:text-templateText text-templatePrimary"
              >
                Forgot your password ?
              </Link>
            </div> */}

            <Form.Item<FieldType>
              className="-mt-2"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                className="border-gray-500  text-sm"
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
                  {loading ? "Logging..." : "Log In"}
                </button>
              </Form.Item>
              <p className="text-center -mt-4 text-templateText capitalize text-xs">
                New to <span>Bappa Majha Laadka</span> ?{" "}
                <Link href={"/register"} className="text-primary underline">
                  Create an account
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
