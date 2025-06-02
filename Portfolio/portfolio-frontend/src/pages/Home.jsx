// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FaUser, FaGraduationCap, FaProjectDiagram, FaTools, FaLaptopCode, FaEnvelope } from 'react-icons/fa'
// import { motion } from 'framer-motion'
// import { Typewriter } from 'react-simple-typewriter'

// const tabs = [
//   { name: 'About Me', icon: <FaUser />, path: '/about' },
//   { name: 'Work & Education', icon: <FaGraduationCap />, path: '/timeline' },
//   { name: 'Projects', icon: <FaProjectDiagram />, path: '/projects' },
//   { name: 'Skills', icon: <FaTools />, path: '/skills' },
//   { name: 'Software Tools', icon: <FaLaptopCode />, path: '/tools' },
//   { name: 'Contact Me', icon: <FaEnvelope />, path: '/contact' },
// ]

// export default function Home() {
//   const navigate = useNavigate()

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white flex flex-col">
//       <div className="flex flex-col flex-grow justify-center items-center px-6">
//         {/* Animated welcome */}
//         <motion.header
//   className="text-center max-w-4xl mt-24 mb-16"
//   initial={{ opacity: 0, y: 60 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 1.2, ease: 'easeOut' }}
// >
//   <motion.h1
//     className="text-6xl font-extrabold tracking-tight text-purple-400 mb-6 drop-shadow-lg"
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
//   >
//     Welcome to My Professional Profile
//   </motion.h1>

//   <motion.p
//     className="max-w-3xl text-lg text-gray-300 mx-auto"
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
//   >
//     <Typewriter
//       words={[
//         'Explore my About Me, Work & Education, Projects, Skills, Software Tools, and Contact info.',
//       ]}
//       loop={0}
//       cursor
//       cursorStyle="_"
//       typeSpeed={70}
//       deleteSpeed={50}
//       delaySpeed={2000}
//     />
//   </motion.p>
// </motion.header>

//         {/* Tabs as big buttons with hover + transition */}
//         <div className="flex flex-wrap justify-center gap-10">
//           {tabs.map(({ name, icon, path }) => (
//             <button
//               key={path}
//               onClick={() => navigate(path)}
//               className="flex items-center space-x-4 bg-purple-700 hover:bg-purple-600 transition transform hover:scale-105 duration-300 rounded-full px-8 py-5 shadow-lg ring-1 ring-purple-500 ring-opacity-50 text-white text-xl font-semibold drop-shadow-md"
//               aria-label={`Navigate to ${name}`}
//             >
//               <span className="text-3xl">{icon}</span>
//               <span>{name}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   FaUser,
//   FaGraduationCap,
//   FaProjectDiagram,
//   FaTools,
//   FaLaptopCode,
//   FaEnvelope,
// } from 'react-icons/fa'
// import { motion } from 'framer-motion'
// import { Typewriter } from 'react-simple-typewriter'

// const tabs = [
//   { name: 'About Me', icon: <FaUser />, path: '/about' },
//   { name: 'Work & Education', icon: <FaGraduationCap />, path: '/timeline' },
//   { name: 'Projects', icon: <FaProjectDiagram />, path: '/projects' },
//   { name: 'Skills', icon: <FaTools />, path: '/skills' },
//   { name: 'Software Tools', icon: <FaLaptopCode />, path: '/tools' },
//   { name: 'Contact Me', icon: <FaEnvelope />, path: '/contact' },
// ]

// const codeSnippets = [
//   `// Skills Showcase\nfunction showSkills() {\n  const skills = ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker', 'GraphQL'];\n  console.log('Skills I bring to the table:');\n  skills.forEach(skill => console.log('🔥', skill));\n}\nshowSkills();\n// Spoiler: I’m also great at debugging production at 3AM!`,

//   `// Projects Portfolio\nconst projects = [\n  { name: 'Portfolio Website', status: 'Live', stars: 42 },\n  { name: 'E-commerce App', status: 'Deployed', stars: 1337 },\n  { name: 'Chat Application', status: 'In Progress', stars: 0 },\n];\nprojects.forEach(({name, status, stars}) => {\n  console.log(\`🚀 Project: \${name} | Status: \${status} | Stars: \${stars}\`);\n});\n// Fun fact: All projects tested with coffee ☕️ and memes 🤣`,

//   `// Toolbox Essentials\nconst tools = ['VS Code', 'Git', 'Postman', 'Figma', 'Slack', 'Docker'];\nconsole.log('My Swiss Army Knife includes:', tools.join(', '));\n// Warning: May spontaneously start debugging in meetings!`,

//   `// Contact Me\nconst contact = {\n  email: 'praharsh@example.com',\n  linkedin: 'linkedin.com/in/praharshpranjal',\n  github: 'github.com/praharshpranjal',\n  motto: 'Let’s build something awesome!'\n};\nconsole.log('Reach me at:', contact.email);\nconsole.log('Let’s connect:', contact.linkedin);\n// Promise: I reply faster than a promise resolves!`,

//   `// Career Timeline\nconst timeline = [\n  { year: 2019, event: 'Started at Accenture - coffee intake: infinite ☕️' },\n  { year: 2022, event: 'Level-up to Cognizant - mastered the art of meeting survival' },\n  { year: 2024, event: 'Graduated from Liverpool with Master’s degree' },\n];\ntimeline.forEach(({year, event}) => console.log(\`📅 \${year}: \${event}\`));`,

//   `// Why Hire Me?\nconst qualities = ['Problem Solver', 'Team Player', 'Fast Learner', 'Occasional Meme Lord', 'Midnight Debugger'];\nqualities.forEach(q => console.log(\`✅ \${q}\`));\n// Bonus: I write clean code and clean coffee mugs!`,

//   `// Debugging Life\nfunction debug(code) {\n  try {\n    if (!code) throw new Error('No code to debug');\n    return 'All systems go! 🚀';\n  } catch (e) {\n    return 'Debugging mode activated... 🔍';\n  }\n}\nconsole.log(debug(true));\nconsole.log(debug(false));`,

//   `// Developer Motto\nconst motto = () => 'Eat. Sleep. Code. Repeat. (And occasionally cry)';\nconsole.log(motto());\n// If you think that’s funny, wait till you see my commit messages!`
// ]


// export default function Home() {
//   const navigate = useNavigate()
//   const [activeIndex, setActiveIndex] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
//     }, 4000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#0f1117] text-white font-['Fira_Code',monospace]">
//       {/* Sidebar */}
//       <nav className="w-56 bg-[#1a1d2a] border-r border-[#313552] flex flex-col py-10 px-6 space-y-8 shadow-xl">
//         {tabs.map(({ name, icon, path }) => (
//           <button
//             key={path}
//             onClick={() => navigate(path)}
//             className="group flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition duration-300 p-2 rounded-md hover:bg-[#23283e]"
//             aria-label={`Navigate to ${name}`}
//           >
//             <span className="text-2xl">{icon}</span>
//             <span className="text-base font-medium">{name}</span>
//           </button>
//         ))}
//       </nav>

//       {/* Main Content */}
//       <main className="flex flex-col flex-grow p-8 bg-[#0f1117]">
//         {/* Header */}
//         <header className="flex items-center justify-between mb-6 px-6 py-3 bg-[#1f2333] rounded-lg shadow-inner border border-[#2a2e40]">
//           <div className="flex space-x-3">
//             <div className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" />
//             <div className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer" />
//             <div className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer" />
//           </div>
//         </header>

//         {/* Editor Area with Welcome Panel */}
//         <section className="flex flex-grow gap-8">
//           {/* Left: Code Snippet + Typewriter Below Code */}
//           <div className="flex flex-col flex-grow bg-[#1a1d2a] rounded-lg p-6 shadow-lg border border-[#2d2f45] overflow-auto">
//             <motion.pre
//               className="whitespace-pre-wrap text-sm md:text-base text-green-400 font-mono leading-relaxed min-h-[300px] flex-grow"
//               key={activeIndex}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.5 }}
//             >
//               {codeSnippets[activeIndex]}
//             </motion.pre>

//             {/* Keep your existing Typewriter Below Code exactly as is */}
//             <div className="mt-10 text-gray-300 border-t border-[#2a2e40] pt-4">
//               <div className="text-cyan-400 font-semibold text-sm mb-2">// Explore My Profile</div>
//               <p className="mb-2">Navigate through the pages to see:</p>
//               <div className="text-lg">
//                 <Typewriter
//                   words={[
//                     'My Skills → What I know',
//                     'My Projects → What I built',
//                     'My Timeline → Where I worked',
//                     'My Tools → What I use',
//                     'Contact → Let’s Connect',
//                   ]}
//                   loop={0}
//                   cursor
//                   cursorStyle="_"
//                   typeSpeed={60}
//                   deleteSpeed={40}
//                   delaySpeed={2000}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right: Welcome to Profile Panel */}
//           <div className="flex flex-col justify-center flex-shrink-0 w-80 p-6 bg-[#1a1d2a] rounded-lg shadow-lg border border-[#2d2f45] select-none">
//             <h2 className="text-3xl font-bold text-cyan-400 mb-4">
//               Welcome to My Profile
//             </h2>
//             <p className="text-gray-300 mb-6 text-lg leading-relaxed">
//               <Typewriter
//                 words={[
//                   'Thank you for visiting my page!',
//                   "I'm excited to share my journey.",
//                   'Feel free to explore my skills, projects, and more.',
//                   "Let's build something amazing together.",
//                 ]}
//                 loop={0}
//                 cursor
//                 cursorStyle="|"
//                 typeSpeed={70}
//                 deleteSpeed={40}
//                 delaySpeed={1800}
//               />
//             </p>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaUser,
  FaGraduationCap,
  FaProjectDiagram,
  FaTools,
  FaLaptopCode,
  FaEnvelope,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

const tabs = [
  { name: 'About Me', icon: <FaUser />, path: '/about' },
  { name: 'Work & Education', icon: <FaGraduationCap />, path: '/timeline' },
  { name: 'Projects', icon: <FaProjectDiagram />, path: '/projects' },
  { name: 'Skills', icon: <FaTools />, path: '/skills' },
  { name: 'Software Tools', icon: <FaLaptopCode />, path: '/tools' },
  { name: 'Contact Me', icon: <FaEnvelope />, path: '/contact' },
]

const codeSnippets = [
  `// Skills Showcase\nfunction showSkills() {\n  const skills = ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker', 'GraphQL'];\n  console.log('Skills I bring to the table:');\n  skills.forEach(skill => console.log('🔥', skill));\n}\nshowSkills();\n// Spoiler: I’m also great at debugging production at 3AM!`,

  `// Projects Portfolio\nconst projects = [\n  { name: 'Portfolio Website', status: 'Live', stars: 42 },\n  { name: 'E-commerce App', status: 'Deployed', stars: 1337 },\n  { name: 'Chat Application', status: 'In Progress', stars: 0 },\n];\nprojects.forEach(({name, status, stars}) => {\n  console.log(\`🚀 Project: \${name} | Status: \${status} | Stars: \${stars}\`);\n});\n// Fun fact: All projects tested with coffee ☕️ and memes 🤣`,

  `// Toolbox Essentials\nconst tools = ['VS Code', 'Git', 'Postman', 'Figma', 'Slack', 'Docker'];\nconsole.log('My Swiss Army Knife includes:', tools.join(', '));\n// Warning: May spontaneously start debugging in meetings!`,

  `// Contact Me\nconst contact = {\n  email: 'praharsh@example.com',\n  linkedin: 'linkedin.com/in/praharshpranjal',\n  github: 'github.com/praharshpranjal',\n  motto: 'Let’s build something awesome!'\n};\nconsole.log('Reach me at:', contact.email);\nconsole.log('Let’s connect:', contact.linkedin);\n// Promise: I reply faster than a promise resolves!`,

  `// Career Timeline\nconst timeline = [\n  { year: 2019, event: 'Started at Accenture - coffee intake: infinite ☕️' },\n  { year: 2022, event: 'Level-up to Cognizant - mastered the art of meeting survival' },\n  { year: 2024, event: 'Graduated from Liverpool with Master’s degree' },\n];\ntimeline.forEach(({year, event}) => console.log(\`📅 \${year}: \${event}\`));`,

  `// Why Hire Me?\nconst qualities = ['Problem Solver', 'Team Player', 'Fast Learner', 'Occasional Meme Lord', 'Midnight Debugger'];\nqualities.forEach(q => console.log(\`✅ \${q}\`));\n// Bonus: I write clean code and clean coffee mugs!`,

  `// Debugging Life\nfunction debug(code) {\n  try {\n    if (!code) throw new Error('No code to debug');\n    return 'All systems go! 🚀';\n  } catch (e) {\n    return 'Debugging mode activated... 🔍';\n  }\n}\nconsole.log(debug(true));\nconsole.log(debug(false));`,

  `// Developer Motto\nconst motto = () => 'Eat. Sleep. Code. Repeat. (And occasionally cry)';\nconsole.log(motto());\n// If you think that’s funny, wait till you see my commit messages!`,

  
]

export default function Home() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f1117] text-white font-['Fira_Code',monospace] overflow-hidden">
      {/* Sidebar */}
      
       {/* Sidebar for desktop */}
       <nav className="hidden md:flex w-56 bg-[#1a1d2a] border-r border-[#313552] flex-col py-10 px-6 space-y-8 shadow-xl">
        {tabs.map(({ name, icon, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="group flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition duration-300 p-2 rounded-md hover:bg-[#23283e]"
            aria-label={`Navigate to ${name}`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-base font-medium">{name}</span>
          </button>
        ))}
      </nav>

      {/* Top horizontal nav for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 flex md:hidden bg-[#1a1d2a] border-t border-[#313552] px-4 py-2 justify-between shadow-xl">
        {tabs.map(({ name, icon, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center text-gray-300 hover:text-cyan-400 transition duration-300 p-2"
            aria-label={`Navigate to ${name}`}
          >
            <span className="text-2xl">{icon}</span>
            {/* No text on mobile */}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main
        className="
          flex flex-col flex-grow
          p-6 md:p-8
          bg-[#0f1117]
          min-w-0
          overflow-auto
        "
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-6 px-6 py-3 bg-[#1f2333] rounded-lg shadow-inner border border-[#2a2e40]">
          <div className="flex space-x-3">
            <div className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" />
            <div className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer" />
            <div className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer" />
          </div>
        </header>

        {/* Editor Area with Welcome Panel */}
        <section className="flex flex-col md:flex-row flex-grow gap-6 md:gap-8 overflow-hidden">
          {/* Left: Code Snippet + Typewriter Below Code */}
          <div className="flex flex-col flex-grow bg-[#1a1d2a] rounded-lg p-6 shadow-lg border border-[#2d2f45] overflow-auto min-h-[300px]">
            <motion.pre
              className="whitespace-pre-wrap text-sm md:text-base text-green-400 font-mono leading-relaxed flex-grow"
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {codeSnippets[activeIndex]}
            </motion.pre>

            <div className="mt-10 text-gray-300 border-t border-[#2a2e40] pt-4">
              <div className="text-cyan-400 font-semibold text-sm mb-2">// Explore My Profile</div>
              <p className="mb-2">Navigate through the pages to see:</p>
              <div className="text-lg">
                <Typewriter
                  words={[
                    'My Skills → What I know',
                    'My Projects → What I built',
                    'My Timeline → Where I worked',
                    'My Tools → What I use',
                    'Contact → Let’s Connect',
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </div>
            </div>
          </div>

          {/* Right: Welcome to Profile Panel */}
          <div className="flex flex-col justify-center flex-shrink-0 w-full md:w-80 p-6 bg-[#1a1d2a] rounded-lg shadow-lg border border-[#2d2f45] select-none">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4">
              Welcome to My Profile
            </h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              <Typewriter
                words={[
                  'Thank you for visiting my page!',
                  "I'm excited to share my journey.",
                  'Feel free to explore my skills, projects, and more.',
                  "Let's build something amazing together.",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1800}
              />
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
        