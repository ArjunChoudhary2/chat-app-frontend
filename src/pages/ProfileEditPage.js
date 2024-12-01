import React, { useState } from "react";
import { MdCancelPresentation } from "react-icons/md";

const ProfileEditPage = ({ user, onCancel }) => {
  console.log(user);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    moodStatus: user?.moodStatus || ""
  });
  console.log(formData);
  const [preview, setPreview] = useState(user?.profilePicture || ""); // Preview uploaded image
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);

      try {
        // Prepare form data
        const data = new FormData();
        data.append("file", file);

        // Upload to back-end
        const response = await fetch(`https://localhost:7037/api/Users/${user.id}/uploadProfilePicture`, {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          throw new Error("Failed to upload picture");
        }
        alert('Photo updates successfully!')
      } catch (error) {
        console.error("Error uploading picture:", error);
        alert("Failed to upload the picture.");
      } finally {
        setUploading(false);
      }
    }
  };

  const updateProfile = async () => {
    if(!user) return;
    try{
      const response = await fetch(`https://localhost:7037/api/Users/${user.id}/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }
    catch (error){
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    console.log('submitting')
    e.preventDefault();
    updateProfile();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 text-black">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Mood Status Field */}
          <div>
            <label htmlFor="moodStatus" className="block text-sm font-medium text-gray-700">
              Mood Status
            </label>
            <input
              type="text"
              name="moodStatus"
              id="moodStatus"
              value={formData.moodStatus}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's your current mood?"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
            />
            {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}

          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={onCancel}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none flex justify-between items-center"
             
            >
              <MdCancelPresentation/>  Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={uploading} // Disable if uploading
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
