import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets';
import { Image, X } from 'lucide-react';
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';
const CreatePost = () => {
  const [content,setContent]=useState('');
  const [images,setImages]=useState([]);
  const [loading,setLoading]=useState(false);
  const user=useSelector((state)=>state.user.value);
  const handleSubmit=async()=>{

  }
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 py-8'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-8'>
            <h1 className='text-4xl font-black text-slate-900 mb-2 tracking-tight'>Create Post</h1>
             <p className='text-lg text-slate-600 font-light'>Share your thoughts with the world</p>
          </div>
          <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>
            <div className='flex items-center gap-4 mb-6'>
              <img src={user.profile_picture} alt={user.full_name} className='w-14 h-14 rounded-full shadow-md border-2 border-slate-100 object-cover'/>
              <div>
                <h2 className='font-bold text-slate-900'>{user.full_name}</h2>
                <p className='text-sm text-slate-500 font-medium'>@{user.username}</p>
              </div>
            </div>
            <textarea onChange={(e)=>setContent(e.target.value)} value={content} className='w-full resize-none max-h-32 text-base outline-none placeholder-slate-400 bg-transparent font-medium text-slate-900' placeholder="What's happening?"/>

            {
              images.length>0 && (
                <div className='flex flex-wrap gap-3 mt-6'>
                  {images.map((image,i)=>(
                    <div key={i} className='relative group overflow-hidden rounded-lg shadow-sm'>
                       <img className='h-24 w-24 object-cover' src={URL.createObjectURL(image)} alt=""/>
                       <div onClick={()=>setImages(images.filter((_,index)=>index!=i))} className='absolute hidden group-hover:flex justify-center items-center inset-0 bg-black/50 rounded-lg cursor-pointer transition-all duration-300'>
                        <X className='w-6 h-6 text-white'/>
                       </div>
                    </div>
                  ))}
                </div>
              )
            }
            <div className='flex items-center justify-between pt-6 mt-6 border-t border-slate-200'>
              <label htmlFor="images" className='flex items-center gap-2 text-slate-600 hover:text-blue-600 transition duration-300 cursor-pointer font-medium'>
                <Image className='size-5'/>
                <span>Add images</span>
              </label>
              <input type="file" id="images" accept='image/*' hidden multiple onChange={(e)=>setImages([...images,...e.target.files])}/>
              <button disabled={loading} onClick={()=>toast.promise(
                handleSubmit,{
                  loading:'uploading...',
                  success: <p>Post Added</p>,
                  error: <p>Post Not Added</p>
                }
              )} className='text-sm bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed active:scale-95 transition-all duration-300 text-white font-semibold px-6 py-2.5 rounded-lg cursor-pointer shadow-sm hover:shadow-md'>
                Publish Post
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CreatePost