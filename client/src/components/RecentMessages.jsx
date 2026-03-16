import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import { dummyRecentMessagesData } from '../assets/assets';

const RecentMessages = () => {
    const [messages,setMessages]=useState([]); 
    const fetchRecentMessages=async () => {
        setMessages(dummyRecentMessagesData);
    }
    useEffect(()=>{
       fetchRecentMessages();
    },[])
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 shrink-0 overflow-hidden'>
      <div className='p-3 max-h-80 overflow-y-auto no-scrollbar'>
        {
            messages.map((message,index)=>(
                <Link to={`/messages/${message.from_user_id._id}`} key={index} className='flex items-start gap-2 py-2 px-2 hover:bg-gray-50 rounded-lg transition-colors'>
                  <img src={message.from_user_id.profile_picture} alt={message.from_user_id.full_name} className='w-8 h-8 rounded-full object-cover shrink-0'/>
                  <div className='w-full min-w-0'>
                    <div className='flex justify-between items-center gap-2 mb-1'>
                      <p className='text-xs font-semibold text-gray-900 truncate'>{message.from_user_id.full_name}</p>
                      <p className='text-xs text-gray-400 shrink-0'>{moment(message.createdAt).fromNow()}</p>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                      <p className='text-xs text-gray-600 truncate'>{message.text ? message.text : 'Media'}</p>
                      {!message.seen && <div className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-medium shrink-0'>1</div>}
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