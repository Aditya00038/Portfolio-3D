import ScrollyCanvas from './components/ScrollyCanvas'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Contributions from './components/Contributions'
import ContactFooter from './components/ContactFooter'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main className="w-full bg-black min-h-screen">
        <Navbar />
        <ScrollyCanvas />

        {/* Modern Cinematic Projects section */}
        <Projects />

        {/* Cinematic Tech Stack & Tools section */}
        <TechStack />

        {/* Dynamic Coding Footprint (GitHub & DSA analytics) */}
        <Contributions />

        {/* Contact Form and Stylized Footer */}
        <ContactFooter />
      </main>
      </SmoothScroll>
    </>
  )
}

export default App
