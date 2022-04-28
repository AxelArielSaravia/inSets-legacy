import { useEffect, useState } from 'react';

export default function useThemeChanger() {
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") !== null 
    ? localStorage.getItem("theme")
    : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? "dark" 
    : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.body.className = "dark";
    } else {
      document.body.className = "light";
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChangerClick = () => {
    setTheme((state) => {
      return state === "dark" ? "light" : "dark"
    });
  }

  return [theme, handleThemeChangerClick];
}
