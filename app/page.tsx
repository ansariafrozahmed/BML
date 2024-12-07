import React from "react";
import Hero from "@/components/Banner/Hero";
import FeatureList from "@/components/Features/FeatureList";
import Header from "@/components/HeadeFooterOther/Header";
import Footer from "@/components/HeadeFooterOther/Footer";
import HowItWorks from "@/components/Features/Howitworks";
import NewFeature from "@/components/Features/NewFeature";

const Home = async () => {
  return (
    <>
      <Header />
      <Hero />
      {/* <FeatureList /> */}
      <HowItWorks />
      <NewFeature />
      <Footer />
    </>
  );
};

export default Home;
