import React, { useState } from "react";
import User from "../images/User.png";
import { BiEdit } from "react-icons/bi";
import ProfileEditPage from "../pages/ProfileEditPage";
import ProfilePicture from "./ProfilePicture";

const ProfileWidget = ({ user, onUpdate }) => {
  const { username, moodStatus } = user;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-gray-950 text-white p-4 rounded-lg w-full">
      {!isEditing ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ProfilePicture userId={user?.id}/>
            <div>
              <h2 className="text-lg font-semibold">Welcome, {username}!</h2>
              <p className="text-sm">Status: {moodStatus}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500 flex items-center"
          >
            <BiEdit className="mr-2" />
            Edit Profile
          </button>
        </div>
      ) : (
        <ProfileEditPage
          user={user}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ProfileWidget;
