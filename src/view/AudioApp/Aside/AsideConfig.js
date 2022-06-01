import { useEffect } from "react";
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
        <div className={active ? classText : classText + " inactive"}>
            <button 
                type="button" 
                className="delete-button"
                onClick={onClick}
            >
                <i className="flex-row align-c fs-text-l bi bi-x"></i>
            </button>
            {   configButton === "SETS"? (<h3>Sets</h3>) :
                configButton === "TIME" ? (<h3>Time</h3>) :
                configButton === "PANNER" ? (<h3>Panner</h3>) :
                configButton === "FILTER" ? (<h3>Filter</h3>) :
                configButton === "DELAY" ? (<h3>Delay</h3>) :
                configButton === "RATE" ? (<h3>Rate</h3>) :
                configButton === "RCT" ? (<h3>RCT</h3>) :
                configButton === "FADETIME" ? (<h3>Fade Time</h3>) :
                <></>
            }
        </div>
    );
} 