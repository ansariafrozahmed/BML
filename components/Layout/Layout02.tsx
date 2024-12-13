import Image from "next/image";
import React from "react";
import Shareprofile from "../Gallery/Shareprofile";
import GalleryContainer from "../Gallery/GalleryContainer";
interface Layout02Props {
  username: string;
  isLoggedIn: boolean;
}

const Layout02: React.FC<Layout02Props> = ({ username, isLoggedIn }) => {
  return (
    <div className="bg-gray-100">
      <div className="h-[300px] lg:h-[350px] relative">
        <Image
          src={
            "https://assets.cntraveller.in/photos/630df89857d932c0b550dea5/3:2/w_3102,h_2068,c_limit/1242811851"
          }
          alt=""
          height={500}
          width={1500}
          className="h-full w-full object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute inset-0 templateContainer flex  items-end justify-start pb-10">
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-5xl font-light text-white">
              Patil Cha Raaja
            </h2>
            <div className="flex items-center justify-start gap-2">
              <Image
                src={"/social media icons/facebook.png"}
                alt=""
                className="h-[25px] lg:h-[30px] w-auto object-contain"
                height={50}
                width={50}
              />
              <Image
                src={"/social media icons/instagram.png"}
                alt=""
                className="h-[25px] lg:h-[30px] w-auto  object-contain"
                height={50}
                width={50}
              />
            </div>
          </div>
        </div>
      </div>
      {/* --------- */}
      <div className="templateContainer py-4 md:py-6 lg:py-10 flex gap-10 w-full">
        <div className="w-[70%] space-y-8">
          <div className="p-6 space-y-5 rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <h2 className="text-lg tracking-wide leading-none text-primary">
              Contact Details
            </h2>
            <div className="h-[2px] w-20 bg-primary rounded-full"></div>
            <div className="space-y-2">
              {[
                { label: "Name", value: "Aditi Patil" },
                { label: "Username", value: "aditicharaja" },
                { label: "Email", value: "aditipatil@gmail.com" },
                { label: "Address", value: "Sion" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="font-medium text-primary w-32 text-sm">
                    {item.label}
                  </span>
                  <span className="text-gray-800 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* ------------- */}
          <div className="p-6 space-y-5 rounded-lg bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <h2 className="text-lg tracking-wide">Bio</h2>
            <div className="h-[2px] w-20 bg-primary rounded-full"></div>
            <p className="text-[13px] tracking-wider leading-loose text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              perferendis quis fugiat sapiente sunt doloremque? Facere, quod.
              Recusandae illo animi officia rem laboriosam, impedit ex non omnis
              alias voluptate quam, fuga enim quia suscipit eaque, quidem velit!
              Quos, quod voluptatem aut harum pariatur molestiae iste ea eaque
              sequi perferendis quo veritatis repudiandae consequatur nesciunt
              eligendi esse, dolorum totam, tempora illum nostrum nam dolore?
              Voluptas error, totam nisi
            </p>
          </div>
          {/* ------------- */}
          <GalleryContainer username={username} isLoggedIn={isLoggedIn} />
        </div>
        <div className="w-[30%] sticky top-5 h-full">
          <Shareprofile username={username} />
        </div>
      </div>
    </div>
  );
};

export default Layout02;
