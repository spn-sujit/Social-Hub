import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { SignIn } from '@clerk/react';
import api from '../Api/axios';
import toast from 'react-hot-toast'
const StatPill = ({ value, label }) => (
  <div className='flex flex-col items-center px-5 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg'>
    <span className='text-2xl md:text-3xl font-extrabold text-white tracking-tight'>{value}</span>
    <span className='text-xs md:text-sm text-white/60 font-medium mt-0.5'>{label}</span>
  </div>
);

const Login = () => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const fetchData=async()=>{
    try {
      const {data}=await api.get('/api/first/getCount');
    if(data.success){
      setUserCount(data.userCount);
      setPostCount(data.postsCount);
    }
    else{
      toast.error(data.message);
    }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <div className='relative min-h-screen flex flex-col md:flex-row overflow-hidden'>
      <img src={assets.bgImage1} alt="bgImage" className='absolute inset-0 -z-20 w-full h-full object-cover' />
      <div className='absolute inset-0 -z-10 bg-linear-to-br from-indigo-950/60 via-indigo-900/30 to-transparent' />

      
      <div className='flex-1 flex flex-col items-start justify-between p-8 md:p-12 lg:pl-20 xl:pl-28'>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/20 shadow-lg">
          <div className="p-1.5 bg-white/20 rounded-xl">
            <img src={assets.logo} alt="logo" className="h-8 w-auto object-contain" />
          </div>
          <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow">
            SocialHub
          </span>
        </div>

        <div className='max-w-lg'>
          <div className='flex items-center gap-3 mb-6 max-md:mt-12'>
            <StatPill value={userCount} label="Active users" />
            <StatPill value={postCount}  label="Total posts" />
          </div>

          <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-4 drop-shadow-md'>
            More than just friends,{' '}
            <span className='bg-linear-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent'>
              truly connect
            </span>
          </h1>

          <p className='text-base md:text-xl text-white/70 max-w-sm leading-relaxed'>
            Connect with a global community on Social Hub.
          </p>
        </div>

        <span className='md:h-10' />
      </div>

      <div className='flex-1 flex items-center justify-center p-6 sm:p-10 md:bg-white/5 md:backdrop-blur-sm'>
        <div className='w-full max-w-md'>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;