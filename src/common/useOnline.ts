import { useEffect, useState } from 'react';

const useOnline = () => {
  const [online, setOnlineState] = useState(navigator.onLine);

  useEffect(() => {
    const setOnline = () => setOnlineState(true);
    const setOffline = () => setOnlineState(false);

    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return online;
};

export default useOnline;
