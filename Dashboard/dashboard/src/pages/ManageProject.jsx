import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import { Eye, Pen, Trash2 } from "lucide-react";
import LoadingButton from "./sub-folder/loader.jsx";
import { useDarkMode } from "@/context/DarkMode.jsx";



const ManageProjects = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();

  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  const handleReturnToDashboard = () => {
    navigateTo("/dashboard");
  };

  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

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
  }, [dispatch, error, message]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900 p-6">
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Manage Your Projects
        </h1>
        <button
          onClick={handleReturnToDashboard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-3">Banner</th>
              <th className="p-3">Title</th>
              <th className="p-3 hidden md:table-cell">Stack</th>
              <th className="p-3 hidden md:table-cell">Deployed</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects && projects.length > 0 ? (
              projects.map((element) => (
                <tr
                  key={element._id}
                  className="bg-white dark:bg-gray-800 border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="p-3">
                    <img
                      src={element.projectImage?.url}
                      alt={element.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">
                    {element.title}
                  </td>
                  <td className="p-3 hidden md:table-cell text-gray-700 dark:text-gray-300">
                    {element.technologies}
                  </td>
                  <td className="p-3 hidden md:table-cell text-gray-700 dark:text-gray-300">
                    {element.deployed ? "Yes" : "No"}
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <Link to={`/view/project/${element._id}`}>
                      <button
                        className="border border-green-600 text-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white"
                        title="View"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </Link>
                    <Link to={`/update/project/${element._id}`}>
                      <button
                        className="border border-yellow-400 text-yellow-400 rounded-full p-2 hover:bg-yellow-400 hover:text-black"
                        title="Edit"
                      >
                        <Pen className="h-5 w-5" />
                      </button>
                    </Link>
                    {loading ? (
                      <LoadingButton content="Deleting" width="w-8 h-8" />
                    ) : (
                      <button
                        onClick={() => handleProjectDelete(element._id)}
                        className="border border-red-600 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-lg text-gray-600 dark:text-gray-300">
                  You have not added any project.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ManageProjects;
