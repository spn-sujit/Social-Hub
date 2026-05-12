import React, { useState } from 'react'
import { dummyConnectionsData } from '../assets/assets';
import { Search } from 'lucide-react';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import api from '../Api/axios';
import {useAuth} from '@clerk/react'
import toast from 'react-hot-toast'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
const Discover = () => {
  const [input,setInput]=useState('');
  const {getToken}=useAuth();
  const [users,setUsers]=useState([]);
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const handleSearch = async(e)=>{
    if(e.key==='Enter'){
       try {
        const token=await getToken();
        setUsers([]);
        setLoading(true);
        const {data}=await api.post('/api/user/discover',{input},{
          headers:{Authorization:`Bearer ${token}`}
        });
        data.success ? setUsers(data.users) : toast.error(data.message);
        setLoading(false);
        setInput('');
       } catch (error) {
        toast.error(error.message);
       }
       setLoading(false);
    }
  };
  useEffect(()=>{
     getToken().then((token)=>dispatch(fetchUser(token)));
  },[]);
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50'>
       <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12'>
         <div className='mb-8 md:mb-12'>
          <h1 className='text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight'>
              Discover People
          </h1>
          <p className='text-lg text-slate-600 font-light'>Connect with amazing people and grow your network</p>
         </div>
         <div className='mb-10 relative'>
          <div className='absolute inset-0 bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-lg' />
          <div className='relative bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-6'>
            <div className='flex items-center'>
              <Search className='shrink-0 text-slate-400 w-5 h-5 mr-3 md:mr-4' />
              <input 
                type="text" 
                placeholder='Search people...' 
                className='flex-1 py-2 md:py-3 text-sm md:text-base text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none font-medium' 
                onChange={(e)=>setInput(e.target.value)} 
                value={input} 
                onKeyUp={handleSearch}
              />
            </div>
          </div>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
             {users.map((user)=>(
                <UserCard user={user} key={user._id}/>
             ))}
         </div>
         {loading && (
          <Loading/>
         )}
       </div>
    </div>
  )
}

export default Discover