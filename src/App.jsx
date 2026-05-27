import ScrollyCanvas from './components/ScrollyCanvas'
import Navbar from './components/Navbar'

function App() {
  return (
    <main className="w-full bg-black min-h-screen">
      <Navbar />
      <ScrollyCanvas />
      
      {/* Some extra content to scroll past if needed */}
      <section className="h-screen flex items-center justify-center bg-zinc-900 text-white">
        <h2 className="text-4xl md:text-6xl font-bold">End of Sequence</h2>
      </section>
    </main>
  )
}

export default App
