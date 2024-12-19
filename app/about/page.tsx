import Footer from "@/components/HeadeFooterOther/Footer";
import Header from "@/components/HeadeFooterOther/Header";
import {
  defaultDescription,
  defaultTitle,
  frontendURL,
  openGraphImage,
} from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `About Us | Bappa Majha Laadka`,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: `${frontendURL}`,
    type: "website",
    images: [
      {
        url: `${frontendURL}${openGraphImage}`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${frontendURL}${openGraphImage}`],
  },
  alternates: {
    canonical: `${frontendURL}/about`,
  },
};

const About = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="max-w-4xl mx-auto px-4  py-6 md:py-8 lg:py-12 space-y-14">
        <div className="space-y-4">
          <h1
            data-aos="fade-up"
            className="text-primary text-2xl lg:text-3xl tracking-wide"
          >
            आमच्याविषयी थोडसं,
          </h1>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            बाप्पा माझा लाडका हे एक अनोखं डिजिटल व्यासपीठ आहे, जे आपल्या घरगुती
            गणपती बाप्पाच्या भक्तीला एका वैशिष्ट्यपूर्ण स्वरूपात साजरं
            करण्यासाठी तयार करण्यात आलं आहे. ही वेबसाइट Techmobilize Innovations
            Pvt. Ltd. च्या मालकीची असून, संचालिका सोनल शाह यांच्या नेतृत्वाखाली
            तयार करण्यात आली आहे. या उपक्रमासाठी रमेश शाह व किशोर घोटकुले
            यांच्या मार्गदर्शनाखाली काम करण्यात आलं आहे.
          </p>
        </div>
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-primary text-2xl lg:text-3xl tracking-wide"
          >
            वेबसाइटचा उद्देश
          </h2>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            आपल्या घरातील लाडक्या गणपती बाप्पासाठी डिजिटल प्रोफाइल तयार करून
            त्याचा सन्मान वाढवणे आणि भाविकांमध्ये तो शेअर करणे, हा या वेबसाइटचा
            मुख्य उद्देश आहे. आपल्या बाप्पाच्या आठवणी जगासोबत शेअर करता याव्यात,
            तसेच एक अनोखं ओळखपत्र मिळावे, यासाठी हे व्यासपीठ उपयुक्त ठरेल.
          </p>
        </div>
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-primary text-2xl lg:text-3xl tracking-wide"
          >
            वैशिष्ट्ये
          </h2>
          <ul className="list-decimal list-inside space-y-5 text-base tracking-wider text-gray-700 leading-relaxed">
            <li data-aos="fade-up">
              डिजिटल प्रोफाइल: आपल्या बाप्पासाठी फोटो, व्हिडिओ, आणि माहिती
              सामावलेलं डिजिटल प्रोफाइल तयार करा.
            </li>
            <li data-aos="fade-up">
              युनिक नाव आणि सबडोमेन:(मिनी वेबसाइट) आपल्या बाप्पाला खास नाव द्या,
              जसं की "शिंदे परिवाराचा लाडका" आणि त्याचं युनिक लिंक तयार करा, जसं{" "}
              <span className="text-primary underline">
                www.bappamajhalaadka.com/shindeslaadka
              </span>
            </li>
            <li data-aos="fade-up">
              QR कोड शेअरिंग: आपल्या बाप्पाचा प्रोफाइल सहज शेअर करण्यासाठी QR
              कोडची सुविधा.
            </li>
            <li data-aos="fade-up">
              व्ह्यू काऊंटर: आपल्या बाप्पाच्या प्रोफाइलला किती वेळा पाहिलं गेलं,
              याची नोंद.
            </li>
            <li data-aos="fade-up">
              सोशल मीडिया लिंक्स: आपल्या प्रोफाइलमध्ये सोशल मीडिया अकाउंट्स जोडा
              आणि बाप्पाच्या भक्तीला जागतिक स्तरावर पोहोचवा.
            </li>
            <li data-aos="fade-up">
              फोल्डर व्यवस्थापन: प्रत्येक वर्षासाठी फोटो व व्हिडिओ साठवण्यासाठी
              स्वतंत्र फोल्डर्स तयार करण्याची सुविधा.
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-primary text-2xl lg:text-3xl tracking-wide"
          >
            आमचं वचन
          </h2>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            बाप्पा माझा लाडका या उपक्रमामध्ये, आम्ही भक्तांच्या श्रद्धेला
            जपण्याचा आणि आपल्या लाडक्या बाप्पाला सर्वांना दाखवण्याचा प्रयत्न
            करतो. हा एक भक्तिमय आणि तांत्रिक दृष्टिकोनाने समृद्ध असा प्रवास आहे,
            जो आपली संस्कृती जपण्यात मोलाची भूमिका बजावेल.
          </p>
        </div>
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-primary text-2xl lg:text-3xl tracking-wide"
          >
            धन्यवाद
          </h2>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            आमच्या या प्रकल्पाला प्रत्यक्ष किंवा अप्रत्यक्ष पाठींबा देणाऱ्या
            सर्वांचे मनःपूर्वक आभार.
          </p>
        </div>
        <div className="space-y-4">
          <h2
            data-aos="fade-up"
            className="text-primary text-2xl lg:text-3xl tracking-wide"
          >
            विशेष आभार
          </h2>
          <ul className="flex flex-wrap items-center gap-3">
            {[
              "आकाश चौरसिया",
              "रोहित म्हात्रे",
              "नम्रता भोरडे",
              "गौरव भोरडे",
              "सिद्धेश शेंडगे",
              "साईशा शेंडगे",
              "पूजा मेहता",
              "विनोद मेहता",
              "प्रेम खेंगले",
            ].map((item, index) => (
              <li
                data-aos="fade-up"
                className="text-base tracking-wider text-primary rounded-md bg-gray-100 px-4 py-2"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            आपल्या प्रत्येकाच्या सहभागामुळे हा प्रकल्प अधिक प्रेरणादायी होत आहे.
            आम्ही आपले कायम ऋणी राहू.
          </p>
        </div>
        <div className="space-y-2">
          <h2
            data-aos="fade-up"
            className="text-primary text-2xl lg:text-3xl tracking-wide"
          >
            Techmobilize Innovations Pvt. Ltd.
          </h2>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            आपला,
          </p>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            बाप्पा माझा लाडका टीम
          </p>
          <p
            data-aos="fade-up"
            className="text-base w-full font-normal text-gray-700 leading-relaxed"
          >
            तुमच्या अभिप्रायाचा आम्हाला नेहमीच आनंद होईल!
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default About;
