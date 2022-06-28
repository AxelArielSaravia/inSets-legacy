import { useContext, useEffect } from "react";

import { ContextDisableAll } from "../DisableAllProvider.js";

import SetsButton from "./SetsButton.js";
import TimeButton from "./TimeButton.js";
import PannerButton from "./PannerButton.js";
import FilterButton from "./FilterButton.js";
import DelayButton from "./DelayButton.js";
import FadeTimeButton from "./FadeTimeButton.js";
import PlayBackRateButton from "./PlayBackRateButton.js";
import RCTButton from "./RCTButton.js";

import "./AsideConfig.scss";

const classText = "configs flex-column align-c";


export default function AsideConfig(props) {
    const active = props.active;
    const configButton = props.configButton;
    const onClick = props.onClick;

    const [disableAll, dispatchDisableAll] = useContext(ContextDisableAll);

    const setDisableAll = (name) => {
        dispatchDisableAll({type: "disable", typeEffect: name});
    }

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
                configButton === "TIME" ? (
                    <TimeButton/> 
                ) : configButton === "FADETIME" ? ( 
                    <FadeTimeButton/> 
                ) : configButton === "PANNER" ? ( 
                    <PannerButton 
                        disableAll={disableAll.panner} 
                        setDisableAll={setDisableAll}
                    /> 
                ) : configButton === "FILTER" ? ( 
                    <FilterButton 
                        disableAll={disableAll.filter} 
                        setDisableAll={setDisableAll}
                    /> 
                ) : configButton === "DELAY" ? ( 
                    <DelayButton 
                        disableAll={disableAll.delay} 
                        setDisableAll={setDisableAll}
                    /> 
                ) : configButton === "RATE" ? ( 
                    <PlayBackRateButton 
                        disableAll={disableAll.playBackRate} 
                        setDisableAll={setDisableAll}
                    /> 
                ) : configButton === "RCT" ? ( 
                    <RCTButton 
                        disableAll={disableAll.randomCurrentTime} 
                        setDisableAll={setDisableAll}
                    /> 
                ) : null
            }
        </div>
    );
}