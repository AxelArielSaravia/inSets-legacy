//UTILS
type Maybe<T> = T | undefined;

type Some<Obj extends object> = {[K in keyof Obj]?: Obj[K]};

type Freeze<Obj extends object> = {
    readonly [K in keyof Obj]: Obj[K] extends object
        ? Freeze<Obj[K]>
        : Obj[K]
}

type Panic = never;

type Keys<Obj extends object> = keyof Obj;

type Values<Obj extends object> = Obj[keyof Obj];

type UndefinedFunction = () => undefined;

type Async<fn extends () => {} > = fn;


//STATES

type Effects = (
    "delay"
    | "filter"
    | "panner"
    | "playbackRate"
    | "randomEndPoint"
    | "randomStartPoint"
);

type GlobalDefaultKeys = (
    "delay"
    | "fadeIn"
    | "fadeOut"
    | "filter"
    | "panner"
    | "playbackRate"
    | "randomEndPoint"
    | "randomStartPoint"
    | "timeInterval"
);


type GlobalDelay = {
    areAllDisable: boolean,
    timeMin: number,
    timeMax: number,
    feedbackMin: number,
    feedbackMax: number,
}

type LocalStorageFilter = {
    areAllDisable: boolean,
    frequencyMax: number,
    frequencyMin: number,
    qMax: number,
    qMin: number,
    bandpass: boolean,
    highpass: boolean,
    lowpass: boolean,
    notch: boolean,
};

type GlobalFilter = (
    LocalStorageFilter
    & {
        types: Array<"bandpass" | "highpass" | "lowpass" | "notch">
    }
);

type GlobalPanner = {
    areAllDisable: boolean,
    xMax: number,
    xMin: number,
    yMax: number,
    yMin: number,
    zMax: number,
    zMin: number,
}

type GlobalPlaybackRate = {
    areAllDisable: boolean,
    max: number,
    min: number,
}

type GlobalTimeInterval = {
    min: number,
    max: number,
}

type GlobalRandomPoint = {
    areAllDisable: boolean,
};

type EventsForEachSet = {
    arrOfEvents: Array<number>,
    sumOfAllEvents: number,
}

type LocalStorageState = {
    delay: GlobalDelay,
    fadeIn: number,
    fadeOut: number,
    filter: LocalStorageFilter,
    panner: GlobalPanner,
    playbackRate: GlobalPlaybackRate,
    randomEndPoint: GlobalRandomPoint,
    randomStartPoint: GlobalRandomPoint,
    timeInterval: GlobalTimeInterval,
}

type GlobalState = LocalStorageState & {
    audioContext: Maybe<AudioContext>,
    audioList: Map<string, AudioState>,
    eventsForEachSet: EventsForEachSet,
    filter: GlobalFilter,
    generativeState: {
        audiosSet: Some<{[i: string]: true}>,
        playAudiosFromSet: boolean,
    },
    isStarted: boolean,
    startedId: string,
    sumOfAllAudiosEvents: number,
}

type AudioState = {
    audioEngine: HTMLAudioElement,
    audioEvents: number,
    configurationIsOpen: boolean,
    delayIsDisable: boolean,
    dispatch: React.Dispatch<Maybe<AudioViewAction>>,
    duration: number,   //seconds
    endPoint: number,   //seconds
    endTime: number,    //seconds
    filterIsDisable: boolean,
    id: string,
    isPlaying: boolean,
    outputGain: Maybe<GainNode>,
    pannerIsDisable: boolean,
    playbackRate: number,
    playbackRateIsDisable: boolean,
    randomEndPointIsDisable: boolean,
    randomStartPointIsDisable: boolean,
    source: MediaElementAudioSourceNode,
    startPoint: number, //seconds
    startTime: number,  //seconds
    title: string,
    type: string,
    volume: number,
};

type AudioViewState = {
    audioEvents: number,
    color: string,
    configurationIsOpen: boolean,
    currentTime: number,
    delayIsDisable: boolean,
    duration: number,
    endPoint: number,
    endTime: number,
    filterIsDisable: boolean,
    id: string,
    isPlaying: boolean,
    pannerIsDisable: boolean,
    playbackRateIsDisable: boolean,
    randomEndPointIsDisable: boolean,
    randomStartPointIsDisable: boolean,
    startPoint: number,
    startTime: number,
    title: string,
    volume: number,
}

type AppState = {
    isStarted: boolean,
    audiosSet:  Some<{[i: string]: true}>,
    playColor: string,
    playAudiosFromSet: boolean,
};

type AudioListState = {
    completedAudioList: Some<{[i: string]: true}>,
    completedAudioListSize: number,
    loadedAudioList:  Some<{[i: string]: true}>,
    loadedAudioListSize: number,
};

type GeneralDisableState = {
    allDelaysAreDisabled: {
        global: boolean,
        value: boolean
    },
    allFiltersAreDisabled: {
        global: boolean,
        value: boolean
    },
    allPannersAreDisabled: {
        global: boolean,
        value: boolean
    },
    allPlaybackRatesAreDisabled: {
        global: boolean,
        value: boolean
    },
    allRandomEndPointsAreDisabled: {
        global: boolean,
        value: boolean
    },
    allRandomStartPointsAreDisabled: {
        global: boolean,
        value: boolean
    }
};

type PanelConfigState = {
    isPanelConfigVisible: boolean,
    isPanelButtonsVisible: boolean,
    isPanelVisible: boolean,
    panelSelected: (
        ""
        | "SETS"
        | "TIME"
        | "FADES"
        | "PANNER"
        | "FILTER"
        | "DELAY"
        | "RATE"
        | "RSP"
        | "REP"
    );
};

//ACTIONS

type AppAction = (
    {type: "start"}
    | {type: "stop"}
    | {
        type: "newExecution",
        payload: {
            audiosSet:  Some<{[i: string]: true}>,
            playAudiosFromSet: boolean
        }
    }
);

type DelayAction = {
    type: (
        "reset"
        | "time/changeMax"
        | "time/changeMin"
        | "feedback/changeMax"
        |"feedback/changeMin"
    ),
    payload: GlobalDelay
};

type FadeAction = {
    type: "reset" | "fadeIn/change" | "fadeOut/change",
    payload: {fadeIn: number, fadeOut: number}
};

type FilterAction = {
    type: (
        "reset"
        | "frequency/changeMax"
        | "frequency/changeMin"
        | "q/changeMax"
        | "q/changeMin"
        | "bandpass/switch"
        | "highpass/switch"
        | "lowpass/switch"
        | "notch/switch"
    ),
    payload: LocalStorageFilter

};

type PannerAction = {
    type: (
        "reset"
        | "x/changeMax"
        | "x/changeMin"
        | "y/changeMax"
        | "y/changeMin"
        | "z/changeMax"
        | "z/changeMin"
    ),
    payload: GlobalPanner
};

type PlaybackRateAction = {
    type: "reset" | "max/change" | "min/change",
    payload: GlobalPlaybackRate
};

type TimeAction = {
    type: "reset" | "max/change" | "min/change",
    payload: GlobalTimeInterval
};

type AudioListAction = {
    type: "addLoading" | "addCompleted" | "clear" | "delete" | "loadingError",
    payload: string
};

type AudioViewAction = (
        {type: "audioEvents/add"}
        | {type: "audioEvents/subtract"}
        | {type: "color/change", payload: string}
        | {type: "color/default"}
        | {type: "configuration/toggle"}
        | {type: "currentTime/change", payload: number}
        | {
            type: "effect",
            payload: {
                disable: boolean
                effect: Effects
            }
        }
        | {type: "endTime/change", payload: number}
        | {type: "play"}
        | {
            type: "points/change",
            payload: {
                endPoint: number,
                startPoint: number
            }
        }
        | {type: "startTime/change", payload: number}
        | {type: "stop"}
        | {type: "volume/change", payload: number}
);

type GeneralDisableAction = {
    type: (
        "disable/delay"
        | "disable/filter"
        | "disable/panner"
        | "disable/playbackRate"
        | "disable/RandomEndpoint"
        | "disable/RandomStartpoint"
        | "enable/delay"
        | "enable/filter"
        | "enable/panner"
        | "enable/playbackRate"
        | "enable/RandomEndpoint"
        | "enable/RandomStartpoint"
    ),
    effect:  Capitalize<Effects>,
    payload: {global: boolean, value: boolean}
};

type PanelConfigAction = {
    type: "panel/change" | "panel/switch" | "panel/close",
    payload: (
        ""
        | "SETS"
        | "TIME"
        | "FADES"
        | "PANNER"
        | "FILTER"
        | "DELAY"
        | "RATE"
        | "RSP"
        | "REP"
    )
};

type SetsAction = {
    type: "reset" | "update" | "addEvent" | "removeEvent",
    payload: EventsForEachSet
};

type SumOfAllAudiosEventsAction = {
    type: "add" | "subtract" | "clear"
};

//OVERLOADS

interface Node {
    cloneNode<T extends Node>(a?: boolean): T
}

interface HTMLElement {
    get firstElementChild<T extends HTMLElement>(): T | null
}

interface Window {
    webkitAudioContext: Maybe<AudioContext>
}
