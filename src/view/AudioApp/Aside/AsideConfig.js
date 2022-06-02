import { useEffect } from "react";

import SetsButton from "./SetsButton.js";
import AsideButton from "./AsideButton.js";

import "./AsideConfig.scss";

const classText = "configs flex-column align-c";

export default function AsideConfig(props) {
    let active = props.active;
    let configButton = props.configButton;
    let onClick = props.onClick;

    useEffect(() => {
        const el = (e) => { 
          if (e.target.matches(".configs")
            || e.target.matches(".configs *")
            || e.target.matches(".panel")
            || e.target.matches(".panel *")
          ) {
            return;
          }
          onClick();
        }

        if (active) {
            document.addEventListener('click', el);
            return () => {
                document.removeEventListener('click', el);
            } 
        }
      }, [active]);
    
    return (
        <div id="configs" className={active ? classText : classText + " inactive"}>
            <button 
                type="button" 
                className="delete-button"
                onClick={onClick}
            >
                <i className="flex-row align-c fs-text-l bi bi-x"></i>
            </button>
            {   configButton === "SETS"? (
                    <SetsButton audioList_size={props.audioList_size}/>
                ) :
                configButton === "TIME" ? (<AsideButton title="Time"/>) :
                configButton === "PANNER" ? (<AsideButton title="Panner"/>) :
                configButton === "FILTER" ? (<AsideButton title="Filter"/>) :
                configButton === "DELAY" ? (<AsideButton title="Delay"/>) :
                configButton === "RATE" ? (<AsideButton title="Rate"/>) :
                configButton === "RCT" ? (<AsideButton title="RCT"/>) :
                configButton === "FADETIME" ? (<AsideButton title="Fade Time"/>) :
                <></>
            }
        </div>
    );
} 