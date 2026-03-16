import { BadgeCheck, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const handleClose = () => {
    setViewStory(null);
  };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer, progressInterval;
    if (viewStory && viewStory.media_type !== "video") {
      setProgress(0);
      const duration = 10000;
      const setTime = 10;
      let elapsed = 0;
      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
      }, setTime);

      timer = setTimeout(() => {
        setViewStory(null);
      }, duration);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  if (!viewStory) return null;

  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt="story"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        );
      case "video":
        return (
          <video
            controls
            autoPlay
            onEnded={() => setViewStory(null)}
            src={viewStory.media_url}
            className="max-h-[85vh] rounded-lg"
          />
        );
      case "text":
        return (
          <div className="w-full h-[85vh] flex items-center justify-center p-8 text-white text-3xl font-semibold text-center">
            {viewStory.content}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.background_color
            : "#000000",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-700/50">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 backdrop-blur-xl rounded-full bg-black/60 border border-white/20 hover:bg-black/70 transition-colors">
        <img
          src={viewStory.user?.profile_picture}
          alt={viewStory.user?.full_name}
          className="w-6 h-6 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1 text-xs">
          <span className="truncate">{viewStory.user?.full_name}</span>
          <BadgeCheck size={12} className="text-blue-400 shrink-0" />
        </div>
      </div>
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white focus:outline-none hover:bg-white/10 p-2 rounded-full transition-all"
      >
        <X className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
      </button>

      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;