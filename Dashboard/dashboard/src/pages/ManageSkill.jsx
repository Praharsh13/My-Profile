import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  clearAllSkillErrors,
  updateSkill,
  resetSkillSlice,
  deleteSkill,
  getAllSkills,
} from "@/store/slices/skillSlice";
import { Trash2 } from "lucide-react";
import LoadingButton from "./sub-folder/loader.jsx"; // make sure this path is correct
import { useDarkMode } from "@/context/DarkMode.jsx";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();

  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );

  const [updatedSkills, setUpdatedSkills] = useState({});

  const handleInputChange = (id, value) => {
    setUpdatedSkills((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateSkill = (id) => {
    const proficiency = Number(updatedSkills[id]);
    if (!isNaN(proficiency) && proficiency >= 0 && proficiency <= 100) {
      dispatch(updateSkill(id, proficiency));
    } else {
      toast.error("Proficiency must be between 1 and 100");
    }
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  const handleReturnToDashboard = () => navigateTo("/");

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, error, message]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900 p-6">
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Manage Your Skills
        </h1>
        <button
          onClick={handleReturnToDashboard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {skill.name}
              </h2>
              <Trash2
                onClick={() => handleDeleteSkill(skill._id)}
                className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-800"
                title="Delete"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor={`proficiency-${skill._id}`}
                className="text-gray-700 dark:text-gray-300"
              >
                Proficiency:
              </label>
              <input
                id={`proficiency-${skill._id}`}
                type="number"
                min="1"
                max="10"
                defaultValue={skill.profiency}
                onChange={(e) =>
                  handleInputChange(skill._id, e.target.value)
                }
                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {loading ? (
              <LoadingButton content="Updating" width="w-full" />
            ) : (
              <button
                onClick={() => handleUpdateSkill(skill._id)}
                className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ManageSkills;
