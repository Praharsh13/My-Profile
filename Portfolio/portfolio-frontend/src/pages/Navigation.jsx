import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/getuser`, { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(err => console.error(err));
  }, []);

  if (isHomePage) return null;

  const links = [
    { to: "/", label: "Home" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About Me" },
    { to: "/timeline", label: "Education & Work" },
    { to: "/contact", label: "Contact" },
    { to: "/tools", label: "Software Tools" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 dark:bg-white/10 border-b border-purple-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {user.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-purple-500 shadow"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
              {user.name?.charAt(0).toUpperCase() || "P"}
            </div>
          )}
          <span className="text-purple-300 font-semibold tracking-wide">
            {user.name || "Portfolio"}
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-white dark:text-gray-100">
          {links.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`relative hover:text-purple-400 transition duration-300 ${
                location.pathname === link.to ? "text-purple-400" : ""
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-purple-500 animate-pulse rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-purple-400 hover:text-purple-600">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-black/80 dark:bg-white/10 space-y-3">
          {links.map(link => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block text-white dark:text-gray-100 border-b border-purple-600 pb-2 ${
                location.pathname === link.to ? "text-purple-400" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
