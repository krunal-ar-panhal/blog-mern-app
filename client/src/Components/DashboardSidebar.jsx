import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-full md:w-56 bg-gray-800 text-white md:h-full md:flex flex-col md:min-h-screen">
      <div className="flex flex-col p-4">
        <div className="flex flex-col space-y-2">
          <Link to="/dashboard?tab=profile">
            <div
              className={`flex items-center p-2 cursor-pointer rounded gap-2 ${
                tab === "profile"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700 bg-gray-600 "
              }`}
            >
              <HiUser className="w-5 h-5  " />
              <span>Profile</span>
              <span className="flex ml-12 items-center  text-xs p-1 bg-gray-200 rounded text-black font-semibold">
                {currentUser.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </Link>

          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <div
                className={`flex items-center p-2 gap-2 mt-4 ${
                  tab === "dash" || !tab ? "bg-gray-700" : ""
                } rounded-md hover:bg-gray-700 transition-colors cursor-pointer`}
              >
                <MdDashboard className="w-5 h-5 " />
                <span className="">Dashboard</span>
              </div>
            </Link>
          )}
          <Link to="/dashboard?tab=posts">
            <div
              className={`flex items-center p-2 gap-2 cursor-pointer rounded ${
                tab === "posts" ? "bg-gray-700" : "hover:bg-gray-600  "
              }`}
            >
              <BsFileEarmarkPost className="w-5 h-5  " />
              <span>Posts</span>
            </div>
          </Link>
          <Link to="/dashboard?tab=users">
            <div
              className={`flex items-center p-2 gap-2 cursor-pointer rounded ${
                tab === "users" ? "bg-gray-700" : "hover:bg-gray-600  "
              }`}
            >
              <FaUsers className="w-5 h-5  " />
              <span>Users</span>
            </div>
          </Link>
          <Link to="/dashboard?tab=comments">
            <div
              className={`flex items-center p-2 gap-2 cursor-pointer rounded ${
                tab === "comments" ? "bg-gray-700" : "hover:bg-gray-600  "
              }`}
            >
              <FaRegComments className="w-5 h-5  " />
              <span>Comments</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
