import { useEffect, useState } from 'react';
import Hero from './pages/Hero.jsx';
import About from './Pages/About';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import useLenis from './hooks/useLenis';
import 'lenis/dist/lenis.css';
import PreLoader from './pages/PreLoader.jsx';

function App() {
    useLenis();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let loadEventFired = false;
        let timeoutFinished = false;

        const tryHideLoader = () => {
            if (loadEventFired && timeoutFinished) {
                setIsLoaded(true);
            }
        };

        const timer = setTimeout(() => {
            timeoutFinished = true;
            tryHideLoader();
        }, 4000);


        const onPageLoad = () => {
            loadEventFired = true;
            tryHideLoader();
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', onPageLoad);
        };
    }, []);

    return (
        <>
            <PreLoader isHidden={isLoaded} />
            {isLoaded && (
                <>
                    <Hero />
                    <About />
                    <Cursor />
                    <Navbar />
                </>
            )}
        </>
    );
}

export default App;