// import Banner from "@/components/Banner/Banner";
import React from "react";
// import { EmblaOptionsType } from "embla-carousel";
import FeaturesComp from "@/components/Features/FeaturesComp";
import Hero from "@/components/Banner/Hero";
import FeatureList from "@/components/Features/FeatureList";
import Header from "@/components/HeadeFooterOther/Header";
import Footer from "@/components/HeadeFooterOther/Footer";

// const fetchBannerSettings = async () => {
//   try {
//     const response = await fetch(
//       `${process.env.BACKEND}/wp-json/wp/v2/website-banners?_fields=meta.desktop_banners,meta.mobile_banners`,
//       {
//         method: "GET",
//       }
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch settings: ${response.status} ${response.statusText}`
//       );
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error fetching header settings:", error);
//     return null;
//   }
// };

export const revalidate = 60;

// const OPTIONS: EmblaOptionsType = { loop: true, duration: 50 };

const Home = async () => {
  // const data = await fetchBannerSettings();

  return (
    <>
      <Header />
      <Hero />
      <FeatureList />
      {/* <Banner
        options={OPTIONS}
        desktopBanner={data[0].meta.desktop_banners}
        mobileBanner={data[0].meta.mobile_banners}
      /> */}
      <FeaturesComp />
      <Footer />
    </>
  );
};

export default Home;
