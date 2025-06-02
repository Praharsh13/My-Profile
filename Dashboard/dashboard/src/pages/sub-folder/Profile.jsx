import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserCircle,
  Mail,
  Phone,
  Info,
  Link2,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  FileText,
  Image,
} from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const inputClass =
    "w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white";

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h2>
        <p className="text-gray-500 dark:text-gray-400">Full profile preview with your data.</p>
      </div>

      {/* Profile Image & Resume */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
            <Image size={18} /> Profile Image
          </label>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <img
              src={user?.avatar?.url}
              alt="Profile"
              className="w-full h-64 object-cover rounded-xl"
            />
          </motion.div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
            <FileText size={18} /> Resume
          </label>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* <img
              src={user?.resume?.url}
              alt="Resume Preview"
              className="w-full h-64 object-cover rounded-xl"
            /> */}
            <iframe
  src={user?.resume?.url}
  className="w-full h-64 rounded-xl border"
  title="Resume Preview"
></iframe>
          </motion.div>
          <Link
            to={user?.resume?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            View Resume
          </Link>
        </div>
      </div>

      {/* Input fields with icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <UserCircle size={18} />, label: "Full Name", value: user?.userName },
          { icon: <Mail size={18} />, label: "Email", value: user?.email },
          { icon: <Phone size={18} />, label: "Phone", value: user?.contact },
          {
            icon: <Info size={18} />,
            label: "About Me",
            value: user?.aboutMe,
            type: "textarea",
            colSpan: true,
          },
          { icon: <Link2 size={18} />, label: "Portfolio URL", value: user?.portfolioURL },
          { icon: <Github size={18} />, label: "GitHub URL", value: user?.githubURL },
          { icon: <Linkedin size={18} />, label: "LinkedIn URL", value: user?.linkInURL },
          { icon: <Instagram size={18} />, label: "Instagram URL", value: user?.instagramURL },
          { icon: <Twitter size={18} />, label: "Twitter (X) URL", value: user?.xURL },
          { icon: <Facebook size={18} />, label: "Facebook URL", value: user?.facebookURL },
        ].map(({ icon, label, value, type, colSpan }) => (
          <div key={label} className={colSpan ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
              {icon} {label}
            </label>
            {type === "textarea" ? (
              <textarea className={`${inputClass} resize-none`} rows="4" value={value} disabled />
            ) : (
              <input className={inputClass} value={value} disabled />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;