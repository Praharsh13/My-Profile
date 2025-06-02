import { useState } from "react";
import { motion } from "framer-motion";
import { User, Pencil, Lock } from "lucide-react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { label: "Profile", icon: <User size={20} /> },
    { label: "Update Profile", icon: <Pencil size={20} /> },
    { label: "Update Password", icon: <Lock size={20} /> },
  ];

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Profile":
        return <Profile />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 250 : 60 }}
        className="overflow-hidden border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-6"
      >
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen && (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Settings</h2>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setSelectedComponent(item.label)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-200 justify-$
              {isSidebarOpen ? "start" : "center"} ${
                selectedComponent === item.label
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white"
              }`}
              title={item.label}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            {selectedComponent}
          </h1>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all">
            {renderComponent()}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Account;
