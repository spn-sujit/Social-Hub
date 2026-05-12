import React from 'react'
import { dummyUserData } from '../assets/assets'
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {useAuth} from '@clerk/react'
import {useNavigate} from 'react-router-dom'
import api from '../Api/axios';
import toast from 'react-hot-toast'
import { fetchUser } from '../features/user/userSlice';
const UserCard = ({user}) => {
   const currentUser=useSelector((state)=>state.user.value);
   const {getToken}=useAuth();
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const handleFollow=async () => {
        try {
         const {data}=await api.post('/api/user/follow',{id:user._id},{
            headers:{Authorization:`Bearer ${await getToken()}`}
         });
         if(data.success){
            toast.success(data.message);
            dispatch(fetchUser(await getToken()));
         }else{
            toast.error(data.message);
         }
        } catch (error) {
         toast.error(error.message);
        }
    }
    const handleConnectionRequest=async()=>{
       if(currentUser.connections.includes(user._id)){
         return navigate('/messages/'+user._id);
       }
       try {
         const {data}=await api.post('/api/user/connect',{id:user._id},{
            headers:{Authorization:`Bearer ${await getToken()}`}
         });
         if(data.success){
            toast.success(data.message);
         }else{
            toast.error(data.message);
         }
       } catch (error) {
         toast.error(error.message);
       }
    }
  return (
    <div key={user._id} className='flex flex-col justify-between bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 rounded-xl transition-all duration-300 group p-6'>
       <div className='text-center'>
        <img src={user.profile_picture} alt={user.full_name} className='rounded-full w-20 h-20 shadow-md mx-auto border-4 border-slate-100 object-cover group-hover:border-blue-300 transition-all duration-300'/>
       <p className='mt-4 font-bold text-slate-900 text-lg'>{user.full_name}</p>
       {user.username && <p className='text-slate-500 font-medium text-sm'>@{user.username}</p> }
       {user.bio && <p className='text-slate-600 mt-3 text-center text-sm px-4 line-clamp-2'>{user.bio}</p> }
       </div>
       <div className='flex items-center justify-center gap-2 mt-5 text-xs'>
        <div className='flex items-center gap-1.5 border border-slate-300 rounded-full px-3 py-1.5 text-slate-700 font-medium hover:border-blue-300 transition-colors duration-300'>
            <MapPin className='w-4 h-4 text-slate-600'/>{user.location}
        </div>
         <div className='flex items-center gap-1.5 border border-slate-300 rounded-full px-3 py-1.5 text-slate-700 font-medium hover:border-blue-300 transition-colors duration-300'>
            <span>{user.followers.length} Followers</span>
        </div>
       </div>
       <div className='flex mt-6 gap-3'>
         <button onClick={handleFollow} disabled={currentUser?.following.includes(user._id)} className='flex-1 py-2.5 rounded-lg flex justify-center items-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed active:scale-95 transition-all duration-300 text-white font-semibold shadow-sm hover:shadow-md text-sm'>
            <UserPlus className='w-4 h-4'/>{currentUser?.following.includes(user._id)?'Following':'Follow'}
         </button>
         <button onClick={handleConnectionRequest} className='w-12 h-12 rounded-lg flex justify-center items-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all duration-300 shadow-sm hover:shadow-md group/btn active:scale-95'>
            {
                currentUser?.connections.includes(user._id) ?
                <MessageCircle className='w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300'/>
                :
                <Plus className='w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300'/>
            }
         </button>
       </div>
    </div>
  )
}

export default UserCard