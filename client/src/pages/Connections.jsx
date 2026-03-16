import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users,UserPlus,UserCheck,UserRoundPen,MessageSquare} from 'lucide-react'
import { dummyConnectionsData as connections, dummyPendingConnectionsData as pendingConnections, dummyFollowersData as followers, dummyFollowingData as following } from '../assets/assets';
const Connections = () => {
  const navigate =useNavigate();
  const dataArray=[
    {label:'Followers',value:followers,icon:Users},
    {label:'Following',value:following,icon:UserCheck},
    {label:'Pending',value:pendingConnections,icon:UserRoundPen},
    {label:'Connections',value:connections,icon:UserPlus},
  ];
  const [currentTab,setCurrentTab]=useState('Followers');
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>
         <div className='mb-12'>
          <h1 className='text-5xl font-black text-slate-900 mb-3 tracking-tight'>Connections</h1>
          <p className='text-lg text-slate-600 font-light'>Manage your network and discover new connections</p>
        </div>
        <div className='mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {dataArray.map((item,index)=>(
            <div key={index} className='flex flex-col items-center justify-center gap-2 bg-white border border-slate-200 h-24 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group cursor-pointer p-4'> 
              <b className='text-3xl bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent'>{item.value.length}</b>
              <p className='text-slate-600 font-medium text-sm'>{item.label}</p>
            </div>
          ))}
        </div>
        <div className='inline-flex flex-wrap items-center border border-slate-200 rounded-lg p-1.5 bg-white shadow-sm hover:shadow-md transition-shadow duration-300'>
          {
              dataArray.map((tab)=>(
                <button onClick={()=>setCurrentTab(tab.label)} key={tab.label} className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${currentTab===tab.label ?'bg-blue-600 text-white shadow-md':'text-slate-700 hover:bg-slate-100'}`}>
                  <tab.icon className='w-4 h-4'/>
                  <span className='ml-2'>{tab.label}</span>
                  {tab.count !==undefined && (
                    <span className={`ml-2 text-xs font-bold px-2.5 py-0.5 rounded-full ${currentTab===tab.label ? 'bg-blue-400 text-blue-900' : 'bg-slate-100 text-slate-700'}`}>{tab.count}</span>
                  )}
                </button>
              ))
          }
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {dataArray.find((item)=> item.label===currentTab).value.map((user)=>(
              <div key={user._id} className='flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group p-6'>
                 <div className='flex justify-center mb-4'>
                   <img className='rounded-full w-16 h-16 object-cover border-3 border-slate-100 shadow-md group-hover:border-blue-300 transition-all duration-300' src={user.profile_picture} alt={user.full_name}/>
                 </div>
                 <div className='flex-1 text-center'>
                    <p className='font-bold text-slate-900 text-lg'>{user.full_name}</p>
                    <p className='text-slate-500 text-sm mb-2'>@{user.username}</p>
                    <p className='text-sm text-slate-600 line-clamp-2 mb-4'>{user.bio.slice(0,50)}...</p>
                    <div className='flex flex-col gap-2 pt-4 border-t border-slate-200'>
                       {
                        <button onClick={()=>navigate(`/profile/${user._id}`)} className='w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md active:scale-95'>View Profile</button>
                       }
                       {
                        currentTab==='Following' && (
                          <button className='w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300'>Unfollow</button>
                        )
                       }
                       {
                        currentTab==='Pending' &&(
                          <button className='w-full bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300'>Accept</button>
                        )
                       }
                       {
                        currentTab==='Connections' &&(
                            <button onClick={()=>navigate(`/messages/${user._id}`)} className='w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2'>
                              <MessageSquare className='w-4 h-4'/>
                              <span>Message</span>
                            </button>
                        )
                       }
                    </div>
                 </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Connections