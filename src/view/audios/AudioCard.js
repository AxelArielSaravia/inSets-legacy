import { useEffect, useState } from "react";
import Switcher from "./AudioCardSwitch.js"

import "./AudioCard.scss"; 

function Slider() {
    return (
        <div className="slider">
            <div id="audio-time-bar" class="audio-slider-bar"></div>
            <div id="audio-time-end" class="audio-end-slider-bar"></div>
        </div>
    );
}

export default function AudioCard(props) {
    const [panner, setPanner] = useState(props.panner);
    const [delay, setDelay] = useState(props.delay);
    const [filter, setFilter] = useState(props.filter);
    const [playBackRate, setPlayBackRate] = useState(props.playBackRate);

    useEffect(() => { setPanner(() => props.panner) }, [props.panner]);
    useEffect(() => { setDelay(() => props.delay) }, [props.delay]);
    useEffect(() => { setFilter(() => props.filter) }, [props.filter]);
    useEffect(() => { setPlayBackRate(() => props.playBackRate) }, [props.playBackRate]);

    return (    
        <div className="audioCard">
            <div className="audioCard-name">
                <h4 className="fs-text ellipsis">Alexander Borodin Piano Trio in D Major asdasd ssad sadad</h4>
            </div>
            <div className="flex-row">
                <div className="flex-row align-c justify-c" style={{width: "12%"}}>
                    <button type="button" style={{border:"1px solid white", borderRadius:"5px"}}>
                        <i className="flex-row align-c fs-text-l bi bi-play-fill"></i>
                    </button>
                </div>
                <div className="flex-column"style={{width: "100%"}}>
                    <div className="audioCard-options flex-row align-c ">
                        <div className="audioCard-pluggins flex-row align-c justify-sb">
                            <Switcher name="panner" />
                            <Switcher name="delay"/>
                            <Switcher name="filter"/>
                            <Switcher name="rate"/>
                        </div>
                        <div className="audioCard-volume flex-row align-c" style={{padding: "0 10px"}}>
                            {/*<i className="bi bi-volume-down" style={{fontSize:"200%"}}></i>*/}
                            <div>   
                                <i className="bi bi-volume-up flex-row align-c" style={{fontSize:"200%"}}></i>
                            </div>
                            <input type="range" min="0" max="11" step="1" style={{width: "70%", maxWidth:"100px"}}></input>
                        </div>
                    </div>
                    <div className="flex-row align-c" style={{width: "100%", paddingTop:"10px"}}>
                        <div className="flex-row align-c" style={{width: "100%"}}> 
                            <span className="fs-text">00:00</span>
                            <input type="range" min="0" max="11" step="1" style={{width: "100%"}}></input>
                            <span className="fs-text">33:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}