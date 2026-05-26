import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('');

  const checkDeviceType = () => {
    const width = window.innerWidth
    if (width <= 768) {
      setDeviceType('mobile');
    } else if (width > 768 && width <= 1024) {
      setDeviceType('tablet');
    } else if (width > 1024 && width <= 1440) {
      setDeviceType('desktop');
    } else {
      setDeviceType('bigDesktop');
    }
  };

  useEffect(() => {
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);
  return deviceType;
};

export default useDeviceType;
