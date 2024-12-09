import { createSlice } from "@reduxjs/toolkit";

const userProfile = createSlice({
  name: "userProfile",
  initialState: {
    banner_image: null,
    social_links: [], // Initialize as an empty array
    accountDetails: {
      first_name: null,
      last_name: null,
      bio: null,
      email: null,
      contact_details: null, // Initialize as an empty array
    },
    colorPicker: null,
  } as any,
  reducers: {
    updateUserProfile(state: any, action: any) {
      return { ...state, ...action.payload }; // Updates the entire profile
    },
    updateBannerImage(state: any, action: any) {
      state.banner_image = action.payload; // Updates only the banner image
    },
    updateSocialLink(state: any, action: any) {
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
    // New reducer to update account details
    updateAccountDetails(state: any, action: any) {
      const { first_name, last_name, bio, contact_details, email } =
        action.payload;

      // Update specific fields if provided
      if (first_name !== undefined)
        state.accountDetails.first_name = first_name;
      if (last_name !== undefined) state.accountDetails.last_name = last_name;
      if (bio !== undefined) state.accountDetails.bio = bio;
      if (email !== undefined) state.accountDetails.email = email;

      // If contact_details are provided, update the whole contact_details array
      if (contact_details !== undefined) {
        state.accountDetails.contact_details = contact_details;
      }
    },
    updateColorPicker(state: any, action: any) {
      state.colorPicker = action.payload; // Updates only the color picker
    },
  },
});

export const {
  updateUserProfile,
  updateBannerImage,
  updateSocialLink,
  updateAccountDetails,
  updateColorPicker,
} = userProfile.actions;

export default userProfile.reducer;
