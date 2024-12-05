import Image from "next/image";
import React from "react";

const FeaturesComp = () => {
  return (
    <>
      <div>
        <div className="templateContainer flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10 w-full py-6 lg:py-10">
          <div className="w-full space-y-5 text-dark lg:w-1/2">
            <h2 className="text-2xl lg:text-4xl tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </h2>
            <div className="h-[2px] rounded-full w-[150px] bg-primary"></div>
            <p className="text-sm leading-relaxed tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem iste obcaecati sint dolorem animi dolore eos labore
              eveniet est ex! Quae, eius praesentium? Nesciunt, tenetur. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              magnam.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={"https://chillinote.com/employee_management.webp"}
              alt=""
              className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md"
              height={600}
              width={600}
            />
          </div>
        </div>
      </div>
      {/* ------------- */}
      <div className="bg-gray-100">
        <div className="templateContainer flex flex-col-reverse lg:flex-row-reverse items-center gap-8 lg:gap-10 w-full py-6 lg:py-10">
          <div className="w-full space-y-5 text-dark lg:w-1/2">
            <h2 className="text-2xl lg:text-4xl tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </h2>
            <div className="h-[2px] rounded-full w-[150px] bg-primary"></div>
            <p className="text-sm leading-relaxed tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem iste obcaecati sint dolorem animi dolore eos labore
              eveniet est ex! Quae, eius praesentium? Nesciunt, tenetur. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              magnam.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={"https://chillinote.com/employee_management.webp"}
              alt=""
              className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md"
              height={600}
              width={600}
            />
          </div>
        </div>
      </div>
      {/* ----------- */}
      <div>
        <div className="templateContainer flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10 w-full py-6 lg:py-10">
          <div className="w-full space-y-5 text-dark lg:w-1/2">
            <h2 className="text-2xl lg:text-4xl tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </h2>
            <div className="h-[2px] rounded-full w-[150px] bg-primary"></div>
            <p className="text-sm leading-relaxed tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem iste obcaecati sint dolorem animi dolore eos labore
              eveniet est ex! Quae, eius praesentium? Nesciunt, tenetur. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              magnam.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={"https://chillinote.com/employee_management.webp"}
              alt=""
              className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-md"
              height={600}
              width={600}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesComp;
