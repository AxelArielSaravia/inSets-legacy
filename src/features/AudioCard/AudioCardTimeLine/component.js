import { useState, useEffect, useRef} from "react";

import { calcPercent } from "../../utils.js";

import "./style.scss";

export default function AudioCardTimeLine({
    startTime, 
    endTime, 
    duration, 
    isPlaying, 
    startPoint, 
    color,
    APP_IS_STATERD
}) {
    const [currentTime, setCurrentTime] = useState(startPoint);
    const interval = useRef(null);
    
    const startTimeStyle = { left: `${calcPercent(duration, startTime) - 100}%`  };
    const endTimeStyle = { right: `-${calcPercent(duration, endTime)}%` };
    const currentTimeStyle = { 
        left: duration === currentTime ? "-100%" :`${calcPercent(duration, currentTime) - 100}%`, 
        backgroundColor: APP_IS_STATERD && isPlaying ? color : "" 
    };
    

    useEffect(() => {
        if (!isPlaying) {
            setCurrentTime((state) => {
                if (state !== startTime)
                    return startTime;
                else 
                    return state;
            });
        }
    }, [startTime, isPlaying]);


    useEffect(() => {   
        if (isPlaying) {
            setCurrentTime(() => startPoint);
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
            interval.current = setInterval(() => {
                setCurrentTime(state => state + 0.2);
            }, 200);
        } else {
            if (interval.current) {
                clearTimeout(interval.current);
                interval.current = null;
            }
            setCurrentTime(() => startTime);
        }

    }, [isPlaying, startPoint, color]);

    return (
        <div className="audioCard-timeLine">
            <div className="timeLine" style={startTimeStyle}/>
            <div className="currentTime"  style={currentTimeStyle}/>
            <div className="timeLine" style={endTimeStyle}/>
        </div>
    );
}