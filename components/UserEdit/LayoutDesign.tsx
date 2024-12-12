import React, { useState } from "react";

const LayoutDesign = () => {
  // Define an array of image objects with their paths
  const images = [
    { id: 1, src: "https://img.freepik.com/free-vector/gradient-night-club-twitch-background_23-2149909675.jpg", alt: "Image 1" },
    { id: 2, src: "https://img.freepik.com/free-vector/gradient-night-club-twitch-background_23-2149909675.jpg", alt: "Image 2" },
    { id: 3, src: "https://img.freepik.com/free-vector/gradient-night-club-twitch-background_23-2149909675.jpg", alt: "Image 3" },
    { id: 4, src: "https://img.freepik.com/free-vector/gradient-night-club-twitch-background_23-2149909675.jpg", alt: "Image 4" },
  ];

  // State to manage the active image
  const [activeImage, setActiveImage] = useState<number | null>(null);

  // Function to handle click and set active image
  const handleClick = (id: number) => {
    setActiveImage(id);
  };

  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold mb-4">
        Choose Layout
      </h2>
      <p>Layout is in progress,</p>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`cursor-pointer p-2 border-2 ${
              activeImage === image.id
                ? "border-blue-500"
                : "border-transparent"
            } transition-all duration-300 hover:scale-105`}
            onClick={() => handleClick(image.id)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutDesign;
