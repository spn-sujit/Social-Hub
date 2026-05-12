import Post from "../models/Post.js";
import User from "../models/User.js";

export const getCount= async(req,res)=>{
  try {
    const users=await User.find();
    const posts=await Post.find();
    return res.json({success:true,userCount:users.length,postsCount:posts.length});
  } catch (error) {
    res.json({success:false,message:error.message});
  }
};