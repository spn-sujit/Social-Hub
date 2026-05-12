import React, { useState } from 'react'
import {ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react';
import toast, { ToastBar } from 'react-hot-toast';
import {useUser,useAuth} from '@clerk/react'
import api from '../Api/axios';

const StoryModal = ({setShowModel,fetchStories}) => {
    const bgcolors = ["#FF5733","#33FF57","#3357FF","#F1C40F","#9B59B6","#1ABC9C","#E67E22","#E74C3C","#2ECC71","#3498DB"];
    const [mode,setMode]=useState("text");
    const [background,setBackground]=useState(bgcolors[0]);
    const [text,setText]=useState("");
    const [media,setMedia]=useState("");
    const[previewUrl,setPeviewUrl]=useState(null);
    const {getToken}=useAuth();
    const MAX_VIDEO_DURATION=60;
    const MAX_VIDEO_SIZE_MB=50;
    const handleMediaUpload=(e)=>{
        const file=e.target.files?.[0]
        if(file){
           if(file.type.startsWith('video')){
            if(file.size > MAX_VIDEO_SIZE_MB *1024 *1024){
                toast.error(`Video file size cannot exceed ${MAX_VIDEO_SIZE_MB} MB.`);
                setMedia(null);
                setPeviewUrl(null);
                return;
            }
            const video=document.createElement('video');
            video.preload='metadata';
            video.onloadedmetadata=()=>{
                window.URL.revokeObjectURL(video.src)
                if(video.duration>MAX_VIDEO_DURATION){
                  toast.error('Video duration cannot exceed 1 minute');
                  setMedia(null);
                  setPeviewUrl(null);
                }
                else{
                    setMedia(file);
                    setPeviewUrl(URL.createObjectURL(file));
                    setText('');
                    setMode('media');
                }
            }
            video.src=URL.createObjectURL(file);

           }else if(file.type.startsWith('image')){
            setMedia(file);
            setPeviewUrl(URL.createObjectURL(file));
            setText('');
            setMode('media');
           }
        }
    }

    const handleCreateStory=async()=>{
      const media_type=mode==='media'?media?.type.startsWith('image') ? 'image':'video' : 'text';
      if(media_type==='text' && !text){
        throw new Error("Please Enter some text");
      }
      const token=await getToken();
      let formData=new FormData();
      formData.append('content',text);
      formData.append('media_type',media_type);
      formData.append('media',media);
      formData.append('background_color',background);
      try {
        const {data}=await api.post(`/api/story/create`,formData,{
            headers:{Authorization:`Bearer ${token}`}
        });
        if(data.success){
            setShowModel(false);
            toast.success('Story created successfully');
            fetchStories();
        }
        else{
            toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    return (
        <div className='fixed inset-0 z-50 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden'>
                <div className='px-6 py-4 border-b border-zinc-800 flex items-center justify-between'>
                    <button onClick={()=> setShowModel(false)} className='text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer'>
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className='text-lg font-semibold'>Create Story</h2>
                    <div className='w-8'></div>
                </div>

                <div className='mx-6 mt-6 rounded-xl h-96 flex items-center justify-center relative overflow-hidden shadow-lg' style={{backgroundColor: background}}>
                    {mode === 'text' && (
                        <textarea  className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none placeholder-white/50' placeholder="What's on your mind?" onChange={(e)=>setText(e.target.value)} value={text}/>
                    )}
                    {mode === 'media' && previewUrl && (
                        media?.type.startsWith('image') ? (
                            <img src={previewUrl} alt="preview" className='w-full h-full object-cover'/>
                        ) : (
                            <video src={previewUrl} className='w-full h-full object-cover'/>
                        )
                    )}
                </div>

                <div className='px-6 mt-6 flex gap-2 flex-wrap'>  
                    {bgcolors.map((color)=>(
                        <button key={color} className='w-8 h-8 rounded-full ring-2 ring-transparent hover:ring-white transition-all cursor-pointer' style={{backgroundColor: color}} onClick={()=>setBackground(color)} title={color}/>
                    ))}
                </div>

                <div className='px-6 mt-6 mb-6 flex gap-3'>
                    <button onClick={()=>{setMode('text');setMedia(null);setPeviewUrl(null)}} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all cursor-pointer ${mode === 'text' ? "bg-white text-black shadow-lg" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}> 
                        <TextIcon size={18}/>
                        Text
                    </button>
                    <label className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all cursor-pointer ${mode === 'media' ? 'bg-white text-black shadow-lg' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                        <input onChange={(e)=>{handleMediaUpload(e)}} type="file" accept='image/*,video/*' className='hidden'/>
                        <Upload size={18}/>
                        Photo/Video
                    </label>
                </div>
                <button onClick={()=>toast.promise(handleCreateStory(),{
                  loading:'Saving..'
                })} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer'>
                  <Sparkle size={18}/> Create Story
                </button>
            </div> 
        </div>
    )
}

export default StoryModal