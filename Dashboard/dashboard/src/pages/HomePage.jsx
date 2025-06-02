
import {
    Home,
    FolderGit,
    PencilRuler,
    LayoutGrid,
    History,
    MessageSquareMore,
    User,
    LogOut,
    Sun,
    Moon,
  } from "lucide-react";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { logout } from "@/store/slices/userSlice";
  import { clearAllUserErrors } from "@/store/slices/userSlice";
  import { toast } from "react-toastify";
  import { motion } from "framer-motion";
  import { useDarkMode } from "@/context/DarkMode";

import Dashboard from "./sub-folder/Dashboard";
import AddSkills from "./sub-folder/AddSkills";
import AddProject from "./sub-folder/AddProject";
import AddApplication from "./sub-folder/AddApplication";
import Account from "./sub-folder/Account";
import Message from "./sub-folder/Message";
import AddTimeline from "./sub-folder/AddTimeline";

const navItems = [
    { name: "Dashboard", icon: <Home /> },
    { name: "Add Project", icon: <FolderGit /> },
    { name: "Add Skill", icon: <PencilRuler /> },
    { name: "Add Application", icon: <LayoutGrid /> },
    { name: "Add Timeline", icon: <History /> },
    { name: "Messages", icon: <MessageSquareMore /> },
    { name: "Account", icon: <User /> },
  ];
  
const HomePage = () => {
    const [active, setActive] = useState("Dashboard");
    const {darkMode, setDarkMode} = useDarkMode();
    const [collapsed, setCollapsed] = useState(false);
    
    const { isAuthenticated, error, user } = useSelector((state) => state.user);
    console.log(user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout());
      toast.success("Logged Out!");
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllUserErrors());
      }
      if (!isAuthenticated) {
        navigateTo("/login");
      }
    }, [isAuthenticated]);
  
    const renderComponent = () => {
      switch (active) {
        case "Dashboard":
          return <Dashboard />;
        case "Add Project":
          return <AddProject />;
        case "Add Skill":
          return <AddSkills />;
        case "Add Application":
          return <AddApplication />;
        case "Add Timeline":
          return <AddTimeline />;
        case "Messages":
          return <Message />;
        case "Account":
          return <Account />;
        default:
          return <Dashboard />;
      }
    };
  
    return (
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
          {/* Sidebar */}
          <motion.aside
            initial={{ width: 80 }}
            animate={{ width: collapsed ? 80 : 250 }}
            className="bg-white dark:bg-gray-800 shadow-md py-6 px-2 flex flex-col justify-between transition-all"
          >
            <div className="space-y-4">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-sm text-gray-600 dark:text-gray-300 mb-6"
              >
                {collapsed ? "➡️" : "⬅️ Collapse"}
              </button>
              {navItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition-all duration-200 ${
                    active === item.name
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100 dark:hover:bg-blue-800"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span className="text-sm">{item.name}</span>}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition"
              >
                {darkMode ? <Sun /> : <Moon />}
                {!collapsed && (
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-800 rounded-md transition"
              >
                <LogOut />
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </motion.aside>
  
          {/* Main content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              {user?.avatar?.url && (
                <img
                  src={user.avatar.url}
                  alt="avatar"
                  className="w-16 h-16 rounded-full shadow-md border border-gray-300 dark:border-gray-600"
                />
              )}
              <h1 className="text-3xl font-semibold">
                Welcome back, {user?.userName || "User"}
              </h1>
            </motion.div>
            {renderComponent()}
          </main>
        </div>
      </div>
    );
  };
  
  export default HomePage;