import { useState } from "react";
import "./style.scss";

const disableWheel = (e) => {
    e.preventDefault();
    return false;
}
const className = "touchButton justify-c align-c";

export default function TouchButton({
    add, 
    data, 
    disable, 
    textClass = "",
    textStyle = "", 
    touch = false,
    subtract, 
    orientation, 
    output = "",
    scroll = false
}) {
    const [point, setPoint] = useState(0);

    const handleOnWheel = (e) => {
        if (e.deltaY < 0) add(data)
        else subtract(data);
    }

    const mouseEnter = () => {
        document.getElementById("files").onwheel = disableWheel;
        if (disable) {
            document.getElementById(disable).onwheel = disableWheel;
        }
    }

    const mouseOut = () => {
        document.getElementById("files").onwheel = null;
        if (disable) {
            document.getElementById(disable).onwheel = null;
        }
    }
    
    const handleTouchMove = (e) => {
        let x = e.touches[0].clientX;
        if (x > point) {
            add(data);
        } else if (x < point) {
            subtract(data);
        }
        setPoint(() => e.touches[0].clientX)
    }
    const handleTouchStart = (e) => { setPoint(() => e.touches[0].clientX) }
    const _className = orientation === "row" ?  className + " flex-row-reverse" : className + " flex-column"; 
    return (
        <div 
            className={_className} 
            onWheel={scroll ? handleOnWheel : null} 
            onMouseEnter={scroll ? mouseEnter : null} 
            onMouseLeave={scroll ? mouseOut : null} 
            onTouchStart={touch ? handleTouchStart : null} 
            onTouchMove={touch ? handleTouchMove : null}
        >
            <button
                className="touchButton-action flex-column justify-c align-c" 
                type="button"
                onClick={() => add(data)}
            >
                {orientation === "row"
                 ? <i className="bi bi-caret-right-fill flex-column justify-c align-c"/>
                 : <i className="bi bi-caret-up-fill flex-column justify-c align-c"/>
                }
            </button>
            <p className={"fs-text text-center " + textClass} style={textStyle? textStyle : {}}>
                {output}
            </p>
            <button
                className="touchButton-action flex-column justify-c align-c" 
                type="button"
                onClick={() => subtract(data)}
            >
                {orientation === "row"
                 ? <i className="bi bi-caret-left-fill flex-column justify-c align-c"/>
                 : <i className="bi bi-caret-down-fill flex-column justify-c align-c"/>
                }
            </button>
        </div>
    );
}