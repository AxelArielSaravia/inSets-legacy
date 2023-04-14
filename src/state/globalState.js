/*-
GlobalDelay :: {
    areAllDisable: boolean,
    timeMin: number,
    timeMax: number,
    feedbackMin: number,
    feedbackMax: number
}

GlobalFilter :: {
    areAllDisable: boolean,
    frequencyMax: number,
    frequencyMin: number,
    qMax: number,
    qMin: number,
    types: ["lowpass"?, "highpass"?, "bandpass"?, "notch"?]
}

GlobalPanner :: {
    areAllDisable: boolean,
    xMax: number,
    xMin: number,
    yMax: number,
    yMin: number,
    zMax: number,
    zMin: number
}

GlobalPlaybackRate :: {
    areAllDisable: boolean,
    max: number,
    min: number
}

GlobalTimeInterval :: {
    min: number,
    max: number
}

GlobalRandomPoint :: {
    areAllDisable: boolean
}

EventsForEachSet :: {
    arrOfEvents: Array<number>,
    sumOfAllEvents: number
}
*/

/*
LocalStorageState :: {
    delay: GlobalDelay,
    fadeIn: number,
    fadeOut: number,
    fadeTime: number,
    filter: GlobalFilter,
    panner: GlobalPanner,
    playbackRate: GlobalPlaybackRate,
    randomEndPoint: GlobalRandomPoint,
    randomStartPoint: GlobalRandomPoint,
    timeInterval: GlobalTimeInterval
}

GlobalState :: {
    ...LocalStorageState,
    audioContext: undefined | AudioContext,
    audioList: Map<string, AudioState>,
    isStarted: boolean,
    startedId: string,
    eventsForEachSet: EventsForEachSet
}
*/

import {EmptyObject} from "../utils.js";

/*-
GlobalState: GlobalState
*/
const GlobalState = Object.seal({
    audioContext: undefined,
    audioList: new Map(),
    delay: EmptyObject,
    eventsForEachSet: Object.seal({
        arrOfEvents: [1],
        sumOfAllEvents: 1
    }),
    fadeIn: 0,
    fadeOut: 0,
    filter: EmptyObject,
    isStarted: false,
    panner: EmptyObject,
    playbackRate: EmptyObject,
    randomEndPoint: EmptyObject,
    randomStartPoint: EmptyObject,
    startedId: "",
    sumOfAllAudiosEvents: 0,
    timeInterval: EmptyObject
});

export default GlobalState;