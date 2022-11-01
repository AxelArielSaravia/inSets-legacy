import {useCallback, useMemo} from "react";

import "./style.scss";

function persent(a, b, c) {
    if (a <= 0) {
        return 0;
    }
    return Math.round((Math.floor(b * 10) * Math.floor(c * 10)) / Math.floor(a * 10)) / 10;
}

function EndTimeValue({
    audioDispatch,
    duration,
    endTime
}) {
    const endTimeValue = 100 - persent(duration, endTime, 100);

    const onChangeEndTime = useCallback(function onChangeEndTime(e) {
        audioDispatch({
            type: "endTime/change",
            payload: persent(100, 100 - e.target.value, duration)
        });
    },[audioDispatch, duration]);

    return (
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
    );
}

function StartTimeValue({
    audioDispatch,
    duration,
    startTime
}) {
    const startTimeValue = persent(duration, startTime, 100);

    const onChangeStartTime = useCallback(function onChangeStartTime(e) {
        audioDispatch({
            type: "startTime/change",
            payload: persent(100, e.target.value, duration)
        });
    },[audioDispatch, duration]);

    return (
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
    );
}

function StartPointValue({startPointValue}) {
    return (
        <progress
            className="playback_point_line"
            role="presentation"
            max="100"
            value={startPointValue}
        />
    );
}

function CurrentTimeValue({duration, currentTime}) {
    const currentTimeValue = persent(duration, currentTime, 100);
    return (
        <progress
            className="playback_current_time"
            role="presentation"
            max="100"
            value={currentTimeValue}
        />
    );
}

function EndPointValue({endPointValue}) {
    return (
        <progress
            className="playback_point_line playback_end_point_line"
            role="presentation"
            max="100"
            value={100 - endPointValue}
        />
    );
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

    const startPointValue = useMemo(
        () => persent(duration, startPoint, 100),
        [startPoint, duration]
    );
    const endPointValue = useMemo(
        () => persent(duration, endPoint, 100),
        [endPoint, duration]
    );

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
                    <StartPointValue startPointValue={startPointValue}/>
                    <EndPointValue endPointValue={endPointValue}/>
                    <CurrentTimeValue duration={duration} currentTime={currentTime}/>
                    <div className="playback_point playback_end_point"/>
                </div>
                <StartTimeValue
                    audioDispatch={audioDispatch}
                    duration={duration}
                    startTime={startTime}
                />
                <EndTimeValue
                    audioDispatch={audioDispatch}
                    duration={duration}
                    endTime={endTime}
                />
            </div>
        </div>
    );
}

export default Playback;