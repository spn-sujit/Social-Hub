import React from "react";
import { assets, dummyUserData } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut } from "lucide-react";
import {UserButton,useClerk} from '@clerk/react'
import { useSelector } from "react-redux";
const Sidebar = ({ sidebarOpen, setSideBarOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user.value);
  const {signOut}=useClerk()
  return (
    <div
      className={`w-60 xl:w-72 bg-linear-to-b from-white via-indigo-50 to-purple-50 border-r border-indigo-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg`}
    >
      <div className="w-full">
        <div
          className="flex items-center gap-2 px-4 py-4 cursor-pointer hover:bg-indigo-100/50 transition-colors rounded-lg mx-2 mt-2"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.logo}
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Social Hub
          </span>
        </div>
        <hr className="border-indigo-200 mb-6 mx-4" />
        <div className="flex-1">
          <MenuItems setSideBarOpen={setSideBarOpen} />
        </div>
        <Link
          to="/create-post"
          className="flex items-center justify-center gap-2 px-4 py-3 mt-6 mx-4 bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium w-52"
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>
      <div className="w-full border-t border-indigo-200 p-4 px-4 flex items-center justify-between bg-linear-to-r from-indigo-50 to-purple-50 rounded-t-lg">
       <div className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition-opacity">
         <UserButton/>
         <div>
            <h1 className="text-sm font-semibold text-gray-800">
  {user?.full_name || "Guest"}
</h1>
<p className="text-xs text-gray-600">
  @{user?.username || "unknown"}
</p>
         </div>
       </div>
       <LogOut onClick={signOut} className="w-5 h-5 text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors"/>
      </div>
    </div>
  );
};

export default Sidebar;