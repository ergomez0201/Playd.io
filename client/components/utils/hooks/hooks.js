import { useState, useEffect } from 'react';
import fetcher from '../fetcher/fetcher';

async function checkLogin() {
  const userID = localStorage.getItem('userID');
  if (!userID) return false;

  const { data, error } = await fetcher(`/login?userID=${userID}`);
  return data;
}

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const storageEvent = (event) => {
    console.log('storage even fired: ', event.storageArea);
    if (!event.storageArea.userID) {
      setIsLoggedIn(false);
    } else {
      checkLogin().then((isAuth) => setIsLoggedIn(isAuth));
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkLogin();
      return isAuth;
    };

    checkAuth().then((isAuth) => {
      setIsLoggedIn(isAuth);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('storage', storageEvent);
    return () => {
      window.removeEventListener('storage', storageEvent);
    };
  }, []);

  return [isLoggedIn, setIsLoggedIn];
}
