import ScrollyCanvas from './components/ScrollyCanvas'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import Projects from './components/Projects'

function App() {
  return (
    <SmoothScroll>
      <main className="w-full bg-black min-h-screen">
        <Navbar />
        <ScrollyCanvas />

        {/* Modern Cinematic Projects section */}
        <Projects />
      </main>
    </SmoothScroll>
  )
}

export default App
