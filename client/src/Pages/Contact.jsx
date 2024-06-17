import React from "react";
import { IoCall } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";

export const Contact = () => {
  return (
    <>
      <div className="md:flex md:flex-col items-center md:mt-24 mt-16  ml-3 mr-3 md:24 ">
        <div className="border  items-center border-stone-200 flex flex-col md:gap-6 gap-5 rounded-lg md:p-9 p-7  shadow-lg md:20 mb-24">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-4xl font-bold">Get in touch</h1>
            <p className="md:text-2xl text-lg font-semibold">
              Let's start a conversation
            </p>
          </div>
          <div className="flex items-center gap-3">
            <IoLocationSharp className="md:size-8" />
            <p className="md:text-2xl text-xl  font-semibold">
              Palanpur,B.K,Gujarat
            </p>
          </div>
          <div className="flex items-center gap-3 mr-5">
            <IoCall className="md:size-6" />
            <p className="md:text-2xl text-xl font-semibold">+91 74350 45502</p>
          </div>
          <div className="flex items-center gap-3">
            <IoIosMail className="md:size-8 size-5" />
            <p className="md:text-2xl  text-xl font-semibold ">
              krunalpanchalkp2123@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
