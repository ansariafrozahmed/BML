"use client";
import { Form, Modal, Upload, Tooltip, message } from "antd";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const EditBanner: React.FC = (token: any) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleBannerUpload = async (values: { banner_image: any[] }) => {
    if (!values.banner_image || values.banner_image.length === 0) {
      message.error("Please upload a banner image.");
      return;
    }

    const file = values.banner_image[0].originFileObj;

    const formData = new FormData();
    formData.append("bannerImage", file);

    console.log(token);

    try {
      setUploading(true);
      const response = await fetch(`${process.env.BACKEND}/api/uploadBanner`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        message.success("Banner image updated successfully!");
        setOpen(false);
      } else {
        const error = await response.json();
        message.error(error.message || "Failed to upload banner image.");
      }
    } catch (error) {
      message.error("An error occurred while uploading. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Tooltip
        placement="left"
        color="#fff"
        className="text-black"
        title={<span className="text-primary px-2">Edit Banner Image</span>}
      >
        <div
          onClick={() => setOpen(true)}
          className="bg-white p-2 rounded-full cursor-pointer shadow-2xl hover:scale-90 transition-transform ease-in-out duration-200"
        >
          <Pencil size={18} className="text-primary" />
        </div>
      </Tooltip>

      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        title="Update Your Banner"
      >
        <Form onFinish={handleBannerUpload} layout="vertical">
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
              className="px-6 py-3 hover:scale-105 transition-all ease-in-out duration-200 text-xs bg-dark text-white rounded-full leading-none tracking-wide font-medium"
            >
              {uploading ? "Uploading..." : "Update"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditBanner;
