"use client";
import React, { useState } from "react";
import { Upload, Button, message, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { updateBannerImage } from "@/store/userProfile";

const EditBanner = ({ token }: any) => {
  const [fileList, setFileList] = useState<any[]>([]); // State to store uploaded files
  const dispatch = useDispatch();

  // Handle file upload change
  const handleChange = (info: any) => {
    let newFileList = [...info.fileList];

    // Keep only the first file in the list (replace previous one)
    newFileList = newFileList.slice(-1);

    // Get the URL for preview directly

    // Dispatch action to update the banner image in the Redux store
    dispatch(updateBannerImage(newFileList));

    setFileList(newFileList); // Update the file list state
  };

  // Remove file handler
  const handleRemove = (file: any) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid)); // Remove from state
    dispatch(updateBannerImage(""));
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
      {fileList.length > 0 && fileList[0]?.url && (
        <div className="mt-5 space-y-3">
          <h4>Preview</h4>
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
      )}
    </div>
  );
};

export default EditBanner;
