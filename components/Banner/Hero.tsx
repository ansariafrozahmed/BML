import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="w-full h-auto z-30">
        {/* <Link href={"/register"}> */}
        <Image
          src={"/latestbanner.webp"}
          alt=""
          height={1200}
          width={1600}
          className="w-full"
          priority={true}
          sizes="100vw"
        />
        {/* </Link> */}
      </div>
      <div className="templateContainer py-5 lg:py-8">
        <h1 className="text-[22px] lg:text-5xl tracking-wide font-medium text-primary leading-snug lg:leading-tight text-center">
          परंपरेने साजरा करूया आनंदोत्सव,
          <br />
          डिजिटली वायरल करूया गणेशोत्सव!
        </h1>
      </div>
    </div>
  );
};

export default Hero;
// import Image from "next/image";
// import React from "react";
// // import ContactButton from "./ContactButton";

// const Hero = () => {
//   return (
//     <div
//       style={{
//         backgroundImage: 'url("/408.webp")',
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "left center",
//       }}
//     >
//       <div className="templateContainer flex flex-col  lg:flex-row overflow-hidden text-dark lg:h-[550px] gap-6 ">
//         <div className="w-full lg:w-[60%] my-auto pt-12 lg:pt-0 space-y-4">
//           <div className="space-y-0 lg:space-y-4 -ml-1">
//             <h1 className="text-primaryDark text-primary leading-snug text-[25px]  lg:text-5xl  uppercase font-medium">
//               पारंपरिक सणाला डिजिटल तडका
//             </h1>
//             <h2 className="text-primaryDark text-dark leading-snug text-[25px]  lg:text-5xl  uppercase font-medium">
//               <span className="text-primary">म्हणजे</span> बाप्पा माझा लाडका!
//             </h2>
//           </div>
//           <p className="text-sm tracking- w-full lg:w-[90%] text-gray-700">
//             गणपतीच्या शाश्वत सौंदर्याचा आणि कलात्मकतेचा आनंद घ्या आमच्या निवडक
//             दिव्य प्रतिमांच्या संग्रहातून. प्रत्येक नजरेतून भक्ती आणि
//             सर्जनशीलतेचा उत्सव साजरा करा.
//           </p>
//           {/* <ContactButton text="Get in touch" /> */}
//         </div>
//         {/* ----------------- */}
//         <div className="w-full h-full px-8 lg:px-0 relative lg:w-[40%]">
//           <div className="relative">
//             {/* Head Ring positioned on top with rotation */}
//             <Image
//               src="/headring.png"
//               alt="Head Ring"
//               className="absolute top-4 select-none -ml-2 left-1/2 transform -translate-x-1/2 object-contain rotating-ring"
//               height={330} // Adjust size as needed
//               width={330}
//             />
//             {/* Ganesh Image */}
//             <Image
//               src="/bappa.png"
//               alt="Ganesh Idol"
//               className="object-contain select-none pt-14 lg:pt-0 lg:h-[550px] relative w-full"
//               height={600}
//               width={600}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
