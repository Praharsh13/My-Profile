// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Dialog } from "@headlessui/react";
// import {
//   CodeBracketSquareIcon,
//   ServerStackIcon,
//   CloudIcon,
//   Squares2X2Icon,
//   Cog6ToothIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";
// import Navbar from "./Navigation";

// const categoryData = [
//   { key: "frontend", label: "Frontend", icon: CodeBracketSquareIcon },
//   { key: "backend", label: "Backend", icon: ServerStackIcon },
//   { key: "cloud", label: "Cloud", icon: CloudIcon },
//   { key: "database", label: "Database", icon: Squares2X2Icon },
//   { key: "devops", label: "DevOps", icon: Cog6ToothIcon },
// ];

// const SkillModal = ({ isOpen, onClose, skill }) => (
//   <Dialog open={isOpen} onClose={onClose} className="relative z-50">
//     <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
//     <div className="fixed inset-0 flex items-center justify-center p-4">
//       <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md dark:bg-gray-900">
//         <Dialog.Title className="text-2xl font-extrabold mb-4 text-purple-600">
//           {skill?.name}
//         </Dialog.Title>
//         <div className="text-gray-800 dark:text-gray-300 space-y-3 text-base">
//           <p>
//             <strong>Proficiency:</strong> {skill?.profiency}
//           </p>
//           <p>
//             <strong>Tech Type:</strong>{" "}
//             <span className="capitalize">{skill?.type}</span>
//           </p>
//           <p className="italic text-sm text-gray-500 dark:text-gray-400">
//             Project/Experience links can be integrated here.
//           </p>
//         </div>
//         <button
//           onClick={onClose}
//           className="mt-6 w-full py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
//         >
//           Close
//         </button>
//       </Dialog.Panel>
//     </div>
//   </Dialog>
// );

// const Skills = () => {
//   const [skills, setSkills] = useState([]);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("frontend");

//   useEffect(() => {
//     const getMySkills = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:3201/api/v1/skill/getallskill",
//           { withCredentials: true }
//         );
//         setSkills(data.skill || []);
//       } catch (error) {
//         console.error("Failed to fetch skills:", error);
//       }
//     };
//     getMySkills();
//   }, []);

//   const getColor = (proficiency) => {
//     const level = parseInt(proficiency.replace(/[^0-9]/g, ""));
//     if (level >= 80) return "stroke-green-500 text-green-500";
//     if (level >= 50) return "stroke-yellow-400 text-yellow-400";
//     return "stroke-red-500 text-red-500";
//   };

//   const IconButton = ({ icon: Icon, label, active, onClick }) => (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-lg
//         transition
//         ${
//           active
//             ? "bg-purple-600 text-white shadow-lg"
//             : "bg-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white"
//         }
//         `}
//       aria-label={label}
//     >
//       <Icon className="w-6 h-6" />
//       {label}
//     </button>
//   );

//   return (
//     <>
//     <Navbar/>
//     <div className="w-full min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white px-6 py-20">
//       <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-16 tracking-wide drop-shadow-lg">
//         Technical Skills
//       </h1>

//       {/* Navigation Tabs */}
//       <nav className="flex justify-center gap-6 mb-16 flex-wrap">
//         {categoryData.map(({ key, label, icon }) => (
//           <IconButton
//             key={key}
//             icon={icon}
//             label={label}
//             active={activeCategory === key}
//             onClick={() => setActiveCategory(key)}
//           />
//         ))}
//       </nav>

//       {/* Skills Carousel */}
//       <div className="flex overflow-x-auto gap-8 scrollbar-thin scrollbar-thumb-purple-600 py-4">
//         {skills
//           .filter((skill) => skill.type === activeCategory)
//           .map((skill, index) => (
//             <motion.div
//               key={skill._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="relative bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 w-60 flex-shrink-0 shadow-lg cursor-pointer group"
//               onClick={() => setSelectedSkill(skill)}
//               title={skill.name}
//             >
//               <img
//                 src={skill.image.url}
//                 alt={skill.name}
//                 className="h-20 mx-auto mb-4 object-contain"
//               />
//               <h3 className="text-xl text-center font-semibold mb-3 tracking-wide">
//                 {skill.name}
//               </h3>

//               {/* Circular progress indicator */}
//               <div className="relative w-24 h-24 mx-auto mb-2">
//                 <svg
//                   className="absolute top-0 left-0 w-full h-full"
//                   viewBox="0 0 36 36"
//                 >
//                   <path
//                     className="text-gray-700 stroke-current"
//                     strokeWidth="3"
//                     fill="none"
//                     d="M18 2.0845
//                       a 15.9155 15.9155 0 0 1 0 31.831
//                       a 15.9155 15.9155 0 0 1 0 -31.831"
//                   />
//                   <path
//                     className={getColor(skill.profiency)}
//                     strokeWidth="3"
//                     strokeDasharray={`${parseInt(skill.profiency)} 100`}
//                     strokeLinecap="round"
//                     fill="none"
//                     d="M18 2.0845
//                       a 15.9155 15.9155 0 0 1 0 31.831
//                       a 15.9155 15.9155 0 0 1 0 -31.831"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center font-bold text-purple-400 text-lg">
//                   {skill.profiency}
//                 </div>
//               </div>

//               <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <InformationCircleIcon className="w-6 h-6 text-purple-400" />
//               </div>
//             </motion.div>
//           ))}

//         {/* If no skills found for the category */}
//         {skills.filter((skill) => skill.type === activeCategory).length === 0 && (
//           <p className="text-gray-400 italic text-xl mx-auto">
//             No skills found in {activeCategory}.
//           </p>
//         )}
//       </div>

//       {/* Skill Detail Modal */}
//       {selectedSkill && (
//         <SkillModal
//           isOpen={!!selectedSkill}
//           onClose={() => setSelectedSkill(null)}
//           skill={selectedSkill}
//         />
//       )}
//     </div>
//     </>
//   );
// };

// export default Skills;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navigation";

import {
  Code,
  Server,
  Cloud,
  Database,
  Settings,
  Info,
} from "lucide-react";

const categoryData = [
  { key: "frontend", label: "Frontend", icon: Code },
  { key: "backend", label: "Backend", icon: Server },
  { key: "cloud", label: "Cloud", icon: Cloud },
  { key: "database", label: "Database", icon: Database },
  { key: "devops", label: "DevOps", icon: Settings },
];

const SkillModal = ({ isOpen, onClose, skill }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-6">
      <Dialog.Panel className="bg-gray-900 rounded-xl p-8 w-full max-w-lg shadow-xl border border-purple-700">
        <Dialog.Title className="text-3xl font-extrabold text-purple-500 mb-6">
          {skill?.name}
        </Dialog.Title>
        <div className="text-gray-300 space-y-4 text-lg">
          <p>
            <span className="font-semibold">Proficiency:</span> {skill?.profiency}
          </p>
          <p>
            <span className="font-semibold">Category:</span>{" "}
            <span className="capitalize">{skill?.type}</span>
          </p>
          <p className="italic text-sm text-gray-500">
            Project/Experience links can be integrated here.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
        >
          Close
        </button>
      </Dialog.Panel>
    </div>
  </Dialog>
);

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState("frontend");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/skill/getallskill`,
          { withCredentials: true }
        );
        setSkills(data.skill || []);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkills();
  }, []);

  // Color coding proficiency levels
  const getColor = (profiency) => {
    const level = parseInt(profiency.replace(/[^0-9]/g, ""));
    if (level >= 80) return "stroke-green-400 text-green-400";
    if (level >= 50) return "stroke-yellow-400 text-yellow-400";
    return "stroke-red-500 text-red-500";
  };

  const IconButton = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-lg transition
        ${
          active
            ? "bg-purple-600 text-white shadow-lg"
            : "bg-gray-800 text-gray-400 hover:bg-purple-600 hover:text-white"
        }`}
      aria-label={label}
      type="button"
    >
      <Icon className="w-6 h-6" />
      {label}
    </button>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white px-8 py-20 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-16 tracking-wide drop-shadow-lg">
          Technical Skills
        </h1>

        {/* Category Tabs */}
        <nav className="flex justify-center gap-8 mb-20 flex-wrap max-w-4xl">
          {categoryData.map(({ key, label, icon }) => (
            <IconButton
              key={key}
              icon={icon}
              label={label}
              active={activeCategory === key}
              onClick={() => setActiveCategory(key)}
            />
          ))}
        </nav>

        {/* Skill Cards */}
        <div className="flex overflow-x-auto gap-8 scrollbar-thin scrollbar-thumb-purple-600 py-4 max-w-full px-2">
          {skills.filter((skill) => skill.type === activeCategory).length === 0 ? (
            <p className="text-gray-400 italic text-xl mx-auto">
              No skills found in {activeCategory}.
            </p>
          ) : (
            skills
              .filter((skill) => skill.type === activeCategory)
              .map((skill, i) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-gray-800 hover:bg-gray-700 rounded-3xl p-6 w-60 flex-shrink-0 shadow-xl cursor-pointer group border border-transparent hover:border-purple-500 transition"
                  onClick={() => setSelectedSkill(skill)}
                  title={skill.name}
                >
                  <img
                    src={skill.image.url}
                    alt={skill.name}
                    className="h-20 mx-auto mb-5 object-contain"
                  />
                  <h3 className="text-xl text-center font-semibold mb-3 tracking-wide">
                    {skill.name}
                  </h3>

                  {/* Circular Progress */}
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg
                      className="absolute top-0 left-0 w-full h-full"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-gray-700 stroke-current"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={getColor(skill.profiency)}
                        strokeWidth="3"
                        strokeDasharray={`${parseInt(skill.profiency)} 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-purple-400 text-lg select-none">
                      {skill.profiency}
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info className="w-6 h-6 text-purple-400" />
                  </div>
                </motion.div>
              ))
          )}
        </div>

        {/* Skill Modal */}
        {selectedSkill && (
          <SkillModal
            isOpen={!!selectedSkill}
            onClose={() => setSelectedSkill(null)}
            skill={selectedSkill}
          />
        )}
      </div>
    </>
  );
};

export default Skills;
