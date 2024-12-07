import { createSlice } from "@reduxjs/toolkit";

const userProfile = createSlice({
  name: "userProfile",
  initialState: {
    banner_image: null,
    social_links: [], // Initialize as an empty array
  } as any,
  reducers: {
    updateUserProfile(state, action) {
      return { ...state, ...action.payload }; // Updates the entire profile
    },
    updateBannerImage(state, action) {
      state.banner_image = action.payload; // Updates only the banner image
    },
    updateSocialLink(state, action) {
      console.log(action.payload, "action.payload");

      const updatedLinks = action.payload.updatedSocialLinks;

      // Initialize social_links as an empty array if null
      if (!state.social_links) {
        state.social_links = [];
      }

      // Loop through updatedLinks and update the state
      updatedLinks.forEach(({ key, url }: any) => {
        const existingLinkIndex = state.social_links.findIndex(
          (link: any) => link.key === key
        );

        if (existingLinkIndex !== -1) {
          // Update the existing link's URL
          state.social_links[existingLinkIndex].url = url;
        } else {
          // Add the new link if it doesn't exist
          state.social_links.push({ key, url });
        }
      });
    },
  },
});

export const { updateUserProfile, updateBannerImage, updateSocialLink } =
  userProfile.actions;

export default userProfile.reducer;
