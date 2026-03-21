import fs from "fs";
import imagekit from "../config/imageKit.js";
import Story from "../models/Story.js";
import User from "../models/User.js";
import { inngest } from "../inngest/index.js";

export const addUserStory = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, media_type, background_color } = req.body;
    const media = req.file;
    let media_url = "";

    if (media_type === "image" || media_type === "video") {
      const fileBuffer = fs.createReadStream(media.path);
      const response = await imagekit.files.upload({
        file: fileBuffer,
        fileName: media.originalname,
      });

      media_url = response.url;
    }

    const story = await Story.create({
      user: userId,
      content,
      media_type,
      media_url,
      background_color,
    });

    await inngest.send({
      name:'app/story.delete',
      data:{storyId:story._id}
    })

    return res.json({ success: true, story });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const getStories = async (req, res) => {
  try {
    const {userId}=req.auth();
    const user=await User.findById(userId);

    const userIds=[userId,...user.connections,...user.following];
    const stories=await Story.find({
        user:{$in:userIds},
    }).populate('user').sort({createdAt:-1});

    return res.json({success:true,stories});
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
