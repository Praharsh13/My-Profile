import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewSkill,
  clearAllSkillErrors,
  getAllSkills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.skill);

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", title);
    formData.append("profiency", proficiency);
    formData.append("image", svg);
    formData.append("type", type);
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
      setTitle("");
      setProficiency("");
      setSvg("");
      setSvgPreview("");
      setType("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Add a New Skill</h1>
        <form onSubmit={handleAddNewSkill} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. React.js"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Proficiency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Proficiency (0-100)
            </label>
            <input
              type="number"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              required
              placeholder="e.g. 80"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skill Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Skill Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="cloud">Cloud</option>
              <option value="database">Database</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          {/* SVG Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Skill SVG
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-md">
              {svgPreview ? (
                <img src={svgPreview} alt="Preview" className="w-16 h-16 mb-2 object-contain" />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-sm mb-2">
                  No file selected
                </span>
              )}
              <input
                type="file"
                accept=".svg,image/*"
                onChange={handleSvg}
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
            {loading ? "Adding Skill..." : "Add Skill"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
