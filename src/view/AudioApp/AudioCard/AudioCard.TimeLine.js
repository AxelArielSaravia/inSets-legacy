import { useState, useEffect, useRef} from "react";
import "./AudioCard.TimeLine.scss";

const calcPercent = (a,b) => {
    return  Math.floor((b * 100) / a);
}

export default function AudioCardTimeLine(props) {
    const startTimePoint = props.startTimePoint;
    const endTimePoint = props.endTimePoint;
    const duration = props.duration;
    const isPlaying = props.isPlaying;
    const randomCurrentTime = props.randomCurrentTime;
    const color = props.color;
    
    const [currentTime, setCurrentTime] = useState(startTimePoint);
    const interval = useRef(null);

    const startPointStyle = { left: `${calcPercent(duration, startTimePoint) - 100}%`  };
    const endPointStyle = { right: `-${calcPercent(duration, endTimePoint)}%` };
    const currentTimeStyle = { 
        left: `${calcPercent(duration, currentTime) - 100}%`, 
        backgroundColor: props.appIsPlaying && isPlaying ? color : "" 
    };
    
    useEffect(() => {
        if (!isPlaying) {
            setCurrentTime((state) => {
                if (state !== startTimePoint)
                    return startTimePoint;
                else 
                    return state;
            });
        }
    }, [startTimePoint, isPlaying]);


    useEffect(() => {   
        if (isPlaying) {
            setCurrentTime(() => randomCurrentTime);
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
            setCurrentTime(() => startTimePoint);
        }

    }, [isPlaying, randomCurrentTime, color]);

    return (
        <div className="audioCard-timeLine">
            <div className="timeLine" style={startPointStyle}/>
            <div className="currentTime"  style={currentTimeStyle}/>
            <div className="timeLine" style={endPointStyle}/>
        </div>
    );
}
