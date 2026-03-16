import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({setSideBarOpen}) => {
  return (
    <div className='px-4 text-gray-700 space-y-2 font-medium'>
      {
        menuItemsData.map(({to,label,Icon})=>(
            <NavLink key={to} to={to} end={to==='/'} onClick={()=>setSideBarOpen(false)} className={({isActive})=>`px-4 py-3 flex items-center gap-4 rounded-lg transition-all duration-200 cursor-pointer relative z-10
            ${isActive ? 'bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-sm':'hover:bg-indigo-50 text-gray-700 hover:text-gray-800'}
            `}>
              <Icon className='w-5 h-5'/>
              <span>{label}</span>
            </NavLink>
        ))
      }
    </div>
  )
}

export default MenuItems