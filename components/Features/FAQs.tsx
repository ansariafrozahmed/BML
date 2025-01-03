"use client";
import Footer from "@/components/HeadeFooterOther/Footer";
import Header from "@/components/HeadeFooterOther/Header";
import { faqs } from "@/lib/constants";
import Image from "next/image";
import React, { useState } from "react";

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index: any) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* <Header /> */}
      <div>
        <div className="templateContainer flex flex-col lg:flex-row items-start gap-10 w-full space-y-5 py-6 lg:py-12">
          <div
            data-aos="fade-right"
            className="w-[45%] sticky hidden lg:block top-10 "
          >
            <Image
              height={600}
              width={600}
              src="/newmockups/01.webp"
              alt="Analytics Dashboard Preview"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="w-full lg:w-[55%] space-y-6">
            <h1
              data-aos="fade-up"
              className="text-2xl text-center lg:text-left md:text-4xl leading-tight"
            >
              Frequently Asked Questions!
            </h1>
            <div className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <div
                  data-aos="fade-up"
                  key={index}
                  className="bg-white border border-gray-100 rounded-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center px-4 py-4 text-left text-gray-800 tracking-wide focus:outline-none"
                  >
                    <div
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.question }}
                    />
                    <span
                      className={`transform transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <div
                      className="px-4 py-3 text-gray-700 leading-relaxed border-t border-gray-200"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default FAQSection;
