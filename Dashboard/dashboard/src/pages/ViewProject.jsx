import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDarkMode } from "@/context/DarkMode.jsx";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState(false);
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const { darkMode } = useDarkMode();

  const { id } = useParams();
  const navigateTo = useNavigate();

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
        setStack(project.stack || project.technologies);
        setTechnologies(project.technologies);
        setDeployed(project.deployed);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectImage?.url);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project");
      }
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ").filter(Boolean);
  const technologiesList = technologies.split(", ").filter(Boolean);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900 p-6">
    <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white transition duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <button
            onClick={() => navigateTo("/")}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Banner */}
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
  <img
    src={projectBanner || "/avatarHolder.jpg"}
    alt="Project Banner"
    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
  />
</div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <ul className="list-disc pl-4 space-y-1">
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {technologiesList.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-2">
            <h2 className="text-2xl font-semibold mb-2">Stack</h2>
            <p>{stack}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-2">
            <h2 className="text-2xl font-semibold mb-2">Deployed</h2>
            <p>{deployed ? "✅ Yes" : "❌ No"}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-2">
            <h2 className="text-2xl font-semibold mb-2">GitHub Repository</h2>
            <a
              href={gitRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline break-words"
            >
              {gitRepoLink}
            </a>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-2">
            <h2 className="text-2xl font-semibold mb-2">Live Project</h2>
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline break-words"
            >
              {projectLink}
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ViewProject;
