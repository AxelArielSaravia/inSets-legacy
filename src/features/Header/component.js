import { memo } from "react";

import { useThemeChanger } from "./hooks.js";

import "./style.scss";

function Link(props) {
  return (
      <a
          className={props.className}
          href={props.href} 
          target={props.self ? "_self" : "_blank"} 
          rel="noreferrer noopener"
      >
          {props.children}
      </a>
  );
} 

function ChangeThemeButton() {
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

function Header() {
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
        <ChangeThemeButton/>
      </div>
    </header>
  );
};

export default memo(Header);