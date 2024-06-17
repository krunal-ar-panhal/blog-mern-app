import React from "react";
import { NavLink } from "react-router-dom";

export const Found = () => {
  return (
    <>
      <div className="flex flex-col gap-10 items-center mt-24 md:mb-24 mb-10">
        <h1 className="text-9xl font-bold text-center text-blue-500">404</h1>
        <h2 className="text-4xl font-bold text-center">Somthing's missing</h2>
        <p className="text-xl font-semibold text-center">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page
        </p>
        <NavLink to="/">
          <button className="font-bold bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-700 active:bg-blue-950">
            BACK
          </button>
        </NavLink>
      </div>
    </>
  );
};
