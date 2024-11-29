import React from "react";
import User from "../images/User.png";
import { BiEdit } from "react-icons/bi";

const ProfileWidget = ({ user }) => {
  const { username, moodStatus, profilePicture } = user;
  return (
    <div className=" h-[75px] bg-gray-950 text-center rounded-lg p-4 w-[99vw] flex justify-center mx-2 my-4">
      <div className="flex justify-between text-white items-center">
        <div className="w-[40px] bg-white rounded-full mr-4">
          <img src={User} alt="avatar" className="w-full" />
        </div>
        <div className=" font-semibold mx-4">
          <h2>Welcome, {username}!</h2>
          <p>Status: {moodStatus}</p>
        </div>
        <div>
            <BiEdit className="text-white text-3xl hover:text-gray-400 cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default ProfileWidget;
