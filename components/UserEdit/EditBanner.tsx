"use client";
import React, { useState, useEffect } from "react";
import { Upload, Button, message, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { updateBannerImage } from "@/store/userProfile";
import axios from "axios";
import { showMessage } from "@/lib/reuse";
import { useRouter } from "next/navigation";

const EditBanner = ({ banner_image, token }: any) => {
  const [fileList, setFileList] = useState<any[]>([]); // State to store uploaded files
  const [dbImage, setDbImage] = useState<string | null>(null); // State for database image
  const dispatch = useDispatch();
  const Router = useRouter()
  
  useEffect(() => {
    // Set database image if it exists
    if (banner_image) {
      setDbImage(banner_image);
    }
  }, [banner_image]);

  // Handle file upload change
  const handleChange = (info: any) => {
    let newFileList = [...info.fileList];

    // Keep only the first file in the list (replace previous one)
    newFileList = newFileList.slice(-1);

    // Process file status and previews
    newFileList = newFileList.map((file: any) => {
      file.url = URL.createObjectURL(file.originFileObj); // Create URL for preview
      return file;
    });

    // Dispatch action to update the banner image in the Redux store
    dispatch(updateBannerImage(newFileList[0] || ""));

    setFileList(newFileList); // Update the file list state
    setDbImage(null); // Remove the database image from preview
  };

  // Remove file handler for uploaded files
  const handleRemove = (file: any) => {
    setFileList([]);
    dispatch(updateBannerImage(""));
  };

  // Remove file handler for database image
  const handleDbDelete = async (image: string) => {
    try {
      // Send a request to delete the image from the server
      const response = await axios.post(
        `${process.env.BACKEND}/api/deleteBannerImage`,
        { image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showMessage("Image removed successfully", 'success');
        setDbImage(null); // Remove the database image from preview
        Router.refresh()
      } else {
        showMessage("Failed to remove the image", 'error');
      }
    } catch (error) {
      console.error("Error deleting the banner image:", error);
      showMessage("An error occurred while deleting the image", 'error');
    }
  };

  const uploadProps = {
    onChange: handleChange,
    onRemove: handleRemove,
    beforeUpload: (file: RcFile) => {
      return false; // Prevent auto upload
    },
    fileList,
  };

  return (
    <div className="p-5">
      <Upload.Dragger
        {...uploadProps}
        accept="image/*"
        multiple={false} // Only one file allowed
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag a file to upload</p>
      </Upload.Dragger>

      {/* Preview section */}
      {fileList.length > 0 && fileList[0]?.url ? (
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <Image width={100} src={fileList[0].url} alt="Preview" />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleRemove(fileList[0])}
              type="text"
              danger
            >
              Remove
            </Button>
          </div>
        </div>
      ) : dbImage ? (
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <Image
              width={100}
              src={`${process.env.BACKEND}/upload/banner/${dbImage}`}
              alt="Database Preview"
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDbDelete(dbImage)}
              type="text"
              danger
            >
              Remove
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditBanner;
