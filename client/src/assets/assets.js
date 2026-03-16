import logo from './network.png'
import sample_cover from './sample_cover.jpg'
import sample_profile from './sample_profile.jpg'
import bgImage from './bgImage.png'
import bgImage1 from './bgImage1.jpg'
import group_users from './group_users.png'
import { Home, MessageCircle, Search, UserIcon, Users } from 'lucide-react'
import sponsored_img from './sponsored_img.png'

export const assets = {
    logo,
    sample_cover,
    sample_profile,
    bgImage,
    bgImage1,
    group_users,
    sponsored_img
}

export const menuItemsData = [
    { to: '/', label: 'Feed', Icon: Home },
    { to: '/messages', label: 'Messages', Icon: MessageCircle },
    { to: '/connections', label: 'Connections', Icon: Users },
    { to: '/discover', label: 'Discover', Icon: Search },
    { to: '/profile', label: 'Profile', Icon: UserIcon },
]

export const dummyUserData = {
    _id: "user_main",
    email: "admin@example.com",
    full_name: "John Warren",
    username: "john_warren",
    bio: "🌍 Dreamer | 📚 Learner | 🚀 Doer",
    profile_picture: sample_profile,
    cover_photo: sample_cover,
    location: "New York, NY",
    followers: ["user_2","user_3","user_4","user_5","user_6","user_7"],
    following: ["user_2","user_3","user_4","user_8","user_9"],
    connections: ["user_2","user_3","user_4","user_5","user_6"],
    posts: [],
    is_verified: true,
    createdAt: "2025-07-09T09:26:59.231Z",
    updatedAt: "2025-07-21T06:56:50.017Z",
}

const dummyUser2Data = {
    ...dummyUserData,
    _id: "user_2",
    username: "richard_h",
    full_name: "Richard Hendricks",
    profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    bio: "Tech enthusiast | Building cool stuff",
    location: "San Francisco, CA"
}

const dummyUser3Data = {
    ...dummyUserData,
    _id: "user_3",
    username: "alexa_james",
    full_name: "Alexa James",
    profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    bio: "Designer & Creative 🎨",
    location: "Los Angeles, CA"
}

const dummyUser4Data = {
    ...dummyUserData,
    _id: "user_4",
    username: "daniel_smith",
    full_name: "Daniel Smith",
    profile_picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    bio: "Product Manager | Coffee lover ☕",
    location: "Austin, TX"
}

const dummyUser5Data = {
    ...dummyUserData,
    _id: "user_5",
    username: "sophia_lee",
    full_name: "Sophia Lee",
    profile_picture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    bio: "Entrepreneur | Always learning",
    location: "Seattle, WA"
}

const dummyUser6Data = {
    ...dummyUserData,
    _id: "user_6",
    username: "michael_chen",
    full_name: "Michael Chen",
    profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    bio: "Software Engineer | Open source contributor",
    location: "Boston, MA"
}

const dummyUser7Data = {
    ...dummyUserData,
    _id: "user_7",
    username: "emma_wilson",
    full_name: "Emma Wilson",
    profile_picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    bio: "Marketing specialist | Content creator",
    location: "Chicago, IL"
}

const dummyUser8Data = {
    ...dummyUserData,
    _id: "user_8",
    username: "james_anderson",
    full_name: "James Anderson",
    profile_picture: "https://images.unsplash.com/photo-1500945696969-2b06fce9e22e?q=80&w=200",
    bio: "Data scientist | AI enthusiast",
    location: "Denver, CO"
}

const dummyUser9Data = {
    ...dummyUserData,
    _id: "user_9",
    username: "lisa_brown",
    full_name: "Lisa Brown",
    profile_picture: "https://images.unsplash.com/photo-1507876466836-69b100652f50?q=80&w=200",
    bio: "UX/UI Designer | Problem solver",
    location: "Miami, FL"
}

export const dummyStoriesData = [
{
_id:"story1",
user:dummyUserData,
content:"Working on something exciting 🚀",
media_url:"",
media_type:"text",
background_color:"#22c55e",
createdAt:"2025-07-25T08:16:06.958Z"
},
{
_id:"story2",
user:dummyUser2Data,
content:"",
media_url:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
media_type:"image",
background_color:"#6366f1",
createdAt:"2025-07-25T08:27:48.134Z"
},
{
_id:"story3",
user:dummyUser3Data,
content:"",
media_url:"https://videos.pexels.com/video-files/14447442/14447442-hd_1080_1920_30fps.mp4",
media_type:"video",
background_color:"#6366f1",
createdAt:"2025-07-25T08:27:21.289Z"
},
{
_id:"story4",
user:dummyUser4Data,
content:"Enjoying nature 🌿",
media_url:"",
media_type:"text",
background_color:"#ff0000",
createdAt:"2025-07-25T08:27:21.289Z"
},
{
_id:"story5",
user:dummyUser5Data,
content:"",
media_url:"https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
media_type:"image",
background_color:"#6366f1",
createdAt:"2025-07-25T08:27:21.289Z"
},
{
_id:"story6",
user:dummyUser6Data,
content:"New project launching! 💡",
media_url:"",
media_type:"text",
background_color:"#f59e0b",
createdAt:"2025-07-25T08:27:21.289Z"
},
{
_id:"story7",
user:dummyUser7Data,
content:"",
media_url:"https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg",
media_type:"image",
background_color:"#ec4899",
createdAt:"2025-07-25T08:27:21.289Z"
}
]

export const dummyPostsData = [
{
_id:"post1",
user:dummyUserData,
content:"Building something amazing with my team 💻",
image_urls:["https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"],
post_type:"text_with_image",
likes_count:["user_2","user_3"],
createdAt:"2025-07-16T05:54:31.191Z"
},
{
_id:"post2",
user:dummyUser2Data,
content:"Consistency beats motivation.",
image_urls:[],
post_type:"text",
likes_count:["user_3"],
createdAt:"2025-07-16T05:54:31.191Z"
},
{
_id:"post3",
user:dummyUser3Data,
content:"Travel memories ✈️",
image_urls:["https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg"],
post_type:"text_with_image",
likes_count:["user_2","user_4"],
createdAt:"2025-07-16T05:54:31.191Z"
},
{
_id:"post4",
user:dummyUser4Data,
content:"",
image_urls:["https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"],
post_type:"image",
likes_count:["user_3","user_5"],
createdAt:"2025-07-16T05:54:31.191Z"
},
{
_id:"post5",
user:dummyUser5Data,
content:"Morning coffee ☕",
image_urls:[],
post_type:"text",
likes_count:["user_2"],
createdAt:"2025-07-16T05:54:31.191Z"
},
{
_id:"post6",
user:dummyUser6Data,
content:"Just deployed a new feature! 🎉",
image_urls:["https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"],
post_type:"text_with_image",
likes_count:["user_main","user_2","user_4"],
createdAt:"2025-07-16T05:54:31.191Z"
},
{
_id:"post7",
user:dummyUser7Data,
content:"Content is king 👑",
image_urls:[],
post_type:"text",
likes_count:["user_5","user_8"],
createdAt:"2025-07-16T05:54:31.191Z"
},
{
_id:"post8",
user:dummyUser8Data,
content:"AI is changing everything 🤖",
image_urls:["https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg"],
post_type:"text_with_image",
likes_count:["user_main","user_3","user_6"],
createdAt:"2025-07-16T05:54:31.191Z"
}
]

export const dummyMessagesData = [
{
_id:"msg1",
from_user_id:"user_2",
to_user_id:"user_main",
text:"Hey how are you?",
message_type:"text",
media_url:"",
createdAt:"2025-07-25T10:44:12.753Z"
},
{
_id:"msg2",
from_user_id:"user_main",
to_user_id:"user_2",
text:"I'm good!",
message_type:"text",
media_url:"",
createdAt:"2025-07-25T10:45:12.753Z"
},
{
_id:"msg3",
from_user_id:"user_3",
to_user_id:"user_main",
text:"",
message_type:"image",
media_url:"https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
createdAt:"2025-07-25T10:45:12.753Z"
},
{
_id:"msg4",
from_user_id:"user_main",
to_user_id:"user_3",
text:"Nice photo!",
message_type:"text",
media_url:"",
createdAt:"2025-07-25T10:45:12.753Z"
},
{
_id:"msg5",
from_user_id:"user_4",
to_user_id:"user_main",
text:"Let's catch up soon.",
message_type:"text",
media_url:"",
createdAt:"2025-07-25T10:45:12.753Z"
},
{
_id:"msg6",
from_user_id:"user_main",
to_user_id:"user_4",
text:"Sounds great!",
message_type:"text",
media_url:"",
createdAt:"2025-07-25T10:46:12.753Z"
},
{
_id:"msg7",
from_user_id:"user_5",
to_user_id:"user_main",
text:"Check this out!",
message_type:"text",
media_url:"",
createdAt:"2025-07-25T10:47:12.753Z"
}
]

export const dummyConnectionsData = [
dummyUserData,
dummyUser2Data,
dummyUser3Data,
dummyUser4Data,
dummyUser5Data,
dummyUser6Data,
dummyUser7Data,
dummyUser8Data,
dummyUser9Data
]

export const dummyFollowersData = [
dummyUser2Data,
dummyUser3Data,
dummyUser4Data,
dummyUser5Data,
dummyUser6Data,
dummyUser7Data
]

export const dummyFollowingData = [
dummyUser2Data,
dummyUser3Data,
dummyUser4Data,
dummyUser8Data,
dummyUser9Data
]

export const dummyPendingConnectionsData = [
dummyUser5Data,
dummyUser7Data
]

export const dummyRecentMessagesData = [
{
  _id: "recent1",
  from_user_id: dummyUser2Data,
  to_user_id: dummyUserData,
  text: "Hey how are you?",
  seen: false,
  createdAt: "2025-07-25T10:44:12.753Z"
},
{
  _id: "recent2",
  from_user_id: dummyUser3Data,
  to_user_id: dummyUserData,
  text: "Check this image!",
  seen: true,
  createdAt: "2025-07-25T10:45:12.753Z"
},
{
  _id: "recent3",
  from_user_id: dummyUser4Data,
  to_user_id: dummyUserData,
  text: "",
  seen: false,
  createdAt: "2025-07-25T10:46:12.753Z"
},
{
  _id: "recent4",
  from_user_id: dummyUser5Data,
  to_user_id: dummyUserData,
  text: "Let's meet tomorrow",
  seen: true,
  createdAt: "2025-07-25T10:47:12.753Z"
},
{
  _id: "recent5",
  from_user_id: dummyUser6Data,
  to_user_id: dummyUserData,
  text: "New project looks great!",
  seen: false,
  createdAt: "2025-07-25T10:48:12.753Z"
}
];