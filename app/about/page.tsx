import Footer from "@/components/HeadeFooterOther/Footer";
import Header from "@/components/HeadeFooterOther/Header";
import React from "react";

const About = () => {
  return (
    <>
      <Header />
      <div className="templateContainer py-6 md:py-8 lg:py-12 space-y-5">
        <h1 className="text-primary text-2xl tracking-wide">
          आमच्याविषयी थोडसं,
        </h1>
        <p className="text-base tracking-wider text-gray-700 leading-relaxed">
          बाप्पा माझा लाडका हे एक अनोखं डिजिटल व्यासपीठ आहे, जे आपल्या घरगुती
          गणपती बाप्पाच्या भक्तीला एका वैशिष्ट्यपूर्ण स्वरूपात साजरं करण्यासाठी
          तयार करण्यात आलं आहे. ही वेबसाइट Techmobilize Innovations Pvt. Ltd.
          च्या मालकीची असून, संचालिका सोनल शाह यांच्या नेतृत्वाखाली तयार करण्यात
          आली आहे. या उपक्रमासाठी रमेश शाह व किशोर घोटकुले यांच्या
          मार्गदर्शनाखाली काम करण्यात आलं आहे.
        </p>
        <h2 className="text-primary text-2xl tracking-wide">
          वेबसाइटचा उद्देश
        </h2>
        <p className="text-base tracking-wider text-gray-700 leading-relaxed">
          आपल्या घरातील लाडक्या गणपती बाप्पासाठी डिजिटल प्रोफाइल तयार करून
          त्याचा सन्मान वाढवणे आणि भाविकांमध्ये तो शेअर करणे, हा या वेबसाइटचा
          मुख्य उद्देश आहे. आपल्या बाप्पाच्या आठवणी जगासोबत शेअर करता याव्यात,
          तसेच एक अनोखं ओळखपत्र मिळावे, यासाठी हे व्यासपीठ उपयुक्त ठरेल.
        </p>
        <h2 className="text-primary text-2xl tracking-wide">वैशिष्ट्ये</h2>
        <ul className="list-decimal list-inside space-y-5 text-base tracking-wider text-gray-700 leading-relaxed">
          <li>
            डिजिटल प्रोफाइल: आपल्या बाप्पासाठी फोटो, व्हिडिओ, आणि माहिती
            सामावलेलं डिजिटल प्रोफाइल तयार करा.
          </li>
          <li>
            युनिक नाव आणि सबडोमेन:(मिनी वेबसाइट) आपल्या बाप्पाला खास नाव द्या,
            जसं की "शिंदे परिवाराचा लाडका" आणि त्याचं युनिक लिंक तयार करा, जसं{" "}
            <span className="text-primary underline">
              www.bappamajhalaadka.com/shindeslaadka
            </span>
          </li>
          <li>
            QR कोड शेअरिंग: आपल्या बाप्पाचा प्रोफाइल सहज शेअर करण्यासाठी QR
            कोडची सुविधा.
          </li>
          <li>
            व्ह्यू काऊंटर: आपल्या बाप्पाच्या प्रोफाइलला किती वेळा पाहिलं गेलं,
            याची नोंद.
          </li>
          <li>
            सोशल मीडिया लिंक्स: आपल्या प्रोफाइलमध्ये सोशल मीडिया अकाउंट्स जोडा
            आणि बाप्पाच्या भक्तीला जागतिक स्तरावर पोहोचवा.
          </li>
          <li>
            फोल्डर व्यवस्थापन: प्रत्येक वर्षासाठी फोटो व व्हिडिओ साठवण्यासाठी
            स्वतंत्र फोल्डर्स तयार करण्याची सुविधा.
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default About;
