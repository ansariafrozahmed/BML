"use client";
import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Flame } from "lucide-react";
import Image from "next/image";
// import { MdDoubleArrow } from "react-icons/md";

// FAQ Data
const faqData = [
  {
    question: "Looking For A Solution To Boost Productivity?",
    answer:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly.",
  },
  {
    question: "Need An Easy Way To Manage Your Projects?",
    answer:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly.",
  },
  {
    question: "Seeking A User-Friendly Solution For Your Team?",
    answer:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly.",
  },
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="templateContainer py-16">
      <div className="grid gap-x-10 md:grid-cols-2 items-start">
        <div className="  mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="mb-4 bg-amber-100 text-amber-900 hover:bg-amber-100 inline-flex items-center px-2 py-1 rounded">
              <Flame className="w-4 h-4 mr-1 text-orange-500" />
              FAQs
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form.
            </p>
          </div>

          {/* Accordion Section */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openItem === index}
                onClick={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <div>
            <Image
              src="/home/dashboard1.png"
              className="w-full rounded-2xl overflow-hidden"
              width={800}
              height={800}
              alt="s"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <Image
              src="/home/dashboard2.png"
              className="w-40 rounded-2xl"
              width={800}
              height={800}
              alt="s"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border  rounded-lg  ">
      <button
        className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-amber-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-90" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
      >
        <div className="px-6 pb-4 text-gray-600">{answer}</div>
      </div>
    </div>
  );
}
