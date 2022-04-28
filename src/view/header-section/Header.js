import { memo } from "react";
import ChangeThemeButton from "./changeThemeButton.js";
import "./Header.scss";

export default memo(function Header() {
  console.log("Update Header"); //DEBUGGER
  return (
    <header className="header flex-row align-c justify-sb">
      <div className="title">
        <h1 className="fs-title">inSets</h1>
      </div>
      <div className="buttons flex-row align-c">
        <div className="fs-text c-secondary">
          <a href="https://www.instagram.com/axarisar/" target="_blank" rel="noreferrer noopener">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        <div className="fs-text c-secondary">
          <a href="https://github.com/AxelArielSaravia/Estudio-II" target="_blank" rel="noreferrer noopener">
            <i className="bi bi-github"></i>
          </a>
        </div>
        <div>
          <ChangeThemeButton />
        </div>
      </div>
    </header>
  );
})