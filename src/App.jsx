import Hero from './components/Hero';
import About from './Pages/About';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
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