// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaGithub } from "react-icons/fa";
// import Typewriter from "typewriter-effect";

// const Project = () => {
//   const [viewAll, setViewAll] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [expandedDesc, setExpandedDesc] = useState({});

//   useEffect(() => {
//     const getMyProjects = async () => {
//       const { data } = await axios.get(
//         "http://localhost:3201/api/v1/project/getallproject",
//         { withCredentials: true }
//       );
//       setProjects(data.project);
//     };
//     getMyProjects();
//   }, []);

//   const toggleDesc = (id) => {
//     setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="w-full min-h-screen px-6 py-16 bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white">
//       <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-4 tracking-wide drop-shadow-lg">
//         My Projects
//       </h1>

//       <div className="text-center mb-16 text-lg text-gray-300 max-w-3xl mx-auto">
//         <Typewriter
//           options={{
//             strings: ["Explore the projects I've built throughout my software journey."],
//             autoStart: true,
//             loop: true,
//             delay: 40,
//             deleteSpeed: 20,
//           }}
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {(viewAll ? projects : projects.slice(0, 6)).map((project, index) => (
//           <motion.div
//             key={project._id}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1, duration: 0.5 }}
//             className="bg-gray-800 rounded-2xl shadow-lg group overflow-hidden"
//           >
//             {/* Tilted image */}
//             <motion.div
//               whileHover={{ rotateX: 5, rotateY: 5 }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               className="cursor-pointer"
//             >
//               <img
//                 src={project.projectImage?.url}
//                 alt={project.title}
//                 className="w-full h-52 object-cover rounded-t-2xl"
//               />
//             </motion.div>

//             {/* Hover content shown only on that card */}
//             <div className="transition-all duration-300 max-h-0 group-hover:max-h-[500px] group-hover:py-5 opacity-0 group-hover:opacity-100 px-5 overflow-hidden">
//               <h2 className="text-xl font-bold text-purple-400 mb-2">
//                 {project.title}
//               </h2>
//               <p className="text-sm text-gray-200">
//                 {expandedDesc[project._id] || project.description.length <= 120
//                   ? project.description
//                   : `${project.description.substring(0, 120)}...`}
//                 {project.description.length > 120 && (
//                   <button
//                     className="text-purple-400 text-xs ml-2 underline"
//                     onClick={() => toggleDesc(project._id)}
//                   >
//                     {expandedDesc[project._id] ? "Show Less" : "Show More"}
//                   </button>
//                 )}
//               </p>

//               <div className="flex justify-between mt-4">
//                 <Link
//                   to={`/project/${project._id}`}
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
//                 >
//                   View Project
//                 </Link>

//                 {project.gitRepoLink && (
//                   <a
//                     href={project.gitRepoLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm"
//                   >
//                     <FaGithub className="text-lg" />
//                     GitHub
//                   </a>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {projects.length > 6 && (
//         <div className="text-center mt-12">
//           <button
//             className="px-6 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-full transition"
//             onClick={() => setViewAll((prev) => !prev)}
//           >
//             {viewAll ? "Show Less" : "Show More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Project;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Navbar from "./Navigation";

const Project = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [expandedDesc, setExpandedDesc] = useState({});

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/project/getallproject`,
          { withCredentials: true }
        );
        setProjects(data.project);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    getMyProjects();
  }, []);

  const toggleDesc = (id) => {
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
   <Navbar />
  <div className="w-full min-h-screen px-6 py-16 bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white">

    <div className="text-center mb-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-xl tracking-wide">
      <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 ">
    My
  </span>{" "}
        <span className="text-white">Projects</span>
      </h1>
    </div>

    <div className="text-center mb-16 text-lg text-gray-300 max-w-3xl mx-auto">
      <Typewriter
        options={{
          strings: [
            "A collection of work showcasing design, development, and deployment. From concept to code — these are the projects I’m proud of.",
          ],
          autoStart: true,
          loop: true,
          delay: 40,
          deleteSpeed: 20,
        }}
      />
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {(viewAll ? projects : projects.slice(0, 6)).map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative bg-[#1e1e1e] border border-gray-700 rounded-xl overflow-hidden group shadow-xl"
          >
             {project.projectLink && (
    <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md animate-pulse z-10">
      LIVE
    </div>
  )}
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="cursor-pointer"
            >
              <img
                src={project.projectImage?.url}
                alt={project.title}
                className="w-full h-52 object-cover"
              />
            </motion.div>

            {/* Bottom Reveal */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-90 translate-y-full group-hover:translate-y-0 transition-all duration-500 px-5 py-5 space-y-4">
              <h2 className="text-xl font-bold text-purple-400">{project.title}</h2>
              <p className="text-sm text-gray-200">
                {expandedDesc[project._id] || project.description.length <= 120
                  ? project.description
                  : `${project.description.substring(0, 120)}...`}
                {project.description.length > 120 && (
                  <button
                    onClick={() => toggleDesc(project._id)}
                    className="ml-2 text-purple-400 underline text-xs"
                  >
                    {expandedDesc[project._id] ? "Show Less" : "Show More"}
                  </button>
                )}
              </p>

              <div className="flex justify-between items-center mt-2">
                <Link
                  to={`/project/${project._id}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  View Project
                </Link>

                {project.gitRepoLink && (
                  <a
                    href={project.gitRepoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    <FaGithub className="text-lg" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {projects.length > 6 && (
        <div className="text-center mt-12">
          <button
            onClick={() => setViewAll((prev) => !prev)}
            className="px-6 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 rounded-full transition"
          >
            {viewAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Project;
