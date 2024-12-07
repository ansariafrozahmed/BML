"use client";
import Footer from "@/components/HeadeFooterOther/Footer";
import Header from "@/components/HeadeFooterOther/Header";
import Image from "next/image";
import React, { useState } from "react";

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index: any) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all items. Please ensure the product is in its original condition for a full refund.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide! Shipping fees and delivery times may vary depending on your location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive an email with the tracking number and link to track your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and other digital payment methods.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all items. Please ensure the product is in its original condition for a full refund.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide! Shipping fees and delivery times may vary depending on your location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive an email with the tracking number and link to track your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and other digital payment methods.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all items. Please ensure the product is in its original condition for a full refund.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide! Shipping fees and delivery times may vary depending on your location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive an email with the tracking number and link to track your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and other digital payment methods.",
    },
  ];
  return (
    <>
      <Header />
      <div>
        <div className="templateContainer flex flex-col lg:flex-row items-start gap-10 w-full space-y-5 py-6 lg:py-12">
          <div className="w-[45%] sticky hidden lg:block top-20 ">
            <Image
              height={600}
              width={600}
              src="/mockup1.png"
              alt="Analytics Dashboard Preview"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="w-full lg:w-[55%] space-y-6">
            <h1 className="text-2xl text-center lg:text-left md:text-4xl leading-tight">
              Frequently Asked Questions!
            </h1>
            <div className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center px-4 py-4 text-left text-gray-800 font-medium focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-4 py-3 text-gray-600 border-t border-gray-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQSection;
