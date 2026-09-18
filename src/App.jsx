import { useCallback, useEffect, useState } from 'react';
import useLenis from './hooks/useLenis';
import Preloader from './components/Preloader.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  useLenis(ready);

  useEffect(() => {
    document.body.classList.toggle('is-loading', !loaderDone);
    return () => document.body.classList.remove('is-loading');
  }, [loaderDone]);

  const handleReady = useCallback(() => setReady(true), []);
  const handleDone = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      {!loaderDone && <Preloader onReady={handleReady} onDone={handleDone} />}
      {ready && <Home />}
    </>
  );
}
