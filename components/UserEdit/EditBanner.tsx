"use client";
import {
  Form,
  Modal,
  Upload,
  Tooltip,
  message,
  Popover,
  Input,
  Button,
} from "antd";
import {
  EllipsisVertical,
  Facebook,
  Image as Limage,
  LoaderCircle,
} from "lucide-react";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";

const { Dragger } = Upload;

interface EditBannerProps {
  token: any;
}

const EditBanner: React.FC<EditBannerProps> = (token) => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [socialMediaEdit, setSocialMediaEdit] = useState(false);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const openModal = (key: boolean) => {
    setSocialMediaEdit(key);
    setOpen(true);
    setUploading(false);
  };

  const handleBannerUpload = async (values: { banner_image: any[] }) => {
    // Ensure a file is provided
    if (!values.banner_image || values.banner_image.length === 0) {
      message.error("Please upload a banner image.");
      return;
    }

    const file = values.banner_image[0].originFileObj;

    const formData = new FormData();
    formData.append("bannerImage", file);

    setUploading(true); // Set uploading to true before making the API call

    try {
      const response = await fetch(`${process.env.BACKEND}/api/uploadBanner`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        body: formData,
      });

      // Handle response
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload banner image.");
      }

      // Success handling
      router.refresh();
      setTimeout(() => {
        form.resetFields();
        setOpen(false); // Close modal only if upload succeeds
      }, 1000);
    } catch (error: any) {
      message.error(
        error.message || "An error occurred while uploading. Please try again."
      );
    }
  };

  return (
    <>
      <div
        className="relative space-y-2"
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        {/* Three Dot Button */}
        <div className="bg-white p-2 rounded-full cursor-pointer shadow-2xl">
          <EllipsisVertical size={18} className="text-primary" />
        </div>

        {/* Options (conditionally rendered) */}
        <div
          className={`space-y-4 transition-all ease-in-out flex flex-col items-start ${
            showOptions
              ? "translate-y-0 opacity-100"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <Tooltip
            color="white"
            placement="left"
            title={<span className="text-primary">Update banner</span>}
          >
            <div
              onClick={() => openModal(false)}
              className="bg-white p-2 flex item rounded-full cursor-pointer shadow-2xl hover:scale-90 transition-transform ease-in-out duration-200"
            >
              <Limage size={18} className="text-primary" />
            </div>
          </Tooltip>

          <Tooltip
            color="white"
            placement="left"
            title={<span className="text-primary">Update Social Media</span>}
          >
            <div
              onClick={() => openModal(true)}
              className="bg-white p-2 flex item rounded-full cursor-pointer shadow-2xl hover:scale-90 transition-transform ease-in-out duration-200"
            >
              <Facebook size={18} className="text-primary" />
            </div>
          </Tooltip>
        </div>
      </div>

      <Modal
        open={open}
        footer={null}
        width={450}
        onCancel={() => !uploading && setOpen(false)}
      >
        {socialMediaEdit ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Update Social Media Links
            </h2>
            <Form
              form={form}
              // onFinish={handleSocialMediaUpdate}
              layout="vertical"
              initialValues={{
                facebook: "",
                instagram: "",
                twitter: "",
                linkedin: "",
              }}
            >
              {/* Facebook */}
              <Form.Item
                name="facebook"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Facebook link",
                  },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={"/social media icons/facebook.png"}
                    alt=""
                    height={30}
                    width={30}
                  />
                  <Input placeholder="https://facebook.com/your-profile" />
                </div>
              </Form.Item>

              {/* Instagram */}
              <Form.Item
                name="instagram"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Instagram link",
                  },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={"/social media icons/facebook.png"}
                    alt=""
                    height={30}
                    width={30}
                  />
                  <Input placeholder="https://instagram.com/your-profile" />
                </div>
              </Form.Item>

              {/* Twitter */}
              <Form.Item
                name="twitter"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Twitter link",
                  },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={"/social media icons/facebook.png"}
                    alt=""
                    height={30}
                    width={30}
                  />
                  <Input placeholder="https://twitter.com/your-profile" />
                </div>
              </Form.Item>

              {/* LinkedIn */}
              <Form.Item
                name="linkedin"
                rules={[
                  {
                    required: true,
                    message: "Please enter your LinkedIn link",
                  },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={"/social media icons/facebook.png"}
                    alt=""
                    height={30}
                    width={30}
                  />
                  <Input placeholder="https://linkedin.com/in/your-profile" />
                </div>
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-4 hover:opacity-90 w-full flex items-center justify-center transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-medium"
                >
                  {uploading ? (
                    <LoaderCircle size={20} className="animate-spin" />
                  ) : (
                    "Update Social Media"
                  )}
                </button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <Form form={form} onFinish={handleBannerUpload} layout="vertical">
              <Form.Item
                name="banner_image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <Dragger
                  accept="image/*"
                  beforeUpload={() => false} // Prevent auto-upload
                  multiple={false}
                  listType="picture"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Only one file is allowed. Please upload a valid image
                    format.
                  </p>
                </Dragger>
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-4 hover:opacity-90 w-full flex items-center justify-center transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-medium"
                >
                  {uploading ? (
                    <LoaderCircle size={20} className="animate-spin" />
                  ) : (
                    "Update Banner"
                  )}
                </button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default EditBanner;
