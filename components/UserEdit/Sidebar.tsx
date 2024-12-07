"use client";
import React, { useState } from "react";

const Sidebar = () => {
  const [toggle, setToggle] = useState(true);

  return <div className={`${toggle ? "w-[25%]" : "w-0"}`}>sidebar</div>;
};

export default Sidebar;
