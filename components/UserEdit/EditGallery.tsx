import { Modal } from "antd";
import { ImageUp, Pencil } from "lucide-react";
import React, { useState } from "react";

const EditGallery = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center bg-gray-100 gap-3 px-4 py-3 border rounded-full border-gray-400 cursor-pointer transition-all ease-in-out duration-200"
      >
        {/* <ImageUp size={17} /> */}
        <span className="font-light">
          Upload images and videos in your gallery
        </span>
      </div>

      <Modal
        width={800}
        style={{
          top: 50,
        }}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      ></Modal>
    </>
  );
};

export default EditGallery;
