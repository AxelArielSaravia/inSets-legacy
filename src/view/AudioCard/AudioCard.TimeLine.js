import { useState, useEffect, useRef} from "react";
import "./AudioCard.TimeLine.scss";

const calcPercent = (a, b) => {
    if (a <= 0) return 0;
    return  Math.round((b * 100) / a);
}

export default function AudioCardTimeLine(props) {
    const startTime = props.startTime;
    const endTime = props.endTime;
    const duration = props.duration;
    const isPlaying = props.isPlaying;
    const startPoint = props.startPoint;
    const color = props.color;
    const [currentTime, setCurrentTime] = useState(startPoint);
    const interval = useRef(null);
    
    const startTimeStyle = { left: `${calcPercent(duration, startTime) - 100}%`  };
    const endTimeStyle = { right: `-${calcPercent(duration, endTime)}%` };
    const currentTimeStyle = { 
        left: duration === currentTime ? "-100%" :`${calcPercent(duration, currentTime) - 100}%`, 
        backgroundColor: props.APP_IS_STATERD && isPlaying ? color : "" 
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