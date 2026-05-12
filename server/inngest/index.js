import { Inngest } from "inngest";
import User from "../models/User.js";
import Connection from "../models/Connections.js";
import sendEmail from "../config/nodeMailer.js";
import Story from "../models/Story.js";
import Message from "../models/Message.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "SocialHub-app" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk",
    triggers:[{ event: "clerk/user.created" }] },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let username = email_addresses[0].email_address.split("@")[0];

    const user = await User.findOne({ username });

    if (user) {
      username = username + Math.floor(Math.random() * 10000);
    }
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };
    await User.create(userData);
  },
);
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk",
    triggers:[{ event: "clerk/user.updated" }]
   },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const updateUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };
    await User.findByIdAndUpdate(id, updateUserData);
  },
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" ,
    triggers:[{ event: "clerk/user.deleted" }]
  },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  },
);

const sendNewConnectionRequest = inngest.createFunction(
  { id: "send-new-connection-request-remainder",
     triggers:[{ event: "app/connection-request" }]
   },
  async ({ event, step }) => {
    const { connectionId } = event.data;

    await step.run("send-connection-request", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id",
      );
      const subject = " 👋 New connection request";
      const body = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${connection.to_user_id.full_name},</h2>
        <p>You have a new connection request from ${connection.from_user_id.full_name} (@${connection.from_user_id.username})</p>
          <p>
         Click <a href="${process.env.FRONTEND_URL}/connections" style="color:#10b981;">
          here
        </a> to accept or reject the request
        </p>
        <p>Thanks,<br/>Social Hub - Stay Connected</p>
        </div>
        `;
      await sendEmail({ to: connection.to_user_id.email, subject, body });
    });

    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("send-connection-request-remainder", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id",
      );
      if (connection.status === "accepted") {
        return { message: "Already Accepted" };
      }
      const subject = " 👋 New connection request";
      const body = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${connection.to_user_id.full_name},</h2>
        <p>You have a new connection request from ${connection.from_user_id.full_name} (@${connection.from_user_id.username})</p>
          <p>
         Click <a href="${process.env.FRONTEND_URL}/connections" style="color:#10b981;">
          here
        </a> to accept or reject the request
        </p>
        <p>Thanks,<br/>Social Hub - Stay Connected</p>
        </div>
        `;
      await sendEmail({ to: connection.to_user_id.email, subject, body });
    });
    return { message: "Remainder sent" };
  },
);

const deleteStory = inngest.createFunction(
  { id: "story-delete",
     triggers:[{ event: "app/story.delete" }]
   },
  async ({ event, step }) => {
    const { storyId } = event.data;
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("delete-story", async () => {
      await Story.findByIdAndDelete(storyId);
      return { message: "story-deleted." };
    });
  },
);

const sendNotificationofUnseenMessages = inngest.createFunction(
  {
    id: "send-unseen-messages-notification",
    cron: "0 9 * * *",
    timezone: "America/New_York"
  },
  async ({ step }) => {
    const messages = await Message.find({
      seen: false,
    }).populate("to_user_id");

    const unseenCount = {};

    messages.forEach((message) => {
      unseenCount[message.to_user_id._id] =
        (unseenCount[message.to_user_id._id] || 0) + 1;
    });

    for (const userId in unseenCount) {
      const user = await User.findById(userId);
      const total = unseenCount[userId];
      const subject = `🔔 You have ${total} new message${total > 1 ? "s" : ""} 📩`;
      const body = `
          <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
          <h2>👋 Hello ${user.full_name},</h2>
  
           <p>🔔 You have <strong>${unseenCount[userId] || 0}</strong> new message${(unseenCount[userId] || 0) !== 1 ? "s" : ""} waiting for you! 📩</p>
  
            <p>👉 Click below to check your messages and stay connected:</p>
  
            <a href="${process.env.FRONTEND_URL}/messages" 
            style="display:inline-block; padding:10px 15px; background-color:#10b981; color:white; text-decoration:none; border-radius:5px;">
           💬 View Messages
            </a>
  
             <br><br>
  
             <p>✨ Don’t miss out on your conversations!</p>
  
             <p>Thanks & Regards,<br/>💙 SocialHub Team</p>
            </div>
            `;
    await  sendEmail({
      to:user.email,
      subject,
      body,
    })
    }
    return {
      message:'Notification sent.'
    };
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendNewConnectionRequest,
  deleteStory,
  sendNotificationofUnseenMessages
];
