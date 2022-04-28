import useThemeChanger from "../utils/useThemeChanger.js";

import "./changeThemeButton.scss";

export default function ChangeThemeButton() {
  const [ theme, handleThemeChangerClick ] = useThemeChanger();

  return (
    <button className="change-theme-button fs-text-l" type="button" onClick={handleThemeChangerClick}>
      { theme === "dark" 
        ? <i className="bi bi-brightness-high-fill"></i>
        : <i className="bi bi-moon-fill"></i> 
      }
    </button>
  );
}
