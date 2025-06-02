import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllSkillErrors } from "@/store/slices/skillSlice.js"

import {  
  clearAllApplicationErrors,
  deleteApplication,
  getAllApplications,
  resetApplication}
   from "@/store/slices/applicationSlice.js"
  import {clearAllTimelineErrors} from "@/store/slices/timelineSlice.js"
  import {clearAllProjectErrors} from "@/store/slices/projectSlice.js"

import LoadingButton from "./loader.jsx";
import { store } from "@/store/store.js";

const Dashboard = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [appId, setAppId] = useState(null);

  const gotoMangeSkills = () => navigateTo("/manage/skills");
  const gotoMangeTimeline = () => navigateTo("/manage/timelines");
  const gotoMangeProjects = () => navigateTo("/manage/projects");



  const { user } = useSelector((state) => state.user);

  console.log(user)
  const { skills, loading: skillLoading, error: skillError } = useSelector((state) => state.skill);
  //console.log(skills)
  const { applications, loading: appLoading, error: appError, message: appMessage } = useSelector((state) => state.application);
  
  const { timeline, loading: timelineLoading, error: timelineError } = useSelector((state) => state.timeline);
  
  const { projects, error: projectError } = useSelector((state) => state.project);
  

  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    console.log(`id is ${id}`)
    dispatch(deleteApplication(id));
  };

  useEffect(() => {
    if (skillError) toast.error(skillError), dispatch(clearAllSkillErrors());
    if (appError) toast.error(appError), dispatch(clearAllApplicationErrors());
    if (projectError) toast.error(projectError), dispatch(clearAllProjectErrors());
    if (timelineError) toast.error(timelineError), dispatch(clearAllTimelineErrors());

    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetApplication());
      dispatch(getAllApplications());
    }
  }, [skillError, appError, appMessage, timelineError, projectError, dispatch]);

  return (
    <div className="flex flex-col py-4 pl-4 sm:pl-14">
      <main className="grid gap-4 p-4 sm:px-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid gap-4 md:gap-8 lg:col-span-2">
          {/* Header cards */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 sm:col-span-2 flex flex-col justify-between">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{user.aboutMe}</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Visit Portfolio</button>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Projects Completed</h2>
              <p className="text-5xl font-bold">{projects?.length || 0}</p>
              <button onClick={gotoMangeProjects} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Manage Projects</button>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Skills</h2>
              <p className="text-5xl font-bold">{skills?.length || 0}</p>
              <button onClick={gotoMangeSkills} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Manage Skills</button>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold">Projects</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left hidden md:table-cell">Stack</th>
                    <th className="p-4 text-left hidden md:table-cell">Deployed</th>
                    <th className="p-4 text-left">Update</th>
                    <th className="p-4 text-right">Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {projects?.length > 0 ? (
                    projects.map((project) => (
                      <tr key={project._id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td className="p-4 font-medium">{project.title}</td>
                        <td className="p-4 hidden md:table-cell">{project.technologies}</td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="inline-block text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                            {project.deployed?"Yes":"No"}
                          </span>
                        </td>
                        <td className="p-4">
                          <Link to={`/update/project/${project._id}`}>
                            <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Update</button>
                          </Link>
                        </td>
                        <td className="p-4 text-right">
                          <Link to={project.gitRepoLink
                                                                   } target="_blank">
                            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Visit</button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td className="p-4 text-xl text-center" colSpan="5">You have not added any project.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold">Skills</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {skills?.length > 0 ? (
                skills.map((skill) => (
                  <div key={skill._id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner">
                    <h4 className="font-semibold text-gray-800 dark:text-white">{skill.name}</h4>
                    <div className="w-full h-3 mt-2 bg-gray-300 dark:bg-gray-600 rounded">
                      <div className="h-full bg-blue-600 rounded" style={{ width: `${skill.profiency}%` }}></div>
                      {console.log(skill.profiency)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xl p-4">You have not added any skill.</p>
              )}
            </div>
          </div>

          {/* Applications & Timeline */}
          <div className="grid min-[1050px]:grid-cols-2 gap-4">
            {/* Software Applications */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold">Software Applications</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left hidden md:table-cell">Icon</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications?.length > 0 ? (
                      applications.map((app) => (
                        <tr key={app._id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <td className="p-4 font-medium">{app.softwarename}</td>
                          <td className="p-4 hidden md:table-cell">
                            <img className="w-6 h-6" src={app.image?.url} alt={app.softwarename} />
                          </td>
                          <td className="p-4 text-center">
                            {appLoading && appId === app._id ? (
                              <LoadingButton content="Deleting" width="w-fit" />
                            ) : (
                              <button
                                onClick={() => handleDeleteSoftwareApp(app._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td className="p-4 text-xl text-center" colSpan="3">You have not added any application.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold">Timeline</h3>
                <button onClick={gotoMangeTimeline} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Manage</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      <th className="p-4 text-left">Title</th>
                      <th className="p-4 text-left">From</th>
                      <th className="p-4 text-right">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline?.length > 0 ? (
                      timeline.map((entry) => (
                        <tr key={entry._id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <td className="p-4 font-medium">{entry.title}</td>
                          <td className="p-4">{entry.timeline.from}</td>
                          <td className="p-4 text-right">{entry.timeline.to}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td className="p-4 text-xl text-center" colSpan="3">You have not added any timeline.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
