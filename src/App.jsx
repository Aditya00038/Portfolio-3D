import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import Snowfall from './components/ui/Snowfall'

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

        <div className="w-full bg-black min-h-screen relative">
          {/* Full Portfolio Canvas Snowfall Background - OUTSIDE SmoothScroll so it stays truly fixed! */}
          {!isLoading && (
            <div className="fixed inset-0 z-0 pointer-events-none">
              <Snowfall
                count={246}
                wind={0}
                windVariation={0}
                sizeMin={0.5}
                sizeMax={1.5}
                opacityMin={9}
                opacityMax={42}
                speedMin={1.1}
                speedMax={2.7}
                direction="down"
                color="#ffffff"
              />
            </div>
          )}

          <SmoothScroll>
            <div className="w-full bg-transparent min-h-screen relative">
              {!isLoading && <Navbar />}
              
              <div className="relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/project/:id" element={<ProjectDetails />} />
                </Routes>
              </div>
            </div>
          </SmoothScroll>
        </div>
      </AudioProvider>
    </BrowserRouter>
  )
}

export default App
