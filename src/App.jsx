import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'

import Home from './pages/Home'
import About from './pages/About'
import ProjectDetails from './pages/ProjectDetails'
import ScrollToTop from './components/ScrollToTop'
import { AudioProvider } from './context/AudioContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <BrowserRouter>
      <AudioProvider>
        <ScrollToTop />
        
        <AnimatePresence>
          {isLoading && (
            <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        <SmoothScroll>
          <div className="w-full bg-black min-h-screen">
            {!isLoading && <Navbar />}
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
          </div>
        </SmoothScroll>
      </AudioProvider>
    </BrowserRouter>
  )
}

export default App
