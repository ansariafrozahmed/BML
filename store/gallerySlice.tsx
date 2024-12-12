import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GalleryItem = {
  id: number;
  title: string;
  url: string;
};

type GalleryData = {
  [year: string]: {
    images: GalleryItem[];
    videos: GalleryItem[];
  };
};

const galleryData = createSlice({
  name: "gallery",
  initialState: {
    data: null as GalleryData | null, // Initial state
  },
  reducers: {
    setGalleryData: (state, action: PayloadAction<GalleryData>) => {
      state.data = action.payload; // Set the entire gallery data
    },
    updateTitleById: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;

      // Iterate through the gallery data to find the matching item
      if (state.data) {
        for (const year in state.data) {
          const { images, videos } = state.data[year];

          // Update the title in the images array
          const imageItem = images.find((item) => item.id === id);
          if (imageItem) {
            imageItem.title = newTitle;
            return;
          }

          // Update the title in the videos array
          const videoItem = videos.find((item) => item.id === id);
          if (videoItem) {
            videoItem.title = newTitle;
            return;
          }
        }
      }
    },
    deleteItemById: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;

      // Iterate through the gallery data to find and delete the item
      if (state.data) {
        for (const year in state.data) {
          const { images, videos } = state.data[year];

          // Remove the item from images array
          state.data[year].images = images.filter((item) => item.id !== idToDelete);

          // Remove the item from videos array
          state.data[year].videos = videos.filter((item) => item.id !== idToDelete);
        }
      }
    },
  },
});

export const { setGalleryData, updateTitleById, deleteItemById } = galleryData.actions;

export default galleryData.reducer;
