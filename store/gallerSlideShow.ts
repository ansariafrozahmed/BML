import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of an image object
interface Image {
  title: string; // Title of the image
  path: string; // Path to the image
}

// Define the initial state structure
interface GallerySlideShowState {
  images: Image[]; // Array of image objects
  isActive: boolean; // Indicates whether the slideshow modal is active
  selectedIndex: number; // Index of the currently selected image in the gallery
}

const initialState: GallerySlideShowState = {
  images: [], // Initially, no images
  isActive: false, // Modal is not active by default
  selectedIndex: 0, // Initially, no image is selected
};

const gallerySlideShow = createSlice({
  name: "gallerySlideShow",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<Image>) => {
      // Adds a new image object to the state
      state.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<string>) => {
      // Removes an image by its path
      state.images = state.images.filter((image) => image.path !== action.payload);
    },
    setImages: (state, action: PayloadAction<Image[]>) => {
      // Replaces the entire state with a new array of image objects
      state.images = action.payload;
    },
    clearImages: (state) => {
      // Clears the images array
      state.images = [];
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      // Sets the slideshow modal's active state
      state.isActive = action.payload;
    },
    toggleActive: (state) => {
      // Toggles the slideshow modal's active state
      state.isActive = !state.isActive;
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      // Sets the selected index of the image
      state.selectedIndex = action.payload;
    },
  },
});

// Export actions
export const {
  addImage,
  removeImage,
  setImages,
  clearImages,
  setActive,
  toggleActive,
  setSelectedIndex,
} = gallerySlideShow.actions;

// Export the reducer
export default gallerySlideShow.reducer;
