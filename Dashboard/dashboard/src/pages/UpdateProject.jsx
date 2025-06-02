import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingButton from "./sub-folder/loader";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";
import { useDarkMode } from "@/context/DarkMode.jsx";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const { darkMode } = useDarkMode();
 // const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectImagePreview, setProjectImagePreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigateTo = useNavigate();

  const handleProjectImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectImagePreview(reader.result);
      setProjectImage(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3201/api/v1/project/getproject/${id}`,
          { withCredentials: true }
        );
      
        const p = res.data.project;
        console.log(p)
        setTitle(p.title);
        setDescription(p.description);
       // setStack(p.technologies);
        setDeployed(p.deployed);
        setTechnologies(p.technologies);
        setGitRepoLink(p.gitRepoLink);
        setProjectLink(p.projectLink);
        setProjectImage(p.projectImage?.url);
        setProjectImagePreview(p.projectImage?.url);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching project");
      }
    };
    getProject();
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
      navigateTo("/dashboard");
    }
  }, [message, error]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
  //  formData.append("stack", technologies);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectImage", projectImage);
    dispatch(updateProject(id, formData));
    console.log(formData)
  };

  const handleReturnToDashboard = () => navigateTo("/dashboard");

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900 p-6">
    <div className="flex mt-7 justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleUpdateProject}
        className="w-full max-w-4xl bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Update Project
          </h2>
          <button
            type="button"
            onClick={handleReturnToDashboard}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Return to Dashboard
          </button>
        </div>

        <div className="mb-6">
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <img
              src={projectImagePreview || "/avatarHolder.jpg"}
              alt="projectImage"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            onChange={handleProjectImage}
            className="file:mt-4 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 w-full"
          />
        </div>

        <div className="grid gap-5">
          <InputField label="Project Title" value={title} onChange={setTitle} />
          <TextareaField
            label="Description"
            placeholder="Feature 1. Feature 2. Feature 3."
            value={description}
            onChange={setDescription}
          />
          <TextareaField
            label="Technologies Used"
            placeholder="HTML, CSS, JavaScript, React"
            value={technologies}
            onChange={setTechnologies}
          />
          {/* <InputField
            label="Stack"
            value={stack}
            onChange={setStack}
            placeholder="Full Stack, MERN, etc."
          /> */}
          <InputField
            label="Deployed"
            value={deployed}
            onChange={setDeployed}
            placeholder="Yes or No"
          />
          <InputField
            label="GitHub Repository Link"
            value={gitRepoLink}
            onChange={setGitRepoLink}
            placeholder="https://github.com/username/repo"
          />
          <InputField
            label="Project Link"
            value={projectLink}
            onChange={setProjectLink}
            placeholder="https://projectdemo.com"
          />
        </div>

        <div className="mt-6 flex justify-end">
          {loading ? (
            <LoadingButton content="Updating" width="w-52" />
          ) : (
            <button
              type="submit"
              className="w-52 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
  </div>
    
  );
};

const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <input
      type="text"
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <textarea
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      rows="3"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  </div>
  
);

export default UpdateProject;

