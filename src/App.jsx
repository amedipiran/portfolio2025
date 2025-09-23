import { useEffect, useState } from 'react';
import useLenis from './hooks/useLenis';
import 'lenis/dist/lenis.css';
import PreLoader from './pages/PreLoader.jsx';
import Home from "./pages/Home.jsx";

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
                    <Home />

                </>
            )}
        </>
    );
}

export default App;