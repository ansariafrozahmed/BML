// import { Badge } from "@/components/ui/badge"

import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Step 1: Sign Up / नावनोंदणी करा",
      description: (
        <>
          📧 Register with Ease! <br /> Use your email ID and password to create
          an account. <br /> Keep your Bappa's name as your User ID! <br /> 📝
          ईमेल आयडी आणि पासवर्डसह खाते तयार करा. <br /> आपल्या बाप्पाचे नाव युझर
          आयडी म्हणून ठेवा!
        </>
      ),
    },
    {
      step: "02",
      title: "Step 2: Create Your Profile / आपला प्रोफाईल तयार करा",
      description: (
        <>
          🖼️ Showcase Your Bappa! <br />
          Add all important details about your Ganesh idol. <br />
          Upload beautiful photos of your Bappa. <br />
          Embed videos directly from YouTube for a complete experience! <br />{" "}
          🎥 आपल्या बाप्पाचे तपशील भरा. <br /> फोटो अपलोड करा आणि युट्यूबवरील
          व्हिडिओ एम्बेड करा.
        </>
      ),
    },
    {
      step: "03",
      title: "Step 3: Share & Celebrate / शेअर करा आणि साजरा करा",
      description: (
        <>
          🌐 Spread the Joy! <br /> Share your profile link and unique QR code
          with friends and family. <br /> Let everyone celebrate your beloved
          Bappa with you. <br /> 🎉 आपला प्रोफाईल लिंक आणि QR कोड शेअर करा.{" "}
          <br /> मित्र-परिवारासोबत आनंद साजरा करा.
        </>
      ),
    },
  ];

  return (
    // <div className="bg-gray-100">
    //   <div className="templateContainer mx-auto  py-8 lg:py-12">
    //     <div className="text-left lg:text-center mb-5 lg:mb-20">
    //       <h2 className="text-[25px] md:text-[32px] leading-normal font-medium text-dark">
    //         Get Started in 3 Easy Steps / 3 सोप्या टप्प्यांत सुरुवात करा!
    //       </h2>
    //     </div>

    //     {/* Timeline Section */}
    //     <div className="relative lg:mb-10">
    //       {/* Timeline Line - Hidden on mobile */}
    //       {/* <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-amber-100 -translate-y-1/2">
    //         <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
    //       </div> */}

    //       {/* Steps */}
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
    //         {steps.map((step, index) => (
    //           <div
    //             data-aos="fade-up"
    //             key={step.step}
    //             className={`text-center space-y-3 relative ${
    //               index === 1 ? "md:mt-20" : "md:mt-0"
    //             }`}
    //           >
    //             {/* Content */}
    //             <h3 className="text-lg text-left lg:text-center font-medium text-primary lg:mb-3">
    //               {/* <span className="text-primary">{step.step}</span> */}
    //               {step.title}
    //             </h3>
    //             <p className="text-gray-700 leading-loose text-left lg:text-center">
    //               {step.description}
    //             </p>
    //           </div>
    //         ))}
    //       </div>

    //       {/* Curved Lines - Hidden on mobile */}
    //       <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
    //         <Image
    //           height={200}
    //           width={1500}
    //           sizes="100vw"
    //           alt=""
    //           src="/timeline.png"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div data-aos="fade" className="bg-gray-100">
      <div className="templateContainer space-y-6 lg:space-y-10 py-6 md:py-8 lg:py-12">
        <h2 className="text-[18px] text-center md:text-[36px] leading-tight font-medium lg:tracking-wide text-dark">
          Get Started in 3 Easy Steps! <br /> 3 सोप्या टप्प्यांत सुरुवात करा!
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          {steps.map((step, index) => (
            <div
              data-aos="fade-up"
              key={index}
              className={`space-y-5 relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white p-5 rounded-md`}
            >
              <h4 className="text-lg font-medium text-primary">{step.title}</h4>
              <hr />
              <p className="text-sm text-gray-700 leading-[2.3]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
