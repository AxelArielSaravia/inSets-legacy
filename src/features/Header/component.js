import { memo } from "react";

import { IconSun, IconMoon, IconInstagram, IconGithub } from "../../icons/index";

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
        {theme === "dark" 
            ? <IconSun className="icon-l"/>
            : <IconMoon className="icon-l"/>
        }
    </button>
  );
}

function Header() {
    return (
        <header className="header flex-row align-c justify-sb">
            <div className="title" title="Why do you want to press this?">
                <Link href="https://insets-music.web.app/" self>
                    <h1 className="fs-title">inSets</h1>
                </Link>
            </div>
            <div className="buttons flex-row align-c">
                <div title="yes, this is my instagram">
                    <Link className="flex-column justify-c" href="https://www.instagram.com/axarisar/">
                        <IconInstagram className="icon-m"/>
                    </Link>
                </div>
                <div title="Documentation in GitHub">
                    <Link className="flex-column justify-c" href="https://github.com/AxelArielSaravia/inSets">
                        <IconGithub className="icon-m"/>
                    </Link>
                </div>
                <ChangeThemeButton/>
            </div>
        </header>
    );
};

export default memo(Header);