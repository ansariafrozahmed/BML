import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const galleryData = createSlice({
  name: "gallery",
  initialState: {
    data: null as GalleryData | null, // Initial state
  },
  reducers: {
    setGalleryData: (state, action: PayloadAction<GalleryData>) => {
      state.data = action.payload; // Set the entire gallery data
    },
  },
});

export const { setGalleryData } = galleryData.actions;

export default galleryData.reducer;
