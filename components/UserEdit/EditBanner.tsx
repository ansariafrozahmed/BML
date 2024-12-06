"use client";
import { Form, Modal, Upload, Tooltip, message, Popover } from "antd";
import { LoaderCircle, Pencil } from "lucide-react";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";

const { Dragger } = Upload;

interface EditBannerProps {
  token: any;
}

const EditBanner: React.FC<EditBannerProps> = (token) => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const openModal = () => {
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
      {/* <Popover
        placement="left"
        color="#fff"
        className="text-black"
        title={<span className="text-primary px-2">Edit Banner Image</span>}
      > */}
      <div className="space-y-2">
        <div
          onClick={openModal}
          className="bg-white p-2 rounded-full cursor-pointer shadow-2xl "
        >
          <Pencil size={18} className="text-primary" />
        </div>
        <div
          onClick={openModal}
          className="bg-white p-2 rounded-full cursor-pointer shadow-2xl hover:scale-90 transition-transform ease-in-out duration-200"
        >
          <Pencil size={18} className="text-primary" />
        </div>
        <div
          onClick={openModal}
          className="bg-white p-2 rounded-full cursor-pointer shadow-2xl hover:scale-90 transition-transform ease-in-out duration-200"
        >
          <Pencil size={18} className="text-primary" />
        </div>
      </div>
      {/* </Popover> */}

      <Modal
        open={open}
        footer={null}
        width={450}
        onCancel={() => {
          // if (uploading) {
          //   setOpen(true);
          // } else {
          //   setOpen(false);
          // }

          !uploading && setOpen(false);
        }}
        title="Update Your Banner"
      >
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
                Only one file is allowed. Please upload a valid image format.
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
                "Update"
              )}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditBanner;
