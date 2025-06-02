import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [userName, setuserName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || "");
  const [linkInURL, setLinkedInURL] = useState(user?.linkInURL || "");
  const [githubURL, setGithubURL] = useState(user?.githubURL || "");
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || "");
  const [xURL, setxURL] = useState(user?.xURL || "");
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [resume, setResume] = useState(user?.resume?.url || "");
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  const dispatch = useDispatch();

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      type === "avatar" ? setAvatarPreview(reader.result) : setResumePreview(reader.result);
      type === "avatar" ? setAvatar(file) : setResume(file);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkInURL", linkInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("xURL", xURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Update Profile</h1>
      <p className="text-gray-500 mb-6">Update your details below.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile + Resume */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <motion.img
              src={avatarPreview || "/avatarHolder.jpg"}
              alt="Profile"
              className="rounded-xl w-full h-64 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "avatar")}
              className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF/Image)</label>
            <a href={user?.resume?.url} target="_blank" rel="noopener noreferrer">
              <motion.img
                src={resumePreview }
                alt="Resume"
                className="rounded-xl w-full h-64 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleImageUpload(e, "resume")}
              className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {[
            { label: "Full Name", state: userName, setter: setuserName },
            { label: "Email", state: email, setter: setEmail },
            { label: "Phone", state: contact, setter: setContact },
            { label: "Portfolio URL", state: portfolioURL, setter: setPortfolioURL },
            { label: "LinkedIn URL", state: linkInURL, setter: setLinkedInURL },
            { label: "GitHub URL", state: githubURL, setter: setGithubURL },
            { label: "Instagram URL", state: instagramURL, setter: setInstagramURL },
            { label: "Twitter URL", state: xURL, setter: setxURL },
            { label: "Facebook URL", state: facebookURL, setter: setFacebookURL },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type="text"
                value={field.state}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
