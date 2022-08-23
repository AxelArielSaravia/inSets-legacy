import { useState, useEffect, useRef, useMemo} from "react";

import { calcPercent } from "../../utils.js";

import "./style.scss";

export default function AudioCardTimeLine({
    startTime, 
    endTime, 
    duration, 
    isPlaying, 
    startPoint,
    playBackRate,
    color,
    APP_IS_STATERD
}) {
    const [currentTime, setCurrentTime] = useState(startPoint);
    const interval = useRef(null);
    
    const startTimeStyle = useMemo(() => ({ left: `${calcPercent(duration, startTime) - 100}%` }), [duration, startTime]);
    const endTimeStyle = useMemo(() => ({ right: `-${calcPercent(duration, endTime)}%` }), [duration, endTime]);
    const currentTimeStyle = useMemo(() => ({ 
        left: duration + 0.1 <= currentTime ? startTimeStyle.left :`${calcPercent(duration, currentTime) - 100}%`, 
        backgroundColor: APP_IS_STATERD && isPlaying ? color : "" 
    }), [duration, currentTime, isPlaying, color, startTimeStyle, APP_IS_STATERD]);

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
            }, 200 / playBackRate);
        } else {
            if (interval.current) {
                clearTimeout(interval.current);
                interval.current = null;
            }
            setCurrentTime(() => startTime);
        }

    }, [isPlaying, startPoint, playBackRate]);

    return (
        <div className="audioCard-timeLine">
            <div className="timeLine" style={startTimeStyle}/>
            <div className="currentTime"  style={currentTimeStyle}/>
            <div className="timeLine" style={endTimeStyle}/>
        </div>
    );
}