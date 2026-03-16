import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import React from 'react'
import moment from 'moment'

const UserProfileinfo = ({user,posts,profileId,setShowEdit}) => {
  return (
    <div className='relative py-6 px-6 md:px-8 bg-white border-b border-slate-200'>
      <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
        <div className='w-24 h-24 border-4 border-white shadow-md absolute -top-12 rounded-full overflow-hidden bg-white'>
           <img src={user.profile_picture} alt={user.full_name} className='w-full h-full object-cover rounded-full'/>
        </div>
        <div className='w-full pt-14 md:pt-0 md:pl-32'> 
            <div className='flex flex-col md:flex-row items-start justify-between gap-3'>
                <div>
                  <div className='flex items-center gap-2'>
                     <h1 className='text-2xl font-bold text-slate-900'>{user.full_name}</h1>
                     <Verified className='w-5 h-5 text-blue-500 shrink-0'/>
                  </div>
                  <p className='text-slate-600 font-medium text-sm'>{user.username ? `@${user.username}` : 'Add a username'}</p>
                </div>
                {!profileId && 
                 <button onClick={()=>setShowEdit(true)} className='flex items-center gap-2 border border-slate-300 hover:bg-slate-50 hover:border-blue-400 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md whitespace-nowrap'>
                    <PenBox className='w-4 h-4'/>
                    Edit
                 </button>
                }
            </div>
            <p className='text-slate-700 text-sm max-w-lg mt-3 leading-relaxed'>{user.bio}</p>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 mt-3 text-slate-600 text-sm'>
                <span className='flex items-center gap-1.5'>
                    <MapPin className='w-3.5 h-3.5 text-slate-500'/>
                    {user.location ? user.location : 'Add location'}
                </span>
                <span className='flex items-center gap-1.5'>
                    <Calendar className='w-3.5 h-3.5 text-slate-500'/>
                    Joined {moment(user.createdAt).fromNow()}
                </span>
            </div>
            <div className='flex items-center gap-6 mt-4 border-t border-slate-200 pt-4'>
               <div className='hover:text-blue-600 transition-colors duration-300 cursor-pointer'>
                <span className='text-lg md:text-xl font-bold text-slate-900'>{posts.length}</span>
                <span className='text-xs text-slate-600 ml-1.5'>Posts</span>
               </div>
               <div className='hover:text-blue-600 transition-colors duration-300 cursor-pointer'>
                <span className='text-lg md:text-xl font-bold text-slate-900'>{user.followers.length}</span>
                <span className='text-xs text-slate-600 ml-1.5'>Followers</span>
               </div>
               <div className='hover:text-blue-600 transition-colors duration-300 cursor-pointer'>
                <span className='text-lg md:text-xl font-bold text-slate-900'>{user.following.length}</span>
                <span className='text-xs text-slate-600 ml-1.5'>Following</span>
               </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileinfo