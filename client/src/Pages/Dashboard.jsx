import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardSidebar } from "../Components/DashboardSidebar";
import { DashProfile } from "../Components/DashProfile";
import { DashPost } from "../Components/DashPost";
import { DashUsers } from "../Components/DashUsers";
import { DashComment } from "../Components/DashComment";
import { DashboardComp } from "../Components/DashboardCom";

export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 w-full">
        <DashboardSidebar />
      </div>
      <div className="md:w-3/4 md:mr-10 mr-4 mb-10 min-h-screen">
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPost />}
        {tab === "users" && <DashUsers />}
        {tab === "comments" && <DashComment />}
        {tab === "dash" && <DashboardComp />}
      </div>
    </div>
  );
};
