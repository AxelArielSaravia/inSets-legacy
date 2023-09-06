// @ts-check
import {globalDefault} from "./globalDefault.js";
import globalState from "./globalState.js";
import {EmptyObject} from "../utils.js";

/**
@type {() => GlobalDelay} */
function createDefaultGlobalDelay() {
    return {
        areAllDisable: globalDefault.delay.areAllDisable,
        feedbackMax: globalDefault.delay.feedbackMax,
        feedbackMin: globalDefault.delay.feedbackMin,
        timeMax: globalDefault.delay.timeMax,
        timeMin: globalDefault.delay.timeMin
    };
}

/**
@type {() => GlobalDelay} */
function createGlobalDelay() {
    return {
        areAllDisable: globalState.delay.areAllDisable,
        feedbackMax: globalState.delay.feedbackMax,
        feedbackMin: globalState.delay.feedbackMin,
        timeMax: globalState.delay.timeMax,
        timeMin: globalState.delay.timeMin
    };
}

/**
@type {() => LocalStorageFilter} */
function createDefaultLocalStorageFilter() {
    return {
        areAllDisable: globalDefault.filter.areAllDisable ,
        frequencyMax: globalDefault.filter.frequencyMax,
        frequencyMin: globalDefault.filter.frequencyMin,
        qMax: globalDefault.filter.qMax,
        qMin: globalDefault.filter.qMin,
        bandpass: globalDefault.filter.bandpass,
        highpass: globalDefault.filter.highpass,
        lowpass: globalDefault.filter.lowpass,
        notch: globalDefault.filter.notch
    };
}

/**
@type {() => LocalStorageFilter} */
function createLocalStorageFilter() {
    return {
        areAllDisable: globalState.filter.areAllDisable ,
        frequencyMax: globalState.filter.frequencyMax,
        frequencyMin: globalState.filter.frequencyMin,
        qMax: globalState.filter.qMax,
        qMin: globalState.filter.qMin,
        bandpass: globalState.filter.bandpass,
        highpass: globalState.filter.highpass,
        lowpass: globalState.filter.lowpass,
        notch: globalState.filter.notch
    };
}

/**
@type {() => GlobalPanner} */
function createDefaultGlobalPanner() {
    return {
        areAllDisable: globalDefault.panner.areAllDisable,
        xMax: globalDefault.panner.xMax,
        xMin: globalDefault.panner.xMin,
        yMax: globalDefault.panner.yMax,
        yMin: globalDefault.panner.yMin,
        zMax: globalDefault.panner.zMax,
        zMin: globalDefault.panner.zMin
    };
}

/**
@type {() => GlobalPanner} */
function createGlobalPanner() {
    return {
        areAllDisable: globalState.panner.areAllDisable,
        xMax: globalState.panner.xMax,
        xMin: globalState.panner.xMin,
        yMax: globalState.panner.yMax,
        yMin: globalState.panner.yMin,
        zMax: globalState.panner.zMax,
        zMin: globalState.panner.zMin
    };
}

/**
@type {() => GlobalPlaybackRate} */
function createDefaultGlobalPlaybackRate() {
    return {
        areAllDisable: globalDefault.playbackRate.areAllDisable,
        max: globalDefault.playbackRate.max,
        min: globalDefault.playbackRate.min
    };
}

/**
@type {() => GlobalPlaybackRate} */
function createGlobalPlaybackRate() {
    return {
        areAllDisable: globalState.playbackRate.areAllDisable,
        max: globalState.playbackRate.max,
        min: globalState.playbackRate.min
    };
}

/**
@type {() => GlobalTimeInterval} */
function createDefaultGlobalTimeInterval() {
    return {
        max: globalDefault.timeInterval.max,
        min: globalDefault.timeInterval.min
    };
}

/**
@type {() => GlobalTimeInterval} */
function createGlobalTimeInterval() {
    return {
        max: globalState.timeInterval.max,
        min: globalState.timeInterval.min
    };
}

/**
@type {(id: string) => Maybe<AudioViewState>} */
function createAudioViewState(id) {
    const audioState = globalState.audioList.get(id);
    if (audioState === undefined) {
        console.warn(
            "Warning: The app does not find the id:",
            id,
            " in the audios register.\n",
            "The app does not create the audio object representation that is requested."
        );
        return;
    }
    return {
        audioEvents: audioState.audioEvents,
        color: "",
        configurationIsOpen: audioState.configurationIsOpen,
        currentTime: audioState.startPoint,
        delayIsDisable: audioState.delayIsDisable,
        duration: audioState.duration,
        endPoint: audioState.endPoint,
        endTime: audioState.endTime,
        filterIsDisable: audioState.filterIsDisable,
        id: audioState.id,
        isPlaying: audioState.isPlaying,
        pannerIsDisable: audioState.pannerIsDisable,
        playbackRateIsDisable: audioState.playbackRateIsDisable,
        randomEndPointIsDisable: audioState.randomEndPointIsDisable,
        randomStartPointIsDisable: audioState.randomStartPointIsDisable,
        startPoint: audioState.startPoint,
        startTime: audioState.startTime,
        title: audioState.title,
        volume: audioState.volume
    };
}

/**
@type {(avs: AudioViewState) => AudioViewState} */
function createAudioViewStateFrom(avs) {
    return {
        audioEvents: avs.audioEvents,
        color: avs.color,
        configurationIsOpen: avs.configurationIsOpen,
        currentTime: avs.currentTime,
        delayIsDisable: avs.delayIsDisable,
        duration: avs.duration,
        endPoint: avs.endPoint,
        endTime: avs.endTime,
        filterIsDisable: avs.filterIsDisable,
        id: avs.id,
        isPlaying: avs.isPlaying,
        pannerIsDisable: avs.pannerIsDisable,
        playbackRateIsDisable: avs.playbackRateIsDisable,
        randomEndPointIsDisable: avs.randomEndPointIsDisable,
        randomStartPointIsDisable: avs.randomStartPointIsDisable,
        startPoint: avs.startPoint,
        startTime: avs.startTime,
        title: avs.title,
        volume: avs.volume,
    };
}

/**
@type {() => AppState} */
function createAppState() {
    return {
        isStarted: false,
        audiosSet: EmptyObject,
        playColor: "",
        playAudiosFromSet: true,
    };
}

/**
@type {(as: AppState) => AppState} */
function createAppStateFrom(as) {
    return {
        isStarted: as.isStarted,
        audiosSet: as.audiosSet,
        playColor: as.playColor,
        playAudiosFromSet: as.playAudiosFromSet,
    };
}

/**
@type {() => {fadeIn: number, fadeOut: number}}} */
function createFadesState() {
    return {
        fadeIn: globalState.fadeIn,
        fadeOut: globalState.fadeOut
    };
}

/**
@type {() => AudioListState} */
function createAudioListState() {
    return {
        completedAudioList: {},
        completedAudioListSize: 0,
        loadedAudioList: {},
        loadedAudioListSize: 0
    };
}

/**
@type {(als: AudioListState) => AudioListState} */
function createAudioListStateFrom(als) {
    return {
        completedAudioList: als.completedAudioList,
        completedAudioListSize: als.completedAudioListSize,
        loadedAudioList: als.loadedAudioList,
        loadedAudioListSize: als.loadedAudioListSize
    };
}

/**
@type {() => GeneralDisableState} */
function createGeneralDisableState() {
    return {
        allDelaysAreDisabled: {
            global: true,
            value: globalState.delay.areAllDisable
        },
        allFiltersAreDisabled: {
            global: true,
            value: globalState.filter.areAllDisable
        },
        allPannersAreDisabled: {
            global: true,
            value: globalState.panner.areAllDisable
        },
        allPlaybackRatesAreDisabled: {
            global: true,
            value: globalState.playbackRate.areAllDisable
        },
        allRandomEndPointsAreDisabled: {
            global: true,
            value: globalState.randomEndPoint.areAllDisable
        },
        allRandomStartPointsAreDisabled: {
            global: true,
            value: globalState.randomStartPoint.areAllDisable
        }
    };
}

/**
@type {(gds: GeneralDisableState) => GeneralDisableState} */
function createGeneralDisableStateFrom(gds) {
    return {
        allDelaysAreDisabled: {
            global: gds.allDelaysAreDisabled.global,
            value: gds.allDelaysAreDisabled.value
        },
        allFiltersAreDisabled: {
            global: gds.allFiltersAreDisabled.global,
            value: gds.allFiltersAreDisabled.value
        },
        allPannersAreDisabled: {
            global: gds.allPannersAreDisabled.global,
            value: gds.allPannersAreDisabled.value
        },
        allPlaybackRatesAreDisabled: {
            global: gds.allPlaybackRatesAreDisabled.global,
            value: gds.allPlaybackRatesAreDisabled.value
        },
        allRandomEndPointsAreDisabled: {
            global: gds.allRandomEndPointsAreDisabled.global,
            value: gds.allRandomEndPointsAreDisabled.value
        },
        allRandomStartPointsAreDisabled: {
            global: gds.allRandomStartPointsAreDisabled.global,
            value: gds.allRandomStartPointsAreDisabled.value
        }
    };
}

/**
@type {() => PanelConfigState} */
function createPanelConfigState() {
    return {
        isPanelConfigVisible: false,
        isPanelButtonsVisible: false,
        isPanelVisible: false,
        panelSelected: ""
    };
}

/**
@type {() => EventsForEachSet} */
function createSetsState() {
    return {
        arrOfEvents: globalState.eventsForEachSet.arrOfEvents,
        sumOfAllEvents: globalState.eventsForEachSet.sumOfAllEvents
    };
}

export {
    createDefaultGlobalDelay,
    createGlobalDelay,
    createDefaultLocalStorageFilter,
    createLocalStorageFilter,
    createDefaultGlobalPanner,
    createGlobalPanner,
    createDefaultGlobalPlaybackRate,
    createGlobalPlaybackRate,
    createAudioViewState,
    createAudioViewStateFrom,
    createAppState,
    createAppStateFrom,
    createFadesState,
    createAudioListState,
    createAudioListStateFrom,
    createDefaultGlobalTimeInterval,
    createGlobalTimeInterval,
    createGeneralDisableState,
    createGeneralDisableStateFrom,
    createPanelConfigState,
    createSetsState
};
