import React from "react";

const Page = () => {
  return (
    <div>
      {JSON.stringify(process.env.FRONTEND)}
      <br />
      {JSON.stringify(process.env.BACKEND)}
      <br />
      {JSON.stringify(process.env.GALLERYURL)}
    </div>
  );
};

export default Page;
