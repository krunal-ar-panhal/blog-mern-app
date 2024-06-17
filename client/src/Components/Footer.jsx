import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-10 bg-gray-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <NavLink to="/about" className="font-semibold">
            About us
          </NavLink>
          <NavLink to="/contact" className="font-semibold">
            Contact
          </NavLink>
        </nav>

        <aside>
          <p className="font-semibold">
            Copyright © 2024 - All right reserved by Meme's Kitchen
          </p>
        </aside>
      </footer>
    </>
  );
};
