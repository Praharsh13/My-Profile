import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Navbar from "./Navigation";

const Tools = () => {
  const [apps, setApps] = useState([]);
  const carouselRef = useRef();

  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/software/getallsoftware`,
        { withCredentials: true }
      );
      setApps(data.software);
    };
    getMyApps();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="w-full min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white px-4 py-20 overflow-hidden">
    <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-16 tracking-wide drop-shadow-lg">
  Software Tools
</h1>


      <p className="text-center text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto px-4">
        <Typewriter
          options={{
            strings: [
              "These are the tools I use throughout my software development journey.",
              "Each tool represents experience across real-world projects and workflows.",
              "Explore the technologies powering my backend, frontend, and DevOps pipelines.",
            ],
            autoStart: true,
            loop: true,
            delay: 45,
            deleteSpeed: 20,
          }}
        />
      </p>

      <motion.div
        className="flex gap-6 cursor-grab active:cursor-grabbing px-2"
        ref={carouselRef}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {apps.map((app, index) => (
          <motion.div
            key={app._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-800 hover:bg-gray-700 transition-all rounded-2xl p-6 w-60 flex-shrink-0 shadow-xl text-center"
          >
            <img
              src={app.image.url}
              alt={app.softwarename}
              className="h-20 mx-auto mb-4"
            />
            <p className="text-lg text-purple-300 font-semibold truncate">
              {app.softwarename}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </>
  );
 
};

export default Tools;
