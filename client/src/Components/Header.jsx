import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";

export const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItem = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/projects">Projects</NavLink>
      </li>
    </>
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setIsSearchOpen(false); // Close the search popup after submission
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div className="navbar bg-gray-200 border shadow-sm">
        <div className="flex justify-between items-center w-full mr-4 sm:ml-4 ">
          <div className="navbar-start flex items-center ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2  bg-base-100 rounded-box w-52"
              >
                {navItem}
              </ul>
            </div>

            <NavLink to="/" className="font-semibold sm:text-xl  ">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white sm:text-2xl  ">
                Krunal Blog <span></span>
              </span>
            </NavLink>
          </div>

          <div className="form-control relative hidden lg:inline-block mx-4 outline-none rounded-lg">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                className="rounded-lg outline-none h-9 w-44 pr-10 p-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </button>
            </form>
          </div>

          <div className="navbar-center hidden lg:flex mx-4">
            <ul className="menu menu-horizontal px-1">{navItem}</ul>
          </div>

          <div>
            <button
              onClick={handleSearchIconClick}
              className="border border-black rounded-full h-7 w-7 flex items-center p-1 lg:hidden ml-14"
            >
              <AiOutlineSearch className="text-xl font-bold flex items-center " />
            </button>
          </div>

          <div className="navbar-end flex items-center space-x-4">
            {currentUser ? (
              <NavLink to="/dashboard">
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
              </NavLink>
            ) : (
              <NavLink
                to="/signin"
                className="border border-blue-500 hover:border-transparent p-3 flex items-center w-18  sm:h-10 h-9 rounded-lg hover:bg-gradient-to-r from-blue-500 to-purple-500 font-semibold border- hover:text-white text-sm sm:text-sm "
              >
                Sign-In
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 sm:w-1/2 lg:w-1/3">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                placeholder="Search"
                className="rounded-lg outline-none h-9 w-full pr-10 p-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="ml-2">
                <AiOutlineSearch className="text-xl font-bold" />
              </button>
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="mt-4 p-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
