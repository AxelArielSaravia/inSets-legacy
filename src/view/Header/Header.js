import { memo } from "react";
import ChangeThemeButton from "./changeThemeButton.js";
import Link from "./Link.js";
import "./Header.scss";

export default memo(function Header() {
  return (
    <header className="header flex-row align-c justify-sb">
      <div className="title" title="Why do you want to press this?">
      <Link href="https://insets-music.web.app/" self >
        <h1 className="fs-title">inSets</h1>
      </Link>
      </div>
      <div className="buttons flex-row align-c">
        <div title="yes, this is my instagram">
          <Link className="fs-text" href="https://www.instagram.com/axarisar/">
            <i className="bi bi-instagram flex-column justify-c"></i>
          </Link>
        </div>
        <div title="Documentation in GitHub">
          <Link className="fs-text" href="https://github.com/AxelArielSaravia/inSets">
            <i className="bi bi-github flex-column justify-c"></i>
          </Link>
        </div>
        <ChangeThemeButton />
      </div>
    </header>
  );
})