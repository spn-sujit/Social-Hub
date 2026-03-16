import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';

const Feed = () => {
  const [feeds, setfeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFeeds = async () => {
    setfeeds(dummyPostsData);
    setLoading(false);
  }
  useEffect(() => {
    fetchFeeds();
  }, []);
  return !loading ? (
    <div className='h-full overflow-y-auto no-scrollbar py-8 xl:pr-5 flex items-start justify-center xl:gap-8'>
      <div className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl'>
        <StoriesBar />
        <div className='space-y-4 mt-6 px-4 sm:px-0'>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className='hidden xl:flex flex-col w-72 gap-4 sticky top-8 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar'>
        <div className='bg-white rounded-xl shadow-sm p-4 border border-gray-100 shrink-0'>
          <h2 className='text-sm font-semibold text-gray-900 mb-3'>Sponsored</h2>
          <img className='w-full h-32 rounded-lg mb-3 object-cover' src={assets.sponsored_img} alt="sponsored" />
          <p className='text-xs font-semibold text-gray-900 mb-1'>Email marketing</p>
          <p className='text-xs text-gray-600 leading-relaxed'>Supercharge your marketing with a powerful platform built for results.</p>
        </div>
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Feed