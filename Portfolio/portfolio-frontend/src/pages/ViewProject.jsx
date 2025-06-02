// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

// const ViewProject = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [technologies, setTechnologies] = useState("");
//   const [stack, setStack] = useState("");
//   const [gitRepoLink, setGitRepoLink] = useState("");
//   const [deployed, setDeployed] = useState("");
//   const [projectLink, setProjectLink] = useState("");
//   const [projectBannerPreview, setProjectBannerPreview] = useState("");

//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProject = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3201/api/v1/project/getproject/${id}`,
//           { withCredentials: true }
//         );
//         const project = res.data.project;
//         setTitle(project.title);
//         setDescription(project.description);
//         setStack(project.stack);
//         setDeployed(project.deployed);
//         setTechnologies(project.technologies);
//         setGitRepoLink(project.gitRepoLink);
//         setProjectLink(project.projectLink || "");
//         setProjectBannerPreview(project.projectImage?.url);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to load project");
//       }
//     };
//     getProject();
//   }, [id]);

//   const descriptionList = description.split(". ").filter((d) => d);
//   const technologiesList = technologies.split(", ").filter((t) => t);

//   return (
//     <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="max-w-5xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-8"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-4xl font-extrabold text-purple-400 drop-shadow-md">
//             {title}
//           </h1>
//           <button
//             onClick={() => navigate("/projects")}
//             className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl transition text-sm"
//           >
//             <FaArrowLeft /> Return
//           </button>
//         </div>

//         <div className="w-full">
//           <img
//             src={projectBannerPreview || "/avatarHolder.jpg"}
//             alt="Project Banner"
//             className="w-full h-64 object-cover rounded-2xl shadow-md"
//           />
//         </div>

//         <div className="space-y-6 text-lg">
//           <section>
//             <h2 className="text-2xl font-bold mb-2 text-purple-300">
//               Description:
//             </h2>
//             <ul className="list-disc list-inside space-y-1">
//               {descriptionList.map((line, idx) => (
//                 <li key={idx}>{line}</li>
//               ))}
//             </ul>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold mb-2 text-purple-300">
//               Technologies Used:
//             </h2>
//             <ul className="flex flex-wrap gap-3 text-sm">
//               {technologiesList.map((tech, idx) => (
//                 <li
//                   key={idx}
//                   className="bg-purple-700 px-3 py-1 rounded-full shadow-sm"
//                 >
//                   {tech}
//                 </li>
//               ))}
//             </ul>
//           </section>

//           <section>
//             <h2 className="text-2xl font-bold mb-2 text-purple-300">Stack:</h2>
//             <p>{stack}</p>
//           </section>

//           <section>
//   <h2 className="text-2xl font-bold mb-2 text-purple-300">
//     Deployment:
//   </h2>
//   <p>{deployed ? "Yes" : "No"}</p>
// </section>


//           <section className="flex flex-col sm:flex-row gap-5 mt-4">
//             {gitRepoLink && (
//               <a
//                 href={gitRepoLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm"
//               >
//                 <FaGithub /> GitHub Repository
//               </a>
//             )}

//             {projectLink && (
//               <a
//                 href={projectLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg transition text-sm"
//               >
//                 <FaExternalLinkAlt /> Live Project
//               </a>
//             )}
//           </section>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ViewProject;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState(false);
  const [projectLink, setProjectLink] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/project/getproject/${id}`,
          { withCredentials: true }
        );
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setDeployed(project.deployed);
        setProjectLink(project.projectLink || "");
        setProjectBannerPreview(project.projectImage?.url);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      }
    };
    getProject();
  }, [id]);

  // Format description as code-like multiline block
  const formatDescription = (desc) => {
    if (!desc) return "No description available.";
    return desc
      .split(". ")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `  ${line.endsWith(".") ? line : line + "."}`)
      .join("\n");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-12 flex justify-center items-start">
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative w-full max-w-7xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-10 pt-16"
>
        {/* Terminal Dots */}
        <div className="absolute top-8 left-8 flex gap-3 z-50">
          <span className="h-3 w-3 bg-red-500 rounded-full shadow-lg"></span>
          <span className="h-3 w-3 bg-yellow-500 rounded-full shadow-lg"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full shadow-lg"></span>
        </div>
      
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-5xl font-extrabold text-purple-400 drop-shadow-lg">
            {title || "Project Title"}
          </h1>
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-3 px-6 py-3 bg-purple-700 hover:bg-purple-800 rounded-xl transition font-semibold"
          >
            <FaArrowLeft size={20} /> Return to Projects
          </button>
        </div>

        {/* Project Banner */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg max-h-72">
          <img
            src={projectBannerPreview || "/avatarHolder.jpg"}
            alt="Project Banner"
            className="w-full object-cover object-center"
          />
        </div>

        {/* Description */}
        <section>
  <h2 className="text-3xl font-bold mb-4 text-purple-300">Description</h2>
  <ul
    className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono leading-relaxed shadow-inner list-disc list-inside space-y-2"
    style={{ paddingLeft: "1.2em" }} // adjust to bullet size
  >
    {description
      ? description
          .split(". ")
          .filter(Boolean)
          .map((line, idx) => (
            <li
              key={idx}
              style={{
                textIndent: "-1.2em",
                paddingLeft: "1.2em",
              }}
            >
              {line.endsWith(".") ? line : line + "."}
            </li>
          ))
      : <li>No description available.</li>
    }
  </ul>
</section>

        {/* Technologies Used */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {technologies
              ? technologies.split(",").map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-700 px-4 py-2 rounded-full shadow-md text-sm font-semibold"
                  >
                    {tech.trim()}
                  </span>
                ))
              : (
                <p className="text-gray-400 italic">No technologies specified.</p>
              )}
          </div>
        </section>

        {/* Links */}
        <section className="flex flex-col md:flex-row items-center gap-6 mt-8">
          {/* Live Project Link - only if deployed & projectLink exists */}
          {deployed && projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
              Visit Project <FaExternalLinkAlt />
            </a>
          )}

          {/* GitHub Repo */}
          {gitRepoLink ? (
            <a
              href={gitRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
              <FaGithub size={18} /> GitHub Repo
            </a>
          ) : (
            <span className="text-gray-400 italic">No GitHub repository link.</span>
          )}
        </section>
      </motion.div>
    </div>
  );
};

export default ViewProject;
