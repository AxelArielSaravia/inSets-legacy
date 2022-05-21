import { memo } from "react";
import ChangeThemeButton from "./changeThemeButton.js";
import Link from "./Link.js";
import "./Header.scss";

export default memo(function Header() {
  return (
    <header className="header flex-row align-c justify-sb">
      <div className="title">
        <h1 className="fs-title">inSets</h1>
      </div>
      <div className="buttons flex-row align-c">
        <div className="fs-text c-secondary">
          <Link href="https://www.instagram.com/axarisar/">
            <i className="bi bi-instagram"></i>
          </Link>
        </div>
        <div className="fs-text c-secondary">
          <Link href="https://github.com/AxelArielSaravia/Estudio-II">
            <i className="bi bi-github"></i>
          </Link>
        </div>
        <div>
          <ChangeThemeButton />
        </div>
      </div>
    </header>
  );
})