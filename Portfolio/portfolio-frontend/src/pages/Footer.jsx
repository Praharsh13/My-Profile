import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left side text */}
        <p className="text-sm text-center md:text-left">
          © {year} All rights reserved by <span className="text-purple-400 font-semibold">Praharsh Pranjal</span>
        </p>

        {/* Social links */}
        <div className="flex space-x-5 text-xl">
          <a
            href="mailto:praharsh.pranjal13@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/Praharsh13"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/praharsh13/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
