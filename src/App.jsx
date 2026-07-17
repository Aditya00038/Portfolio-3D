import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import PixelBlast from './components/ui/PixelBlast'

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
          <div className="w-full bg-black min-h-screen relative">
            {/* Full Portfolio Interactive PixelBlast Background */}
            {!isLoading && (
              <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <PixelBlast
                  variant="circle"
                  pixelSize={8}
                  color="#5227FF"
                  patternScale={3}
                  patternDensity={1.2}
                  pixelSizeJitter={0.5}
                  enableRipples={true}
                  rippleSpeed={0.4}
                  rippleThickness={0.15}
                  rippleIntensityScale={1.5}
                  liquid={true}
                  liquidStrength={0.1}
                  liquidRadius={1.0}
                  liquidWobbleSpeed={3.0}
                  speed={0.4}
                  edgeFade={0.0}
                  transparent={true}
                />
              </div>
            )}

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
      </AudioProvider>
    </BrowserRouter>
  )
}

export default App
