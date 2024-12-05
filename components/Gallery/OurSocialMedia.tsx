import React from "react";

interface ShareProfileProps {}

const OurSocialMedia: React.FC<ShareProfileProps> = () => {
  return (
    <div className="p-5 space-y-2 rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <h2 className="text-xl font-semibold tracking-wider text-primary">Bio</h2>
      <div>
        <p className="text-sm tracking-wider text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum,
          provident fugiat repellendus neque impedit totam repellat delectus et
          amet adipisci, dicta ratione ut necessitatibus, dolore unde laudantium
          reprehenderit! Voluptas cumque explicabo cum eligendi atque? At quas
          nulla.
        </p>
      </div>
    </div>
  );
};

export default OurSocialMedia;
