import globalState from "../state/globalState.js";

const appInitialState = {
    isStarted: false,
    playAudiosSet: {},
    playColor: ""
};

const audioListInitialState = {
    completedAudioList: {},
    completedAudioListSize: 0,
    loadedAudioList: {},
    loadedAudioListSize: 0
};

const panelConfigInitialState = {
    isPanelConfigVisible: false,
    isPanelButtonsVisible: false,
    isPanelVisible: false,
    panelSelected: ""
};

function createGeneralDisableInitialState() {
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

function createAudioInitialState(id) {
    const audioState = globalState.audioList.get(id);
    if (audioState === false) {
        throw new Error(
            "Error: can not create AudioState, the audio is not in the regiter."
        );
    }
    return {
        audioEvents: audioState.audioEvents,
        color: "",
        configurationIsOpen: false,
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

function createDelayInitialState() {
    return globalState.delay;
}

function createPannerInitialState() {
    return globalState.panner;
}

function createFadesInitialState() {
    return {
        fadeIn: globalState.fadeIn,
        fadeOut: globalState.fadeOut
    };
}

function createFilterInitialState() {
    return globalState.filter;
}

function createPlaybackRateInitialState() {
    return globalState.playbackRate;
}

function createTimeInitialState() {
    return globalState.timeInterval;
}

function createSetsInitialState() {
    return globalState.eventsForEachSet;
}

export {
    appInitialState,
    audioListInitialState,
    panelConfigInitialState,
    createAudioInitialState,
    createDelayInitialState,
    createFadesInitialState,
    createFilterInitialState,
    createGeneralDisableInitialState,
    createPannerInitialState,
    createPlaybackRateInitialState,
    createTimeInitialState,
    createSetsInitialState
};