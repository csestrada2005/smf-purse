import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the main window to top
    window.scrollTo(0, 0);
    
    // Also scroll any snap scroll containers to top
    const snapContainer = document.querySelector('.snap-y');
    if (snapContainer) {
      snapContainer.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
