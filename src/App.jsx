import Hero from './components/Hero';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import About from './Pages/About.jsx';
import useLenis from './hooks/useLenis';
import 'lenis/dist/lenis.css';

function App() {
  useLenis(); 
  return (
    <>
      <Hero />
      <About />
      <Cursor />
      <Navbar />

    </>
  );
}

export default App;