"use client";

import { getCookie, showMessage } from "@/lib/reuse";
import { RootState } from "@/store";
import {
  setActive,
  setImages,
  setSelectedIndex,
} from "@/store/gallerSlideShow";
import {
  deleteItemById,
  setGalleryData,
  updateTitleById,
} from "@/store/gallerySlice";
// import { Modal } from "@shopify/polaris";
import { Modal, Popover } from "antd";
import axios from "axios";
import {
  ArrowLeft,
  Delete,
  Edit,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// import EditGallery from "../UserEdit/EdiSocailLinks";

type GalleryItem = {
  id: any;
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
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setUrl] = useState("");
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
      console.log(result, "result");
      dispatch(setGalleryData(result as any));
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
    <div className="grid grid-cols-4 lg:flex items-center gap-4">
      {galleryData &&
        Object.keys(galleryData).map((year) => (
          <div
            key={year}
            onClick={() => setSelectedYear(year)}
            className="text-center cursor-pointer lg:w-[110px]"
          >
            <Image
              className="h-full w-full object-contain"
              src="/social media icons/folder.png"
              alt={`Folder for ${year}`}
              height={200}
              width={200}
            />
            <h3 className="text-center text-sm text-user_primary">
              गणेशोत्सव {year}
            </h3>
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
      <div className="grid grid-cols-4 lg:flex items-center gap-4">
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

    const handleRename = async (item: any) => {
      try {
        // Show SweetAlert2 prompt with text input
        const { value: newTitle } = await Swal.fire({
          title: "Rename Item",
          input: "text",
          inputLabel: "New Title",
          inputValue: item.title, // Pre-fill current title
          showCancelButton: true,
          confirmButtonText: "Save",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "The title cannot be empty!";
            }
            if (value.trim() === item.title.trim()) {
              return "Please enter a different title.";
            }
            return null;
          },
        });

        // Check if the user confirmed the action
        if (newTitle) {
          // Send a request to the backend to update the title
          const response = await axios.post(
            `${process.env.BACKEND}/api/updateTitle`,
            {
              id: item.id,
              newTitle,
            },
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${getCookie("BMLTK")}`,
              },
            }
          );

          // Handle the response
          if (response.status === 200) {
            showMessage("Title updated successfully", "success");
            dispatch(updateTitleById({ id: item.id, newTitle }));
          } else {
            showMessage("Title not updated successfully", "error");
          }
        }
      } catch (error) {
        console.error("Error during renaming:", error);
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    };

    const handleDelete = async (item: { id: number; title: string }) => {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete the media ${item.title} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Show the loading "Deleting..." message before the request
          const loadingSwal: any = Swal.fire({
            title: "Deleting...",
            text: "Please wait while we delete the media.",
            icon: "info",
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading(); // Show the loading spinner
            },
          });

          try {
            // Make the backend request to delete the item
            const response = await fetch(
              `${process.env.BACKEND}/api/deleteMedia`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getCookie("BMLTK")}`,
                },
                body: JSON.stringify({ id: item.id }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to delete the media.");
            }

            // Dispatch the delete action to update Redux state
            dispatch(deleteItemById(item.id));

            // Close the loading Swal and show the success message
            loadingSwal.close();
            Swal.fire("Deleted!", "The media has been deleted.", "success");
          } catch (error) {
            // Close the loading Swal and show the error message
            loadingSwal.close();
            Swal.fire("Error!", "Failed to delete the media.", "error");
            console.error("Delete error:", error);
          }
        }
      });
    };

    const handleUrlIframe = (url: any) => {
      setShowModal(true);
      setUrl(url);
    };

    return (
      <div>
        <button
          onClick={() => setSelectedType(null)}
          className="mb-3 flex items-center gap-2 text-sm tracking-wide transition"
        >
          <ArrowLeft size={20} strokeWidth={1} className="mb-0.5" />
          Back
        </button>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 lg:gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-1.5 lg:p-3 border rounded bg-white space-y-2 shadow-lg"
              >
                {selectedType === "images" ? (
                  <div className="relative space-y-2">
                    <Popover
                      content={
                        <div className="w-32 text-sm ">
                          <div
                            className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                            onClick={() => handleRename(item)}
                          >
                            <Edit size={15} /> Rename
                          </div>
                          <div
                            className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash size={15} />
                            Delete
                          </div>
                        </div>
                      }
                      placement="bottom"
                      trigger={"click"}
                    >
                      <div className="absolute cursor-pointer top-1 right-1 bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] text-dark rounded-full p-1.5">
                        <EllipsisVertical size={17} />
                      </div>
                    </Popover>

                    <Image
                      height={600}
                      width={600}
                      src={
                        (item as GalleryItem).url
                          ? `${process.env.GALLERYURL}/${
                              (item as GalleryItem).url
                            }`
                          : ""
                      }
                      alt={`Gallery image ${index}`}
                      className="aspect-[4/2.8] rounded-[2px] w-full object-cover"
                      onClick={() => {
                        // Set all items with title and URL in the slideshow
                        dispatch(
                          setImages(
                            items.map((i) => ({
                              title: (i as GalleryItem).title || "Untitled", // Fallback to "Untitled" if no title
                              path: (i as GalleryItem).url, // Image URL
                            }))
                          )
                        );
                        dispatch(setSelectedIndex(index)); // Set the selected index
                        dispatch(setActive(true)); // Activate the lightbox
                      }}
                    />
                    <p className="text-center capitalize tracking-wide text-gray-700 text-xs lg:text-base text-ellipsis whitespace-normal break-words">
                      {(item as GalleryItem).title || "Image description"}
                    </p>
                  </div>
                ) : (
                  <div className="relative ">
                    <div className="relative z-[999]">
                      <Popover
                        content={
                          <div className="w-32 text-sm ">
                            {/* <div
                            className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                            onClick={() => handleRename(item)}
                          >
                            <Edit size={15} /> Rename
                          </div> */}
                            <div
                              className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                              onClick={() => handleDelete(item)}
                            >
                              <Trash size={15} />
                              Delete
                            </div>
                          </div>
                        }
                        placement="bottom"
                        trigger={"click"}
                      >
                        <div className="absolute cursor-pointer top-0 right-1 bg-white text-dark rounded-full p-1">
                          <EllipsisVertical size={17} />
                        </div>
                      </Popover>
                    </div>

                    <div className="relative">
                      <iframe
                        src={(item as GalleryItem).url}
                        className="aspect-[4/2.8] w-full"
                        allowFullScreen
                        title={`Video ${index}`}
                      />

                      <div
                        onClick={() => handleUrlIframe(item.url)}
                        className="cursor-pointer absolute  h-full z-[99] w-full top-0"
                      ></div>
                    </div>
                  </div>
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
    <div className="relative py-4 px-3 space-y-5 rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      {/* <h2 className="text-lg tracking-wide">Gallery</h2> */}
      {/* <div className="h-[2px] w-20 bg-primary rounded-full"></div> */}
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

      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setUrl("");
        }}
        className="!shadablegend"
        footer={null}
      >
        {/* <Modal.Section> */}
        <iframe
          src={videoUrl}
          className="aspect-[4/4] lg:aspect-[4/3]  w-full"
          allowFullScreen
          title={`Video`}
        />
      </Modal>
    </div>
  );
};

export default GalleryContainer;
