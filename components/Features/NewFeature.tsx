import { Check, CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewFeature = () => {
  const features = [
    {
      title: "आपल्या गणपती बाप्पा साठी खास प्रोफाइल तयार करा.",
      description:
        "आता आपल्या गणपती बाप्पासाठी एक अद्वितीय आणि आकर्षक प्रोफाइल तयार करण्याची संधी. गणेशोत्सवाला एक डिजिटल रूप द्या.",
      list: [
        "सोपी प्रोफाइल तयार करण्याची प्रक्रिया",
        "आपल्या गणपतीचे नाव, मूर्तीची छायाचित्रे आणि माहिती जोडण्याची सुविधा",
        "सर्व गोष्टी एका ठिकाणी व्यवस्थित सादर करा",
      ],
      image: "/newmockups/01.webp",
    },
    {
      title: "फोटो, व्हिडिओ, आणि सोशल मीडिया लिंक जोडण्याची सुविधा.",
      description:
        "गणपती उत्सवाचे सुंदर क्षण आपल्या प्रोफाइलवर साठवा. आपल्या सोशल मीडिया प्रोफाइल्सची लिंक देखील सहज शेअर करा.",
      list: [
        "उत्सवाचे खास फोटो आणि व्हिडिओ अपलोड करा",
        "फेसबुक, इंस्टाग्राम, आणि इतर लिंक जोडण्याची सुविधा",
        "आकर्षक सादरीकरणासाठी विविध प्रकारे दृश्य सादर करा",
      ],
      image: "/newmockups/02.webp",
    },
    {
      title: "प्रत्येक गणपती बाप्पाला एक अनोखा URL आणि QR कोड.",
      description:
        "आपल्या बाप्पाच्या प्रोफाइलसाठी एक खास लिंक आणि QR कोड तयार करा, ज्यामुळे लोकांना आपली प्रोफाइल पाहणे सोपे होईल.",
      list: [
        "प्रत्येक प्रोफाइलसाठी अनोखा URL उपलब्ध",
        "सोपी QR कोड स्कॅनिंगद्वारे थेट प्रोफाइलवर पोहोचा",
        "प्रोफाइल शेअर करण्यासाठी अत्यंत सोयीस्कर",
      ],
      image: "/newmockups/03.webp",
    },
    {
      title: "वर्षानुसार फोटो व व्हिडिओसाठी वेगवेगळ्या फोल्डरची सोय.",
      description:
        "प्रत्येक वर्षाचे फोटो आणि व्हिडिओ वेगवेगळ्या फोल्डरमध्ये साठवण्याची सुविधा, ज्यामुळे जुन्या आठवणी सहज सापडतील.",
      list: [
        "वर्षानुसार डेटा व्यवस्थापन",
        "सर्व आठवणी एका व्यवस्थित स्वरूपात संग्रहित करा",
        "आपल्या फोल्डरमध्ये सुलभ शोध प्रणाली",
      ],
      image: "/newmockups/04.webp",
    },
    // {
    //   title:
    //     "प्रोफाइलच्या माध्यमातून आपल्या गणपती बाप्पाची महती आणि माहिती लिहिण्याची संधी.",
    //   description:
    //     "आपल्या गणपतीबद्दलची माहिती, विशेषता, कथा आणि इतर तपशील लिहून आपल्या प्रोफाइलला अजून अधिक माहितीपूर्ण बनवा.",
    //   list: [
    //     "गणपतीच्या मूळ व धार्मिक कथा सामायिक करा",
    //     "आपल्या बाप्पाच्या विशेष परंपरा मांडण्याची सुविधा",
    //     "प्रोफाइलसाठी अनोखे टेक्स्ट फील्ड्स",
    //   ],
    //   image: "/images/write-info.jpg",
    // },
    {
      title:
        "प्रोफाइल शेअर करून कुटुंबीय, मित्र, आणि ओळखीच्या लोकांपर्यंत पोहोचण्याची सुविधा.",
      description:
        "आपल्या गणपतीच्या प्रोफाइलला जगभरातील मित्र आणि कुटुंबीयांपर्यंत सहज पोहोचवा.",
      list: [
        "सोशल मीडिया प्लॅटफॉर्म्सवर सहज शेअर करा",
        "किंवा थेट URL किंवा QR कोडद्वारे पाठवा",
        "संपर्क साधण्यासाठी जलद व सोयीस्कर पद्धती",
      ],
      image: "/newmockups/06.webp",
    },
    {
      title:
        "जाणून घ्या आपल्या गणपतीबाप्पाच्या प्रोफाइलला किती लोकांनी पाहिले ! ",
      description:
        "आपल्या प्रोफाइलवर आलेल्या पाहुण्यांची संख्या जाणून घ्या आणि त्यांच्या उत्साहाचा अनुभव घ्या.",
      list: [
        "प्रोफाइलवरील पाहुण्यांचे तपशीलवार आकडेवारी",
        "लोकांना प्रेरित करण्यासाठी एक अनोखा मार्ग",
        "वाढलेली लोकप्रियता मोजण्यासाठी उपयुक्त",
      ],
      image: "/newmockups/07.webp",
    },
  ];

  return (
    <>
      {features.map((item, index) => (
        <div
          data-aos="fade-up"
          key={index}
          className={`${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          } py-8 lg:py-16`}
        >
          <div
            className={`flex templateContainer relative flex-col lg:flex-row items-center w-full gap-12 justify-center ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="relative w-full lg:w-[40%]">
              <div className="relative z-10">
                <div
                  // data-aos="zoom-in"
                  className="overflow-hidden rounded-3xl relative"
                >
                  <Image
                    height={600}
                    width={600}
                    src={item.image}
                    alt={item.title}
                    className="object-cover max-w-[550px] mx-auto w-full h-full relative z-10"
                  />
                </div>
              </div>
            </div>

            <div data-aos="fade-up" className="w-full lg:w-[60%] space-y-6">
              <span className="bg-amber-100 px-4 py-2 rounded-lg text-primary">
                Feature 0{index + 1}
              </span>
              <h2 className="text-[25px] md:text-[36px] leading-tight font-medium lg:tracking-wide text-dark">
                {item.title}
              </h2>

              <p className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                {item.description}
              </p>

              <ul className="grid grid-cols-2 gap-4">
                {item.list.map((listItem, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CircleCheck
                      fill="green"
                      stroke="white"
                      strokeWidth={1.5}
                      size={30}
                    />
                    <span className="text-base w-full font-normal lg:w-[90%] text-gray-700">
                      {listItem}
                    </span>
                  </li>
                ))}
              </ul>

              <Link className="block" href={"/register"}>
                <button className="px-7 py-4 hover:scale-105 transition-all ease-in-out duration-200 text-sm bg-dark text-white rounded-full leading-none tracking-wide font-normal">
                  Create your profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewFeature;
