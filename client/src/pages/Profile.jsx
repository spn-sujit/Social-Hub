import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';
import UserProfileinfo from '../components/UserProfileinfo';
import PostCard from '../components/PostCard';
import moment from 'moment';
import ProfileModel from '../components/ProfileModel';
import { useAuth } from '@clerk/react';
import api from '../Api/axios';
import {toast} from 'react-hot-toast'
import { useSelector } from 'react-redux';

const Profile = () => {
  const currentUser=useSelector((state)=>state.user.value);
  const {getToken}=useAuth();
  const {profileId}=useParams();
  const [user,setUser]=useState(null);
  const [posts,setPosts]=useState([]);
  const [activeTab,setActiveTab]=useState('posts');
  const [showEdit,setShowEdit]=useState(false);
  const fetchUser=async(profileId)=>{
    const token=await getToken();
    try {
      const {data}=await api.post(`/api/user/profiles`,{profileId},{
        headers:{Authorization:`Bearer ${token}`}
      })
      if(data.success){
        setUser(data.profile)
        setPosts(data.posts);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(profileId){
      fetchUser(profileId);
    }
    else{
      fetchUser(currentUser._id);
    }
  },[profileId,currentUser]);
  return user?(
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4 sm:px-6 lg:px-8'>
       <div className='max-w-5xl mx-auto'>
         <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
            <div className='h-36 md:h-44 lg:h-52 w-full bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 overflow-hidden'>
               {user.cover_photo && 
                <img src={user.cover_photo} alt="cover" className='w-full h-full object-cover'/>
               }
            </div>
            <UserProfileinfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit}/>
         </div>
         
         <div className='mt-8'>
          <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-2 inline-flex gap-2 mx-auto'>
            {['posts','media','likes'].map((tab)=>(
               <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 cursor-pointer ${activeTab===tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'}`}>
                 {tab.charAt(0).toUpperCase()+tab.slice(1)}
               </button>
            ))}
          </div>
          {activeTab==='posts' && (
            <div className='mt-8 flex flex-col items-center gap-6'>
              {posts.length > 0 ? (
                posts.map((post)=>(
                  <PostCard key={post._id} post={post}/>
                ))
              ) : (
                <div className='text-center py-16'>
                  <p className='text-slate-500 text-lg font-medium'>No posts yet</p>
                </div>
              )}   
            </div>
          )}
          {activeTab==='media' && (
            <div className='mt-8'>
              {posts.filter((post)=>post.image_urls.length > 0).length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {posts.filter((post)=>post.image_urls.length > 0).map((post)=>(
                    <>
                    {post.image_urls.map((image,index)=>(
                      <Link target='_blank' to={image} key={index} className='relative group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300'>
                      <img className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300' src={image} alt="post media"/>
                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end'>
                        <p className='text-xs p-2 px-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium w-full'>Posted {moment(post.createdAt).fromNow()}</p>
                      </div>
                      </Link>
                    ))}
                    </>
                  ))}
                </div>
              ) : (
                <div className='text-center py-16'>
                  <p className='text-slate-500 text-lg font-medium'>No media posted yet</p>
                </div>
              )}
            </div>
          )}
         </div>
       </div>
       {showEdit && 
        <ProfileModel setShowEdit={setShowEdit}/>
       }
    </div>
  ):
  <Loading/>
}

export default Profile