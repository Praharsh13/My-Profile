
import  Home  from './pages/Home'
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import AboutMe from './pages/AboutMe'
import Timeline from './pages/Timeline'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import Tools from './pages/Tools'
import ViewProject from './pages/ViewProject'

function App() {
 

  return (
    <>
    
    <BrowserRouter basename="/profile">
      <div className="flex flex-col min-h-screen bg-black text-white">
        <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tools" element={<Tools/>}/>
        <Route path="/project/:id" element={<ViewProject/>}/>
      </Routes>
      </main>
        <Footer />
        </div>
    </BrowserRouter>
        
     
    </>
  )
}

export default App
