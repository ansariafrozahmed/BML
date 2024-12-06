import Image from "next/image";
import React from "react";
// import ContactButton from "./ContactButton";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/408.webp")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        id="home"
        className="templateContainer flex flex-col  lg:flex-row text-dark lg:h-[550px] gap-6 "
      >
        <div className="w-full lg:w-[60%] my-auto pt-8 lg:pt-0 space-y-4">
          <span className="uppercase tracking-widest font-normal text-">
            बाप्पा माझा लाडका
          </span>
          <div className="space-y-2 lg:space-y-4 -ml-1">
            <h1 className="text-primaryDark text-primary leading-snug text-[35px]  lg:text-6xl tracking-wide uppercase font-extrabold">
              तुमच्या गणपती मूर्तीकरिता
            </h1>
            <h2 className="text-[30px] lg:text-5xl uppercase leading-snug text-primaryGreen tracking-wide font-extrabold">
              एक मिनी वेबसाईट तयार करा!
            </h2>
          </div>
          <p className="text-sm tracking-wide w-full lg:w-[90%] text-gray-700">
            गणपतीच्या शाश्वत सौंदर्याचा आणि कलात्मकतेचा आनंद घ्या आमच्या निवडक
            दिव्य प्रतिमांच्या संग्रहातून. प्रत्येक नजरेतून भक्ती आणि
            सर्जनशीलतेचा उत्सव साजरा करा.
          </p>
          {/* <ContactButton text="Get in touch" /> */}
        </div>
        {/* ----------------- */}
        <div className="w-full h-full relative lg:w-[40%]">
          <div className="relative">
            {/* Head Ring positioned on top with rotation */}
            <Image
              src="/headring.png"
              alt="Head Ring"
              className="absolute top-4 select-none -ml-2 left-1/2 transform -translate-x-1/2 object-contain rotating-ring"
              height={330} // Adjust size as needed
              width={330}
            />
            {/* Ganesh Image */}
            <Image
              src="/bappa.png"
              alt="Ganesh Idol"
              className="object-contain select-none h-[550px] relative w-full"
              height={600}
              width={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
