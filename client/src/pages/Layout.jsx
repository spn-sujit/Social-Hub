import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react';
import { dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';

const Layout = () => {
   const user=dummyUserData;
   const [sidebarOpen,setSideBarOpen]=useState(false);
  return user?(
      <div className='w-full flex h-screen overflow-hidden bg-linear-to-r from-indigo-400 via-purple-400 to-blue-900'>
        <Sidebar SidebarOpen={sidebarOpen} setSideBarOpen={setSideBarOpen}/>
        <div className='flex-1 overflow-auto bg-linear-to-br from-indigo-50 via-purple-80 to-blue-50'>
            <Outlet/>
        </div>
        {
          sidebarOpen ? 
          <X className='fixed top-4 right-4 p-2 z-50 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 w-10 h-10 text-indigo-600 cursor-pointer sm:hidden' onClick={()=>setSideBarOpen(false)}/>
          :
          <Menu className='fixed top-4 right-4 p-2 z-50 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 w-10 h-10 text-indigo-600 cursor-pointer sm:hidden' onClick={()=>setSideBarOpen(true)}/>
        }
        {sidebarOpen && <div className='fixed inset-0 bg-black/40 z-40 sm:hidden' onClick={()=>setSideBarOpen(false)}/>}
      </div>
  )
      :
      (
        <Loading/>
      )
}

export default Layout