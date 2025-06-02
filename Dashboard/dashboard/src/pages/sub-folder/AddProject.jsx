import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProject,
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectLink, setprojectLink] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");
  const [deployed, setDeployed] = useState(false);

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.project);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("technologies", techStack);
    formData.append("projectLink", projectLink);
    formData.append("gitRepoLink", githubUrl);
    formData.append("projectImage", thumbnail);
    formData.append("deployed", deployed);
    console.log(formData)
    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Add New Project</h1>
        <form onSubmit={handleAddProject} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Portfolio Website"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Brief summary of your project..."
              rows={4}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Tech Stack
            </label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              required
              placeholder="e.g. React, Node.js, MongoDB"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

                    {/* Deployed Checkbox */}
            <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="deployed"
                checked={deployed}
                onChange={(e) => setDeployed(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="deployed" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Is the project deployed?
            </label>
            </div>

          {/* Live URL */}
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Project Link
            </label>
            <input
              type="url"
              value={projectLink}
              onChange={(e) => setprojectLink(e.target.value)}
              required
              placeholder="https://"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> 

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
              placeholder="https://github.com/..."
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Project Thumbnail
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-md">
              {preview ? (
                <img src={preview} alt="Thumbnail Preview" className="w-24 h-24 mb-2 object-contain" />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-sm mb-2">
                  No file selected
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="text-sm text-gray-600 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          >
            {loading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
