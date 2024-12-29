import { useEffect, useState } from "react";

const useLocalStorage = (key, defData) => {
  const [state, setState] = useState(() => {
    try {
      const localData = localStorage.getItem(key);
      return localData ? JSON.parse(localData) : defData;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return defData; 
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
