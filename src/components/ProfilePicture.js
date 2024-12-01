import React, { useEffect, useState } from "react";

const ProfilePicture = ({ userId }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(`https://localhost:7037/api/users/user/picture/${userId}`);
        if (response.ok) {
          const imageBlob = await response.blob();
          console.log(imageBlob);
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setProfilePicture(imageObjectURL);
        } else {
          console.error("Error fetching profile picture");
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [userId]);

  return (
    <div>
      {profilePicture ? (
        <img src={profilePicture} alt="User Profile" width={35} className="rounded-full mx-4" />
      ) : (
        <p>Loading profile picture...</p>
      )}
    </div>
  );
};

export default ProfilePicture;
