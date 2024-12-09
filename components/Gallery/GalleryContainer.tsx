"use client";

import { RootState } from "@/store";
import { setGalleryData } from "@/store/gallerySlice";
import { ArrowLeft, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import EditGallery from "../UserEdit/EdiSocailLinks";

type GalleryItem = {
  title: string;
  url: string;
};

type GalleryData = {
  [year: string]: {
    images: GalleryItem[];
    videos: string[];
  };
};

interface GalleryContainerProps {
  username: string;
}

const GalleryContainer: React.FC<GalleryContainerProps> = ({ username }) => {
  const [galleryError, setGalleryError] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const { data: galleryData } = useSelector(
    (state: RootState) => state.gallerySlice
  );
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState<"images" | "videos" | null>(
    null
  );

  const fetchGalleryData = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND}/api/getGalleryByUsername?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery data.");
      }

      const result: GalleryData = await response.json();
      dispatch(setGalleryData(result));
    } catch (error) {
      console.error(error);
      setGalleryError(true);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const resetSelection = () => {
    setSelectedType(null);
    setSelectedYear(null);
  };

  const renderYears = () => (
    <div className="grid grid-cols-3 lg:flex items-center gap-5">
      {galleryData &&
        Object.keys(galleryData).map((year) => (
          <div
            key={year}
            onClick={() => setSelectedYear(year)}
            className="text-center cursor-pointer lg:w-[100px]"
          >
            <Image
              className="h-full w-full object-contain"
              src="/social media icons/folder.png"
              alt={`Folder for ${year}`}
              height={200}
              width={200}
            />
            <h3 className="text-center text-sm text-dark">{year}</h3>
          </div>
        ))}
    </div>
  );

  const renderContentTypes = () => (
    <div>
      <button
        onClick={resetSelection}
        className="mb-4 flex items-center gap-2 text-sm tracking-wide transition"
      >
        <ArrowLeft size={20} strokeWidth={1} className="mb-0.5" />
        Back
      </button>
      <div className="grid grid-cols-3 lg:flex items-center gap-5">
        {["images", "videos"].map((type) => (
          <div
            key={type}
            onClick={() => setSelectedType(type as "images" | "videos")}
            className="text-center cursor-pointer lg:w-[100px]"
          >
            <Image
              className="h-full w-full object-contain"
              src="/social media icons/folder.png"
              alt={`${type} folder`}
              height={200}
              width={200}
            />
            <h3 className="text-center text-sm text-dark">{type}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGalleryContent = () => {
    if (!selectedYear || !selectedType || !galleryData) return null;

    const items =
      selectedType === "images"
        ? galleryData[selectedYear].images
        : galleryData[selectedYear].videos;

    return (
      <div>
        <button
          onClick={() => setSelectedType(null)}
          className="mb-4 flex items-center gap-2 text-sm tracking-wide transition"
        >
          <ArrowLeft size={20} strokeWidth={1} className="mb-0.5" />
          Back
        </button>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {items.map((item, index) => (
              <div key={index} className="p-3 bg-white space-y-2 shadow-lg">
                {selectedType === "images" ? (
                  <>
                    <Image
                      height={600}
                      width={600}
                      src={
                        (item as GalleryItem).url
                          ? `${process.env.BACKEND}/upload/gallery/${
                              (item as GalleryItem).url
                            }`
                          : ""
                      }
                      alt={`Gallery image ${index}`}
                      className=" aspect-[4/2.8] w-full object-cover"
                    />
                    <p className="text-center capitalize tracking-wide text-gray-700 text-base">
                      {(item as GalleryItem).title || "Image description"}
                    </p>
                  </>
                ) : (
                  <>
                    <iframe
                      src={(item as GalleryItem).url}
                      className="aspect-[4/2.8] w-full"
                      allowFullScreen
                      title={`Video ${index}`}
                    />
                    <p className="text-center text-base">Video {index + 1}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-500 text-lg">
            No media found for this year.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative p-6 space-y-5 rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <h2 className="text-lg tracking-wide">Gallery</h2>
      <div className="h-[2px] w-20 bg-primary rounded-full"></div>
      {/* <EditGallery /> */}
      {galleryError && (
        <p className="text-red-500 text-center">
          Failed to load gallery data. Reload again
        </p>
      )}
      {galleryData && !selectedYear && !selectedType && renderYears()}
      {selectedYear && !selectedType && renderContentTypes()}
      {selectedYear && selectedType && renderGalleryContent()}

      {/* ----------- */}
      {/* EDIT GALLERY */}
    </div>
  );
};

export default GalleryContainer;
