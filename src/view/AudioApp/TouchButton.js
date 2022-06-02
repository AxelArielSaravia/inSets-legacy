import { useState } from "react";
import "./TouchButton.scss";

const disableWheel = (e) => {
    e.preventDefault();
    return false;
}

export default function TouchButton(props) {
    const [point, setPoint] = useState(0);

    const handleOnWheel = (e) => {
        if (e.deltaY < 0) props.add(props.data)
        else props.subtract(props.data);
    }

    const mouseEnter = () => {
        document.getElementById("files").onwheel = disableWheel;
        if (props.disable) {
            document.getElementById(props.disable).onwheel = disableWheel;
        }
    }

    const mouseOut = () => {
        document.getElementById("files").onwheel = null;
        if (props.disable) {
            document.getElementById(props.disable).onwheel = null;
        }
    }
    
    const handleTouchMove = (e) => {
        let x = e.touches[0].clientX;
        if (x > point) 
            props.add(props.data);
        else if (x < point)
        props.subtract(props.data);
    }
    const handleTouchStart = (e) => { setPoint(() => e.touches[0].clientX) }


    return (
        <div 
            className="touchButton flex-column justify-c align-c" 
            onWheel={handleOnWheel} 
            onMouseEnter={mouseEnter} 
            onMouseLeave={mouseOut} 
            onTouchStart={handleTouchStart} 
            onTouchMove={handleTouchMove}
        >
            <button
                className="touchButton-action flex-column justify-c align-c" 
                type="button"
                onClick={() => props.add(props.data)}
            >
                <i className="bi bi-caret-up-fill flex-column justify-c align-c"/>
            </button>
            <span className="fs-text">{props.output}</span>
            <button
                className="touchButton-action flex-column justify-c align-c" 
                type="button"
                onClick={() => props.subtract(props.data)}
            >
                <i className="bi bi-caret-down-fill flex-column justify-c align-c"/>
            </button>
        </div>
    );
}