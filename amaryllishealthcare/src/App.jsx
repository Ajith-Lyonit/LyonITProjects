import { useEffect, Suspense, lazy } from 'react';
import { RecoilRoot } from 'recoil';

// Lazy load the routes for code splitting
const AppRoutes = lazy(() => import('./AppRoutes'));

function App() {

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const loadNonCriticalCSS = async () => {
      await import('./App.scss');
      await import('./styles/fontawesome.css'); // ✅ updated
      await import('swiper/css');
      await import('swiper/css/navigation');
      await import('swiper/css/pagination');
    };
    loadNonCriticalCSS();

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);


  return (
    <RecoilRoot>
      <div className="App-container">
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </div>
    </RecoilRoot>
  );
}

export default App;
