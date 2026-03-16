import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil, X } from 'lucide-react';

const ProfileModel = ({setShowEdit}) => {
    const user=dummyUserData;
    const [editForm,setEditForm]=useState({
       username:user.username,
       bio:user.bio,
       location:user.location,
       profile_picture:null,
       cover_photo:null,
       full_name:user.full_name,
    });
    const handleSaveProfile=async(e)=>{
        e.preventDefault();
    }
  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
        <div className='max-w-2xl w-full bg-white rounded-xl shadow-lg max-h-screen overflow-y-auto'>
           <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h1 className='text-2xl font-bold text-slate-900'>Edit Profile</h1>
                <button onClick={()=>setShowEdit(false)} className='p-1 hover:bg-slate-100 rounded-lg transition-colors'>
                  <X className='w-6 h-6 text-slate-600'/>
                </button>
              </div>
              <form className='space-y-6' onSubmit={handleSaveProfile}>

               <div className='flex flex-col items-start gap-3'>
                  <label className='block text-sm font-semibold text-slate-900 cursor-pointer' htmlFor='profile_picture'>
                     Profile Picture
                  </label>
                  <input hidden type='file' accept='image/*' id='profile_picture' onChange={(e)=>setEditForm({...editForm,profile_picture:e.target.files[0]})}/>
                  <div className='group relative w-24 h-24 cursor-pointer'>
                     <img className='w-24 h-24 rounded-full object-cover border-2 border-slate-200' src={editForm.profile_picture ? URL.createObjectURL(editForm.profile_picture): user.profile_picture} alt=""/>
                     <div className='absolute inset-0 hidden group-hover:flex bg-black/40 rounded-full items-center justify-center transition-all duration-300'>
                        <Pencil className='w-5 h-5 text-white'/>
                     </div>
                  </div>
               </div>

               <div className='flex flex-col items-start gap-3'>
                  <label htmlFor='cover_photo' className='block text-sm font-semibold text-slate-900 cursor-pointer'>
                     Cover Photo
                  </label>
                  <input hidden type='file' accept='image/*' id='cover_photo' onChange={(e)=>setEditForm({...editForm,cover_photo:e.target.files[0]})}/>
                  
                  <div className='group relative w-full h-40 cursor-pointer'>
                     <img 
                       src={editForm.cover_photo ?URL.createObjectURL(editForm.cover_photo):user.cover_photo } 
                       alt="" 
                       className='w-full h-40 rounded-lg bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover border-2 border-slate-200'
                     />
                     <div className='absolute inset-0 hidden group-hover:flex bg-black/40 rounded-lg items-center justify-center transition-all duration-300'>
                        <Pencil className='w-5 h-5 text-white'/>
                     </div>
                  </div>
               </div>
               <div>
                  <label className='block text-sm font-semibold text-slate-900 mb-2'>Full Name</label>
                  <input type="text" className='w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Please enter your full name' onChange={(e)=>setEditForm({...editForm,full_name:e.target.value})} value={editForm.full_name}/>
               </div>
               <div>
                  <label className='block text-sm font-semibold text-slate-900 mb-2'>Username</label>
                  <input type="text" className='w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Please enter your username' onChange={(e)=>setEditForm({...editForm,username:e.target.value})} value={editForm.username}/>
               </div>
               <div>
                  <label className='block text-sm font-semibold text-slate-900 mb-2'>Bio</label>
                  <textarea rows={3}  className='w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none' placeholder='Please enter a short bio' onChange={(e)=>setEditForm({...editForm,bio:e.target.value})} value={editForm.bio}/>
               </div>
               <div>
                  <label className='block text-sm font-semibold text-slate-900 mb-2'>Location</label>
                  <input type="text" className='w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Please enter your location' onChange={(e)=>setEditForm({...editForm,location:e.target.value})} value={editForm.location}/>
               </div>
               <div className='flex justify-end gap-3 pt-6 border-t border-slate-200'>
                   <button onClick={()=>setShowEdit(false)} type='button' className='px-6 py-2.5 text-slate-700 font-semibold hover:bg-slate-100 rounded-lg transition-colors'>Cancel</button>
                   <button type='submit' className='px-6 py-2.5 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 rounded-lg transition-colors shadow-sm'>Save Changes</button>
               </div>
              </form>
           </div>
        </div>
    </div>
  )
}

export default ProfileModel