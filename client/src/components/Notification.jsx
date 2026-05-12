import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Notification = ({ t, message }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm w-full bg-blue-50/70 backdrop-blur-md shadow-sm rounded-2xl flex border border-blue-100 hover:shadow-md hover:scale-[1.02] transition-all duration-200">

      <div className="flex p-3 w-full items-start">

        <img
          src={message.from_user_id.profile_picture}
          alt=""
          className="h-10 w-10 rounded-full shrink-0 mt-0.5 object-cover ring-2 ring-blue-100"
        />

        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-gray-800">
            {message.from_user_id.full_name}
          </p>

          <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
            {message.text?.slice(0, 50)}
          </p>

          <p className="text-xs text-blue-400 mt-1">
            New message
          </p>
        </div>
      </div>

      <div className="flex items-center pr-3">
        <button
          onClick={() => {
            navigate(`/messages/${message.from_user_id._id}`);
            toast.dismiss(t.id);
          }}
          className="px-3 py-1.5 rounded-full text-blue-600 font-medium text-sm hover:bg-blue-100 transition"
        >
          Reply
        </button>
      </div>

    </div>
  );
};

export default Notification;