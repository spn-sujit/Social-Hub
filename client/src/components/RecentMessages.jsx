import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import { dummyRecentMessagesData } from '../assets/assets';
import { useAuth, useUser } from '@clerk/react';
import api from '../Api/axios';
import toast from 'react-hot-toast'

const RecentMessages = () => {
    const [messages,setMessages]=useState([]); 
    const {user}=useUser();
    const {getToken}=useAuth();
    const fetchRecentMessages=async () => {
        try {
          const token=await getToken();
          const {data}=await api.get('/api/user/recent-messages',{
            headers:{Authorization:`Bearer ${token}`}
          });
          if(data.success){
             const groupedMessages=data.messages.reduce((acc,message)=>{
                const senderId=message.from_user_id._id;
                if(!acc[senderId] || new Date(message.createdAt)>new Date(acc[senderId].createdAt)){
                    acc[senderId]=message;
                }
                return acc;
             },{});
             const sortedMessages=Object.values(groupedMessages).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
             setMessages(sortedMessages);
          }
          else{
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
    }
    useEffect(()=>{
      if(user){
           fetchRecentMessages();
           const intervalId=setInterval(fetchRecentMessages,30000);
           return()=>{clearInterval(intervalId)};
      }
    },[user]);
  return (
    <div className='bg-white rounded-2xl shadow-md border border-gray-200 shrink-0 overflow-hidden'>
      <div className='p-3 max-h-96 overflow-y-auto no-scrollbar space-y-1'>
        {
            messages.map((message,index)=>(
                <Link to={`/messages/${message.from_user_id._id}`} key={index} className='flex items-center gap-3 py-2.5 px-3 hover:bg-gray-100 rounded-xl transition-all duration-200'>
                  <img src={message.from_user_id.profile_picture} alt={message.from_user_id.full_name} className='w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200'/>
                  <div className='w-full min-w-0'>
                    <div className='flex justify-between items-center gap-2 mb-1'>
                      <p className='text-sm font-medium text-gray-900 truncate'>{message.from_user_id.full_name}</p>
                      <p className='text-[11px] text-gray-400 shrink-0'>{moment(message.createdAt).fromNow()}</p>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                      <p className='text-xs text-gray-500 truncate'>{message.text ? message.text : 'Media'}</p>
                      {!message.seen && <div className='bg-indigo-500 text-white px-2 py-0.5 flex items-center justify-center rounded-full text-[10px] font-medium shrink-0'>1</div>}
                    </div>
                  </div>
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default RecentMessages