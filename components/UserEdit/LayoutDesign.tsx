import { getCookie, showMessage } from "@/lib/reuse";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import layout01 from "@/assets/images/1.webp";
// import layout02 from "@/assets/images/2.webp";
import Image from "next/image";

const LayoutDesign = ({ layout_id }: { layout_id: number }) => {
  // Define an array of image objects with their paths
  const router = useRouter();
  const images = [
    { id: 1, src: "/1.webp", alt: "layout 01" },
    { id: 2, src: "/2.webp", alt: "layout 02" },
    { id: 3, src: "/3.webp", alt: "layout 03" },
    // { id: 3, src: "/3.jpg", alt: "Image 3" },
    // { id: 4, src: "/4.jpg", alt: "Image 4" },
  ];

  // State to manage the active image
  const [activeImage, setActiveImage] = useState<number | null>(null);

  // Set the active image based on the layout_id prop when the component mounts or layout_id changes
  useEffect(() => {
    setActiveImage(layout_id || null);
  }, [layout_id]);

  // Function to handle click and set active image
  const handleClick = async (id: number) => {
    setActiveImage(id);

    // Send the layout change to the backend
    try {
      const response = await fetch(`${process.env.BACKEND}/api/update-layout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("BMLTK")}`, // Add your authentication token here if needed
        },
        body: JSON.stringify({
          layout_id: id, // Send the new layout ID
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update layout on the server");
      }

      showMessage(`Layout Updated Successfully.`, "success");
      router.refresh();
      console.log("Layout updated successfully");
    } catch (error) {
      console.error("Error updating layout:", error);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold mb-4">Choose Layout</h2>
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
            <Image
              height={200}
              width={200}
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
