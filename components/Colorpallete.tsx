"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface ColorPalleteProps {
  colorPallete: {
    user_primary?: String;
    user_dark?: String;
  };
}

const ColorPallete: React.FC<ColorPalleteProps> = ({ colorPallete }) => {
  const { colorPicker } = useSelector((state: RootState) => state.userProfile);
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --template-user_primary: ${
              colorPicker?.user_primary || colorPallete?.user_primary
            };
            --template-user_dark: ${colorPicker?.user_dark || colorPallete?.user_dark};
          }
        `,
      }}
    />
  );
};

export default ColorPallete;
