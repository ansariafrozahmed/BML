import { RootState } from "@/store";
import { updateColorPicker } from "@/store/userProfile";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

const ColorTheme = ({ userData }: any) => {
  const [primaryColor, setPrimaryColor] = useState("#ff5722"); // Default primary color
  const [darkColor, setDarkColor] = useState("#212121"); // Default dark color
  const { colorPicker } = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  // Debounced dispatch to avoid frequent re-renders
  const debouncedDispatch = useCallback(
    debounce((colors: any) => {
      dispatch(updateColorPicker(colors));
    }, 300),
    []
  );

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setPrimaryColor(newColor);
    debouncedDispatch({
      user_primary: newColor,
      user_dark: colorPicker?.user_dark || userData?.colors?.user_dark,
    });
  };

  const handleDarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setDarkColor(newColor);
    debouncedDispatch({
      user_primary: colorPicker?.user_primary || userData?.colors?.user_primary,
      user_dark: newColor,
    });
  };

  return (
    <div className="mt-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Customize Your Theme
      </h2>

      {/* Primary Color Picker */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Color
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={primaryColor}
            onChange={handlePrimaryChange}
            className="w-14 h-14 border rounded-full cursor-pointer shadow"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            placeholder="#ff5722"
          />
        </div>
      </div>

      {/* Dark Color Picker */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Secondary Color
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={darkColor}
            onChange={handleDarkChange}
            className="w-14 h-14 border rounded-full cursor-pointer shadow"
          />
          <input
            type="text"
            value={darkColor}
            onChange={(e) => setDarkColor(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            placeholder="#212121"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorTheme;
