import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetAllTimelineSlice,
} from "@/store/slices/timelineSlice";
import { useDarkMode } from "@/context/DarkMode.jsx";

const ManageTimeline = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900 p-6">
    
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Manage Your Timeline
          </h2>
          <button
            onClick={handleReturnToDashboard}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Return to Dashboard
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2 hidden md:table-cell">Description</th>
                <th className="px-4 py-2 hidden md:table-cell">From</th>
                <th className="px-4 py-2 hidden md:table-cell">To</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {timeline.length > 0 ? (
                timeline.map((element) => (
                  <tr
                    key={element._id}
                    className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-3 font-medium">{element.title}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {element.description}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {element.timeline.from}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {element.timeline.to ? element.timeline.to : "____"}
                    </td>
                    <td className="px-4 py-3 flex justify-end">
                      <button
                        onClick={() => handleDeleteTimeline(element._id)}
                        className="border-2 border-red-600 text-red-600 rounded-full p-1 hover:bg-red-600 hover:text-white transition"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-lg text-gray-500 dark:text-gray-400"
                  >
                    You have not added any timeline.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ManageTimeline;
