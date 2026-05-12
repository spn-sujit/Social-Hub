import React, { useState } from "react";
import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/react";
import api from "../Api/axios";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const postWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-indigo-500 font-semibold">$1</span>',
  );
  const [likes, setLikes] = useState(post.likes_count);
  const currentUser = useSelector((state)=>state.user.value);
  const {getToken}=useAuth();
  const handleLike = async () => {
    try {
        const token=await getToken();
        const {data}=await api.post(`/api/post/like`,{postId:post._id},{
          headers:{Authorization:`Bearer ${token}`}
        })
        if(data.success){
          toast.success(data.message);
          setLikes(prev=>{
            if(prev.includes(currentUser._id)){
              return prev.filter(id=>id!=currentUser._id);
            }
            else{
              return [...prev,currentUser._id];
            }
          })
        }
        else{
          toast(data.message);
        }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const navigate= useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 space-y-4 w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl border border-gray-100 mb-4 mx-auto sm:mx-0">
      <div onClick={()=>navigate(`/profile/${post.user._id}`)}className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity">
        <img
          src={post.user.profile_picture}
          alt={post.user.full_name}
          className="w-11 h-11 rounded-full shadow-md object-cover group-hover:scale-110 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {post.user.full_name}
            </span>
            <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
      {post.content && (
        <div
          className="text-gray-800 text-base leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}
      {post.image_urls && post.image_urls.length > 0 && (
        <div
          className={`grid gap-2 ${post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
        >
          {post.image_urls.map((img, index) => (
            <div
              key={index}
              className="w-full overflow-hidden rounded-xl bg-gray-100 group cursor-pointer"
            >
              <img
                src={img}
                alt={`post-image-${index}`}
                className="w-full h-auto max-h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-gray-600 pt-3 border-t border-gray-200">
        <button className="flex items-center gap-2 hover:text-red-500 transition-colors group">
          <Heart
            onClick={handleLike}
            className={`w-5 h-5 cursor-pointer group-hover:scale-110 transition-transform ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`}
          />
          <span className="text-sm font-medium">{likes.length}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{12}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-green-500 transition-colors group">
          <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{7}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;