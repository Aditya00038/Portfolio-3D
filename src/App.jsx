import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'

import Home from './pages/Home'
import About from './pages/About'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <BrowserRouter>
      <CustomCursor />
      
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
          </Routes>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
