import React from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Eye, MessagesSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
const Messages = () => {
  const navigate = useNavigate();
  const {connections}=useSelector((state)=>state.connections)
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'> 
        <div className='mb-12'>
          <h1 className='text-5xl font-black text-slate-900 mb-3 tracking-tight'>Messages</h1>
          <p className='text-lg text-slate-600 font-light'>Connect with your network</p>
        </div>
        <div className='grid gap-4'>
          {connections.map((user) => (
            <div key={user._id} className='flex items-center justify-between p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 rounded-xl transition-all duration-300 group'>
              <div className='flex items-center gap-4 flex-1'>
                <img className='rounded-full w-16 h-16 object-cover border-3 border-slate-100 shadow-md group-hover:border-blue-300 transition-all duration-300' src={user.profile_picture} alt={user.full_name}/>
                <div className='flex-1'>
                  <p className='font-bold text-slate-900 text-lg'>{user.full_name}</p>
                  <p className='text-slate-500 text-sm mb-1'>@{user.username}</p>
                  <p className='text-sm text-slate-600 line-clamp-1'>{user.bio}</p>
                </div>
              </div>
              <div className='flex gap-3 ml-4'>
                <button onClick={() => navigate(`/messages/${user._id}`)} className='w-11 h-11 flex items-center justify-center rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md group/btn'>
                  <MessagesSquare className='w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300'/>
                </button>
                <button onClick={() => navigate(`/profile/${user._id}`)} className='w-11 h-11 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md group/btn'>
                  <Eye className='w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300'/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Messages