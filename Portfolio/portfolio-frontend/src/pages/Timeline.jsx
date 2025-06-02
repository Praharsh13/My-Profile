// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Navbar from "./Navigation";

// const Timeline = () => {
//   const [timeline, setTimeline] = useState([]);
//   const [activeTab, setActiveTab] = useState("education");

//   useEffect(() => {
//     const getMyTimeline = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:3201/api/v1/timeline/allTimeline",
//           { withCredentials: true }
//         );
//         setTimeline(data.timeline || []);
//       } catch (error) {
//         console.error("Error fetching timeline:", error);
//       }
//     };
//     getMyTimeline();
//   }, []);

//   const sortedTimeline = (timeline || [])
//     .filter((item) => item.contenttype === activeTab)
//     .sort((a, b) => {
//       const yearA = parseInt(a.timeline.from?.split("-")[0]) || 0;
//       const yearB = parseInt(b.timeline.from?.split("-")[0]) || 0;
//       return yearA - yearB;
//     });

//   const icon = activeTab === "education" ? "🎓" : "💼";

//   return (
//     <>
//       <Navbar />
//       <div className="w-full min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white flex flex-col items-center pt-32 px-6">
//         <div className="max-w-5xl w-full">
//           <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-400 drop-shadow-lg">
//             My Journey
//           </h1>

//           {/* Tabs */}
//           <div className="flex justify-center gap-6 mb-12">
//             {["education", "experience"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setActiveTab(type)}
//                 className={`px-6 py-2 rounded-full text-lg font-semibold transition duration-300 border ${
//                   activeTab === type
//                     ? "bg-purple-600 text-white border-purple-600 shadow-xl"
//                     : "bg-gray-100 text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//                 }`}
//               >
//                 {type === "education" ? "🎓 Education" : "💼 Experience"}
//               </button>
//             ))}
//           </div>

//           {/* Timeline */}
//           <div className="relative border-l-4 border-purple-600 pl-10">
//             {sortedTimeline.map((item, index) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="mb-14 relative"
//               >
//                 {/* Dot with icon */}
//                 <div className="absolute -left-12 top-2 w-10 h-10 flex items-center justify-center text-2xl bg-purple-600 text-white rounded-full border-4 border-white dark:border-black shadow-lg">
//                   {icon}
//                 </div>

//                 <div className="pl-2">
//                   <h3 className="text-2xl font-semibold mb-1 text-white">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-gray-400 mb-2">
//                     {item.timeline.from} – {item.timeline.to || "Present"} ·{" "}
//                     <span className="italic">{item.location}</span>
//                   </p>
//                   <p className="text-gray-200 leading-relaxed">{item.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Timeline;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navigation";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState("education");

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/timeline/allTimeline`,
          { withCredentials: true }
        );
        setTimeline(data.timeline || []);
      } catch (error) {
        console.error("Error fetching timeline:", error);
      }
    };
    getMyTimeline();
  }, []);

  const sortedTimeline = (timeline || [])
    .filter((item) => item.contenttype === activeTab)
    .sort((a, b) => {
      const dateA = new Date(a.timeline.from);
      const dateB = new Date(b.timeline.from);
      return dateB - dateA; // Recent to old
    });

  const icon = activeTab === "education" ? "🎓" : "💼";

  return (
    <>
      <Navbar />
      <div className="w-screen min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gray-900 border border-purple-800 rounded-xl w-full max-w-6xl h-full overflow-y-auto p-8 shadow-2xl"
        >
          {/* Terminal Window Controls */}
          <div className="absolute top-3 left-4 flex gap-2">
            <span className="h-3 w-3 bg-red-500 rounded-full"></span>
            <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-400 mt-6">
  {activeTab === "education" 
    ? "Building a Strong Academic Foundation" 
    : "Driving Success Through Professional Experience"}
</h1>

          {/* Tabs */}
          <div className="flex justify-center gap-6 mb-12">
            {["education", "experience"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-6 py-2 rounded-full text-lg font-semibold transition duration-300 border ${
                  activeTab === type
                    ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                    : "bg-gray-100 text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                }`}
              >
                {type === "education" ? "🎓 Education" : "💼 Experience"}
              </button>
            ))}
          </div>

          {/* Timeline Entries */}
          <div className="relative border-l-4 border-purple-600 pl-10">
            {sortedTimeline.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-14 relative"
              >
                {/* Dot with icon */}
                <div className="absolute -left-12 top-2 w-10 h-10 flex items-center justify-center text-2xl bg-purple-600 text-white rounded-full border-4 border-white dark:border-black shadow-lg">
                  {icon}
                </div>

                <div className="bg-gray-800 border border-purple-700 rounded-lg p-5 shadow-md">
                  <h3 className="text-2xl font-bold mb-1 text-purple-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {item.timeline.from} – {item.timeline.to || "Present"} ·{" "}
                    <span className="italic">{item.location}</span>
                  </p>
                  <p className="text-gray-200 leading-relaxed text-base font-mono">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Timeline;
