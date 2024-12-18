import React from "react";

const NoticeModal = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center fixed inset-0 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"></div>

      {/* Content */}
      <div className="z-10 text-center text-white px-4 max-w-screen-md mx-auto">
        <h1 className="text-2xl md:text-3xl capitalize font-bold mb-4">
          Profile approval is pending
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Please wait while the account is being reviewed.
        </p>
      </div>
    </div>
  );
};

export default NoticeModal;
