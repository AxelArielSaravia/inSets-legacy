import { memo, useCallback, useMemo } from "react";

import "./style.scss";

const calcPercent = (a, b, c) => {
    if (a <= 0) return 0;
    return  Math.round((Math.floor(b * 10) * Math.floor(c * 10)) / Math.floor(a * 10)) / 10;
} 


function Playback({
    duration,
    endPoint,
    startPoint,
    startTime,
    endTime,
    currentTime = 0,
    audioDispatch
}) {
    const startTimeValue = useMemo(() => calcPercent(duration, startTime, 100), [startTime, duration]);
    const endTimeValue = useMemo(() => 100 - calcPercent(duration, endTime, 100), [endTime, duration]);
    const startPointValue = useMemo(() => calcPercent(duration, startPoint, 100), [startPoint, duration])
    const endPointValue = useMemo(() => calcPercent(duration, endPoint, 100), [endPoint, duration])
    const currentTimeValue = useMemo(() => calcPercent(duration, currentTime, 100), [currentTime, duration])

    const onChangeEndTime = useCallback((e) => { 
        audioDispatch({type: "endTime/change", payload: calcPercent(100, 100 - e.target.value, duration)}) 
    }, [audioDispatch, duration])
    const onChangeStartTime = useCallback((e) => {
        audioDispatch({type: "startTime/change", payload: calcPercent(100, e.target.value, duration)}) 
    }, [audioDispatch, duration])


    return (
        <div className="playback--prev">
            <div className="playback flex-column align-c justify-c">
                <div 
                    className="playback_line" 
                    style={{
                        "--playback-start": startPointValue + "%",
                        "--playback-end": endPointValue + "%",
                    }}
                >
                    <div className="playback_point playback_start_point"/>
                    <progress
                        className="playback_point_line"
                        role="presentation"
                        max="100"
                        value={startPointValue}
                    />
                    <progress
                        className="playback_point_line playback_end_point_line"
                        role="presentation"
                        max="100"
                        value={100 -endPointValue}
                    />
                    <progress
                        className="playback_current_time"
                        role="presentation"
                        max="100"
                        value={currentTimeValue}
                    />
                    <div className="playback_point playback_end_point"/> 
                </div>
                <div className="playback_time playback_start-time">
                    <input 
                        className="playback_time_seak" 
                        type="range"
                        max="100"
                        step="0.1"
                        value={startTimeValue}
                        onChange={onChangeStartTime}
                    />
                    <progress 
                        className="playback_time_value" 
                        role="presentation"
                        max="100"
                        value={startTimeValue}
                    />
                </div>
                <div className="playback_time playback_end-time">
                    <input 
                        className="playback_time_seak" 
                        type="range"
                        step="0.1"
                        value={endTimeValue}
                        onChange={onChangeEndTime}
                    />
                    <progress 
                        className="playback_time_value" 
                        role="presentation"
                        max="100"
                        value={endTimeValue}
                    />
                </div>
            </div>
        </div>
    )
} 

export default memo(Playback);