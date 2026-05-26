import React, { useState, useEffect } from 'react';
import scrollIcon from "./img/scroll.png";

const AMScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) { 
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={buttonStyle}
        aria-label="Scroll to Top"
      >
        <img style={{height:25,width:25}} src={scrollIcon} alt="" />
      </button>
    )
  );
};

const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '15px 15px',
  fontSize: '16px',
  backgroundColor:'rgba(255, 255, 255, 0.86)',
  color: '#fff',
  border: 'none',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
  borderRadius: '100%',
  cursor: 'pointer',
  transition: 'opacity 0.3s',
  zIndex:9999
};

export default AMScrollToTopButton;
