import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";
import { useAuth } from "@clerk/react";
import api from "../Api/axios";
import toast from "react-hot-toast";

const StoriesBar = () => {
  const {getToken}=useAuth();
  const [stories, setStories] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  const fetchStories = async () => {
   try {
    const token=await getToken();
    const {data}=await api.get(`/api/story/get`,{
      headers:{Authorization:`Bearer ${token}`}
    });
    if(data.success){
      setStories(data.stories);
    }
    else{
      toast.error(data.message);
    }
   } catch (error) {
      toast.error(error.message);
   }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4 py-4">
      <div className="flex gap-4 pb-5">
        <button
          onClick={() => setShowModel(true)}
          className="relative rounded-2xl shadow-md min-w-32 max-w-32 h-48 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-dashed border-indigo-300 bg-linear-to-b from-indigo-50 to-white overflow-hidden group active:scale-95"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-12 bg-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300 shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-semibold text-slate-700 text-center leading-tight">
              Create
              <br />
              Story
            </p>
          </div>
        </button>

        {stories.map((story, index) => (
          <button
            key={index}
            onClick={() => setViewStory(story)}
            className="relative rounded-2xl shadow-md min-w-32 max-w-32 h-48 cursor-pointer overflow-hidden group active:scale-95 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div className="absolute inset-0 z-0">
              {story.media_type !== "text" ? (
                story.media_type === "image" ? (
                  <img
                    src={story.media_url}
                    alt={story.content}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <video
                    src={story.media_url}
                    alt={story.content}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )
              ) : (
                <div className={`h-full w-full`} style={{backgroundColor:story.background_color}}></div>
              )}
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/50 z-5 group-hover:from-black/30 group-hover:to-black/60 transition-all duration-300"></div>

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-3">
              <img
                src={story.user.profile_picture}
                alt={story.user.username}
                className="size-8 rounded-full ring-2 ring-white shadow-lg object-cover shrink-0"
              />

              <div className="min-w-0 h-full flex flex-col">
  <div className="flex-1 flex items-center justify-center text-center">
    <p className="text-white text-xs font-medium line-clamp-2 leading-tight px-1">
      {story.content}
    </p>
  </div>

  <p className="text-white/80 text-xs font-medium text-center">
    {moment(story.createdAt).fromNow()}
  </p>
</div>
            </div>

            <div className="absolute top-2 right-2 z-20 size-2 bg-indigo-500 rounded-full shadow-lg"></div>
          </button>
        ))}
      </div>

      {showModel && (
        <StoryModal setShowModel={setShowModel} fetchStories={fetchStories} />
      )}
      {viewStory && (
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </div>
  );
};

export default StoriesBar;