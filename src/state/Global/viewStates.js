/* -------------------------------------------------------------------------- */
/*                             VIEW GENERAL STATE                             */
/* -------------------------------------------------------------------------- */
/*-
@type ViewDisableState: {
    value: boolean
    global: boolean
}
*/
/*-
@type ViewAudioListState: {
    completedAudioList: Object<string, undefined>,
    completedAudioListSize: number,
    loadingAudioList: Object<string, undefined>,
    loadingAudioListSize: number,
    sumOfAllEvents: number
}
*/

/*-
createViewAudioListState: undefined -> ViewAudioListState
*/
function createViewAudioListState() {
    return (function (o) {
        o.completedAudioList = {};
        o.completedAudioListSize = 0;
        o.loadedAudioList = {};
        o.loadedAudioListSize = 0;
        return Object.seal(o);
    }(Object.create(null)));
}

/*
@type ViewGeneralDisableState: {
    allDelaysAreDisabled: ViewDisableState,
    allFiltersAreDisabled: ViewDisableState,
    allPannersAreDisabled: ViewDisableState,
    allPlaybackRatesAreDisabled: ViewDisableState,
    allRandomEndPointsAreDisabled: ViewDisableState,
    allRandomStartPointsAreDisabled: ViewDisableState,
}
*/

/*-
createViewGeneralDisableState: undefined -> ViewGeneralDisableState
*/
function createViewGeneralDisableState(GlobalState) {
    return (function (o) {
        o.allDelaysAreDisabled = {
            global: true,
            value: GlobalState.delay.areAllDisable
        };
        o.allFiltersAreDisabled = {
            global: true,
            value: GlobalState.filter.areAllDisable
        };
        o.allPannersAreDisabled = {
            global: true,
            value: GlobalState.panner.areAllDisable
        };
        o.allPlaybackRatesAreDisabled = {
            global: true,
            value: GlobalState.playbackRate.areAllDisable
        };
        o.allRandomEndPointsAreDisabled = {
            global: true,
            value: GlobalState.randomEndPoint
        };
        o.allRandomStartPointsAreDisabled = {
            global: true,
            value: GlobalState.randomStartPoint
        };
        return Object.seal(o);
    }(Object.create(null)));
}

/*-
@type ViewAppState: {
    _is_started: boolean,
    playAudiosSet: Object<string, undefined>,
    playColor: string
}
*/

/*-
createViewAppState: undefined -> ViewAppState
*/
function createViewAppState() {
    return {
        is_started: false,
        playAudiosSet: {},
        playColor: ""
    };
}

export {
    createViewAudioListState,
    createViewGeneralDisableState,
    createViewAppState
};