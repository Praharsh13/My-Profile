// import {
//     ExternalLink,
//     Github,
//     Linkedin,
//     Mail,
//   } from "lucide-react";
//   import { useEffect, useState } from "react";
//   import { Link, useLocation } from "react-router-dom";
//   import { Typewriter } from "react-simple-typewriter";
//   import axios from "axios";
//   import Navbar from "./Navigation";
  
//   const AboutMe = () => {
//     const [user, setUser] = useState({});
//     const location = useLocation();
  
//     useEffect(() => {
//       const getProfile = async () => {
//         try {
//           const { data } = await axios.get(
//             "http://localhost:3201/api/v1/user/getuser",
//             { withCredentials: true }
//           );
//           setUser(data.user);
//         } catch (error) {
//           console.error("Failed to load profile", error);
//         }
//       };
  
//       getProfile();
//     }, []);
  
//     const isHomePage = location.pathname === "/";
  
//     return (
//       <>
//         <Navbar />
  
//         <div className="w-full min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white flex flex-col items-center pt-32 px-6">
//           <div className="max-w-3xl text-center">
//             <div className="flex items-center gap-2 justify-center mb-4">
//               <span className="bg-green-500 rounded-full h-2 w-2"></span>
//               <p className="text-sm text-gray-400">Available for work</p>
//             </div>
  
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-purple-400 drop-shadow-lg animate-bounce">
//               Welcome to My Profile
//             </h1>
  
//             <h2 className="text-xl md:text-2xl lg:text-3xl text-purple-300 tracking-widest mb-6">
//               <Typewriter
//                 words={[
//                   "MERN Stack Developer",
//                   "Problem Solver",
//                   "DevOps Enthusiast",
//                 ]}
//                 loop={50}
//                 cursor
//                 typeSpeed={70}
//                 deleteSpeed={50}
//                 delaySpeed={1000}
//               />
//             </h2>
  
//             <div className="flex justify-center gap-6 flex-wrap mt-6 mb-10">
//               {user.linkInURL && (
//                 <a
//                   href={user.linkInURL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="LinkedIn"
//                 >
//                   <Linkedin className="text-blue-500 hover:scale-110 transition-transform w-7 h-7" />
//                 </a>
//               )}
//               {user.githubURL && (
//                 <a
//                   href={user.githubURL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="GitHub"
//                 >
//                   <Github className="hover:scale-110 transition-transform w-7 h-7" />
//                 </a>
//               )}
//               {user.email && (
//                 <a
//                   href={`mailto:${user.email}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Email"
//                 >
//                   <Mail className="hover:scale-110 transition-transform w-7 h-7" />
//                 </a>
//               )}
//             </div>
  
//             <div className="flex justify-center gap-6 mt-4 flex-wrap">
//               {user.githubURL && (
//                 <a
//                   href={user.githubURL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="GitHub Button"
//                 >
//                   <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2 shadow-lg">
//                     <Github className="w-5 h-5" />
//                     Github
//                   </button>
//                 </a>
//               )}
  
//               {user.resume?.url && (
//                 <a
//                   href={user.resume.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Resume Button"
//                 >
//                   <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2 shadow-lg">
//                     <ExternalLink className="w-5 h-5" />
//                     Resume
//                   </button>
//                 </a>
//               )}
//             </div>
  
//             {user.aboutMe && (
//               <p className="mt-10 text-lg leading-relaxed text-gray-300 px-4">
//                 {user.aboutMe}
//               </p>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   };
  
//   export default AboutMe;
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Phone
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./Navigation";

const AboutMe = () => {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/getuser`,
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    getProfile();
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <>
  <Navbar />

  <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4 py-6">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative bg-gray-900 border border-gray-700 shadow-2xl rounded-xl w-full max-w-6xl h-full flex flex-col items-center justify-center p-8 overflow-y-auto"
    >
      {/* Terminal window controls */}
      <div className="absolute top-4 left-6 flex gap-2">
        <span className="h-3 w-3 bg-red-500 rounded-full"></span>
        <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
        <span className="h-3 w-3 bg-green-500 rounded-full"></span>
      </div>

      <div className="w-full text-center mt-12">
        {/* Availability */}
        <div className="flex items-center gap-2 justify-center mb-4">
          <span className="bg-green-500 rounded-full h-2 w-2"></span>
          <p className="text-sm text-gray-400">Available for work</p>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-3">
          Hello, I'm <span className="text-white">{user.userName}</span>
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-300 mt-2">
          A passionate <span className="text-purple-300 font-semibold">Software Developer</span> with 4+ years of experience.<br />
          I build scalable full-stack apps, automate workflows, and ship production-ready code.
        </p>

        {/* Typewriter */}
        <h2 className="text-xl md:text-2xl mt-6 text-purple-300 tracking-wide">
          <Typewriter
            words={["MERN Stack Developer", "Problem Solver", "Full Stack JS Developer"]}
            loop={false}
            cursor
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 flex-wrap mt-8 mb-6">
  {/* LinkedIn */}
  {user.linkInURL && (
    <a href={user.linkInURL} target="_blank" rel="noopener noreferrer">
      <Linkedin className="text-blue-500 hover:scale-110 transition-transform w-7 h-7" />
    </a>
  )}

  {/* Instagram */}
  {user.instagramURL && (
    <a href={user.instagramURL} target="_blank" rel="noopener noreferrer">
      <Instagram className="text-pink-500 hover:scale-110 transition-transform w-7 h-7" />
    </a>
  )}

  {/* Email */}
  {user.email && (
    <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
      <Mail className="text-red-400 hover:scale-110 transition-transform w-7 h-7" />
    </a>
  )}

  {/* Contact Number */}
  {user.contact && (
    <a href={`tel:${user.contact}`}>
      <Phone className="text-green-400 hover:scale-110 transition-transform w-7 h-7" />
    </a>
  )}
</div>


        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
          {user.githubURL && (
            <a href={user.githubURL} target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 ring-2 ring-transparent hover:ring-purple-400">
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </a>
          )}
          {user.resume?.url && (
            <a href={user.resume.url} target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 ring-2 ring-transparent hover:ring-purple-400">
                <ExternalLink className="w-5 h-5" />
                Resume
              </button>
            </a>
          )}
        </div>

        {/* About Me */}
        {user.aboutMe && (
          <pre className="bg-gray-800 p-5 mt-10 rounded-lg text-green-400 text-sm font-mono leading-relaxed border border-gray-700 whitespace-pre-wrap">
            {user.aboutMe}
          </pre>
        )}

        
      </div>
    </motion.div>
  </div>
</>

  );
};

export default AboutMe;
