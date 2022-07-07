import useThemeChanger from "../useThemeChanger.js";

import "./changeThemeButton.scss";

export default function ChangeThemeButton() {
  const [ theme, handleThemeChangerClick ] = useThemeChanger();

  return (
    <button className="flex-column justify-c change-theme-button fs-text-l" type="button" onClick={handleThemeChangerClick}>
      { theme === "dark" 
        ? <i className="bi bi-brightness-high-fill" title="ligth theme"></i>
        : <i className="bi bi-moon-fill" title="dark theme"></i> 
      }
    </button>
  );
}
