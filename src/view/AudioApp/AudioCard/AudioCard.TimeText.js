import { useState } from "react";
import "./AudioCard.TimeText.scss";

const isMinorThanTen = (num) => num < 10 ? "0" + num : num;

const durationToTime = (val) => {
    val = Math.floor(val);
    let sec = val % 60;
    val = Math.floor((val-sec) / 60);
    let min = val % 60;
    let hr = Math.floor((val-min) / 60);

    let str = (hr > 0) ? hr + ":" : "";
    str += isMinorThanTen(min) + ":" + isMinorThanTen(sec);
    return str;
}

const disableWheel = (e) => {
    e.preventDefault();
    return false;
}

export default function AudioCardTimeText(props) {
    const [point, setPoint] = useState(0);
    const handleOnWheel = (e) => {
        if (e.deltaY < 0) props.add(props.data)
        else props.subtract(props.data);
    }

    const mouseEnter = () => {
        document.getElementById("files").onwheel = disableWheel;
    }
    const mouseOut = () => {
        document.getElementById("files").onwheel = null;
    }
    
    const handleTouchMove = (e) => {
        let x = e.touches[0].clientX;
        if (x > point) 
            props.add(props.data);
        else if (x < point)
        props.subtract(props.data);
    }
    const handleTouchStart = (e) => { setPoint(() => e.touches[0].clientX)}

    const t = durationToTime(props.time);
    return (
        <div 
            className="audioCard-time flex-column justify-c" 
            onWheel={handleOnWheel} 
            onMouseEnter={mouseEnter} 
            onMouseLeave={mouseOut} 
            onTouchStart={handleTouchStart} 
            onTouchMove={handleTouchMove}
        >
            <button
                className="audioCard-time-button flex-column justify-c align-c" 
                type="button"
                onClick={() => props.add(props.data)}
            >
                <i className="bi bi-caret-up-fill flex-column justify-c align-c"/>
            </button>
            <span className="fs-text">{t}</span>
            <button
                className="audioCard-time-button" 
                type="button"
                onClick={() => props.subtract(props.data)}
            >
                <i className="bi bi-caret-down-fill flex-column justify-c align-c"/>
            </button>
        </div>
    );
}