import {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
} from "./configurations.js";

import { GlobalState } from "../../state/Global/index.js";

import createId from "../createId/service.js";

import { random } from "../utils.js";

/*-
randomDecide: undefined -> number
*/
function randomDecide() {
    return !!random(0,1);
}

/*-
wait: number -> Promise
*/
function wait(ms) {
    return new Promise((resolve) => setInterval(resolve, ms));
}

/* -------------------------------------------------------------------------- */
/*                                Create Nodes                                */
/* -------------------------------------------------------------------------- */
/*-
createDelay: AudioContext, AudioDelay -> GainNode
*/
function createDelay(audioCtx, audioDelayConfig) {
    const DELAY = audioCtx.createDelay(audioDelayConfig.maxDelayTime);
    DELAY.channelCountMode = audioDelayConfig.channelCountMode;
    DELAY.channelInterpretation = audioDelayConfig.channelInterpretation;
    DELAY.delayTime.value = audioDelayConfig.delayTime;

    const feedback = audioCtx.createGain();
    feedback.gain.value = audioDelayConfig.feedback;

    DELAY.connect(feedback);
    feedback.connect(DELAY);

    return feedback;
}

/*-
createFilter: AudioContex, AudioFilter -> BiquadFilterNode
*/
function createFilter(audioCtx, audioFilterConfig) {
    const FILTER = audioCtx.createBiquadFilter();
    FILTER.channelCountMode = audioFilterConfig.channelCountMode;
    FILTER.channelInterpretation = audioFilterConfig.channelInterpretation;
    FILTER.detune.value = audioFilterConfig.detune;
    FILTER.gain.value = audioFilterConfig.gain;
    FILTER.frequency.value = audioFilterConfig.frequency;
    FILTER.Q.value = audioFilterConfig.q;
    FILTER.type = audioFilterConfig.type;
    return FILTER;
}

/*-
createPanner: AudioContext, AudioPanner -> PannerNode
*/
async function createPanner(audioCtx, audioPannerConfig) {
    const PANNER = await audioCtx.createPanner();
    PANNER.coneInnerAngle = audioPannerConfig.coneInnerAngle;
    PANNER.coneOuterAngle = audioPannerConfig.coneOuterAngle;
    PANNER.coneOuterGain = audioPannerConfig.coneOuterGain;
    PANNER.distanceModel = audioPannerConfig.distanceModel;
    PANNER.maxDistance = audioPannerConfig.maxDistance;
    PANNER.orientationX.value = audioPannerConfig.orientationX;
    PANNER.orientationY.value = audioPannerConfig.orientationY;
    PANNER.orientationZ.value = audioPannerConfig.orientationZ;
    PANNER.panningModel = audioPannerConfig.panningModel;
    PANNER.positionX.value = audioPannerConfig.positionX;
    PANNER.positionY.value = audioPannerConfig.positionY;
    PANNER.positionZ.value = audioPannerConfig.positionZ;
    PANNER.refDistance = audioPannerConfig.refDistance;
    return PANNER;
}

/* -------------------------------------------------------------------------- */
/*                               Set Audio                                    */
/* -------------------------------------------------------------------------- */
/*-
createAudioRandomChain: AudioContext, AudioState -> [GainNode, GainNode]
*/
async function createAudioRandomChain(audioCtx, audio_state) {
    //main gains
    const inputGain = await audioCtx.createGain();
    const outputGain = await audioCtx.createGain();

    //The variable that we use for the connections chain
    let input;

    //atenuate the general volume
    inputGain.gain.value = 0.8;
    
    //set min gain value to create a fadeIn later
    outputGain.gain.value = 0.01;
    
    input = inputGain; //our input is the GainNode
    //PANNER
    if (!audio_state.pannerIsDisable) {
        const audioPannerConfig = createAudioPannerConfiguration(GlobalState.panner);
        const PANNER = await createPanner(audioCtx, audioPannerConfig);
        await input.connect(PANNER); //input is PannerNode
        input = PANNER;
    }
    //FILTER
    if (randomDecide() && !audio_state.filterIsDisable) {
        const audioFilterConfig = createAudioFilterConfiguration(GlobalState.filter);
        const FILTER =  createFilter(audioCtx, audioFilterConfig);
        await input.connect(FILTER);
        input = FILTER; //input is a FilterNode 
    }
    //DELAY
    if (randomDecide()  && !audio_state.delayIsDisable) {
        const audioDelayConfig = createAudioDelayConfiguration(GlobalState.delay);
        const DELAY = createDelay(audioCtx, audioDelayConfig);
        const feedbackGain = await audioCtx.createGain();
        await input.connect(DELAY);
        await input.connect(feedbackGain);
        await DELAY.connect(feedbackGain);
        input = feedbackGain; //input is a GainNode
    }
    await input.connect(outputGain);

    return {
        inputGain,
        outputGain
    };
}

/*-
changePlaybackRate: AudioState -> number
*/
function changePlaybackRate(audio_state) {
    //PLAYBACK RATE
    if (!audio_state.playbackRateIsDisable) {
        const value = createAudioPlayBackRateConfiguration(GlobalState.playbackRate);
        audio_state.playbackRate = value;
        audio_state.audioEngine.playbackRate = value;
        return;
    }
    audio_state.playbackRate = 1;
    audio_state.audioEngine.playbackRate = 1;
}

/*-
setAudioConfiguration: AudioState -> undefined
*/
async function setAudioConfiguration(audio_state) {
    //PLAYBACK RATE
    changePlaybackRate(audio_state);

    //CONNECTIONS
    const {inputGain, outputGain} = await createAudioRandomChain(
        GlobalState._audio_context,
        audio_state
    );

    await audio_state.source.connect(inputGain);
    await outputGain.connect(GlobalState._audio_context.destination);

    audio_state.outputGain = outputGain;
}

/* -------------------------------------------------------------------------- */
/*                         Audio Interaction Functions                        */
/* -------------------------------------------------------------------------- */

/*-
createPlaybackInterval: AudioState -> number
*/
function createPlaybackInterval(audio_state) {
    const d =  Math.round(audio_state.duration * 10);
    const p =  Math.round((audio_state.endTime - audio_state.endTime) * 10);
    const min = 5; //500 miliseconds;
    const max = (p < 5 ? min : p > d ? d : p);
    return random(min, max) / 10;
}

/*-
setRandomPoints: (AudioState, audioDispatcher) -> undefined
*/
function setRandomPoints(audio_state, audioDispatcher) {
    let rsp = audio_state.startTime;
    let rep = audio_state.endTime;

    if (audio_state.duration >= 1) {
        let interval = 0.5; //500 miliseconds
        if (!audio_state.randomStartPointIsDisable
            && !audio_state.randomEndPointIsDisable
        ) {
            interval = createPlaybackInterval(audio_state);
        }
        if (!audio_state.randomStartPointIsDisable) {
            rsp = (
                random(audio_state.startTime * 10, (rep - interval) * 10) / 10
            );
        }
        if (!audio_state.randomEndPointIsDisable) {
            rep = random((rsp + interval) * 10, audio_state.endTime * 10) / 10;
        }
    }
    audio_state.startPoint = rsp;
    audio_state.endPoint = rep;
    audioDispatcher({
        payload: [rsp, rep],
        type: "points/change"
    });
}

/*-
fadeOut: AudioState -> Promise
*/
function fadeOut(audio_state) {
    const fadeTime = GlobalState.fadeOut;
    audio_state.outputGain.gain.exponentialRampToValueAtTime(
        0.001,
        GlobalState._audio_context.currentTime + fadeTime / 1000
    );
    return wait(fadeTime);
}

/*-
fadeIn: AudioState -> undefined
*/
function fadeIn(audio_state) {
    const fadeTime = GlobalState.fadeIn;
    audio_state.outputGain.gain.exponentialRampToValueAtTime(
        audio_state.volume,
        GlobalState._audio_context.currentTime + fadeTime / 1000
    );
}

/*-
play_ENGINE_audioNode: AudioState -> undefined
*/
async function play_ENGINE_audioNode(audio_state) {
    audio_state.audioEngine.currentTime = audio_state.startPoint;
    await audio_state.audioEngine.play();
}

/*-
calculateEnd_ENGINE_audioNode:
    (AudioState, audioDispatcher) -> _stop
*/
function calculateEnd_ENGINE_audioNode(audio_state, audioDispatcher) {
    audio_state.audioEngine.ontimeupdate = function(e) {
        audioDispatcher({
            payload: e.target.currentTime,
            type: "currentTime/update"
        });
        if (e.target.currentTime >= audio_state.endPoint) {
            audioDispatcher({type: "color/default"});
            return _stop(audio_state, audioDispatcher);
        }
    };
}

/*-
disconnect: AudioState -> boolean
*/
async function disconnect(audio_state) {
    if (audio_state && audio_state.isPlaying) {
        if (audio_state.audioEngine !== undefined
            && !audio_state.audioEngine.paused
        ) {
            await audio_state.audioEngine.pause();
        }
        audio_state.audioEngine.ontimeupdate = undefined;

        if (audio_state.source !== undefined) {
            await audio_state.source.disconnect();
        }
        if (audio_state.outputGain !== undefined) {
            await audio_state.outputGain.disconnect();
        }
        audio_state.outputGain = undefined;
        return true;
    }
    return false;
}

/*-
_stop: (AudioState, auidioDispatcher) -> boolean
*/
async function _stop(audio_state, audioDispatcher) {
    if (audio_state !== undefined && audio_state.isPlaying) {
        await fadeOut(audio_state);
        if (typeof audioDispatcher === "function") {
            audioDispatcher({ type: "stop"});
        }
        await disconnect(audio_state);

        audio_state.isPlaying = false;

        return true;
    }
    return false;
}

/*-
_play: (AudioState, audioDispatcher) -> boolean
*/
async function _play(audio_state, audioDispatcher) {
    if (audio_state !== undefined) {
        setRandomPoints(audio_state, audioDispatcher);

        await setAudioConfiguration(audio_state);

        fadeIn(audio_state);

        await play_ENGINE_audioNode(audio_state);
        calculateEnd_ENGINE_audioNode(audio_state, audioDispatcher);

        audio_state.isPlaying = true;

        if (typeof audioDispatcher === "function") {
            await audioDispatcher({type: "play"});
        }

        return true;
    }
    return false;
}

/*-
stop: (string, audioDispatcher) -> _stop
*/
function stop(id, audioDispatcher) {
    const audio_state = GlobalState._audio_list.get(id);
    return _stop(audio_state, audioDispatcher);
}

/*-
play: (string, audioDispatcher) -> _play
*/
async function play(id, audioDispatcher) {
    const audio_state = GlobalState._audio_list.get(id);
    return await _play(audio_state, audioDispatcher);
}

/*-
rePlay: (string, audioDispatcher) -> undefined
*/
function rePlay(id, audioDispatcher) {
    const audio_state = GlobalState._audio_list.get(id);
    if (audio_state.isPlaying) {
        Promise.resolve()
        .then(() => _stop(audio_state, audioDispatcher))
        .then(function(bool) {
            if (bool && GlobalState._is_started) {
                return _play(audio_state, audioDispatcher);
            }
        })
        .catch((err) => console.error(err));
    } else {
        wait(GlobalState.fadeOut)
        .then(function() {
            if (GlobalState._is_started) {
                return _play(audio_state, audioDispatcher);
            }
        })
        .catch((err) => console.error(err));
    }
}

/*-
setAudioVolume: string -> undefined
*/
function setAudioVolume(id) {
    const audio_state = GlobalState._audio_list.get(id);
    if (audio_state && audio_state.isPlaying) {
        audio_state.outputGain.gain.value = audio_state.volume;
    }
}

/*-
deleteAudio:
    (string, audioListDispatch, audioDispatch) -> undefined
*/
async function deleteAudio(id, audioListDispatch, audioDispatch) {
    stop(id, audioDispatch);
    await audioListDispatch({
        id,
        type: "delete"
    });
}

/*-
deleteAll: audioListDispatcher -> undefined;
*/
async function deleteAll(audioListDispatcher) {
    const AUDIO_LIST = GlobalState._audio_list;

    await audioListDispatcher({type: "clear"});
    AUDIO_LIST.forEach((_, id) => stop(id));

    GlobalState._audio_list = new Map();
}

/* -------------------------------------------------------------------------- */
/*                            Generattive Algoritms                           */
/* -------------------------------------------------------------------------- */

/*-
binarySearch: (Array<number>, number) -> number
*/
function binarySearch(arr, target) {
    let startI = 0;
    let endI = arr.length-1;

    while (startI <= endI) {
        const midI = Math.floor((startI + endI) / 2);

        if (arr[midI][1] < target) {
            startI = midI + 1;
        } else {
            if (!arr[midI-1] || arr[midI-1][1] < target) {
                return arr[midI][0];
            }
            endI = midI - 1;
        }
    }
    //if the target did not found
    return 0;
}

/*-
calculateTheLenghtOfSetExecution: undefined -> number
*/
function calculateTheLenghtOfSetExecution() {
    let sum = 0;
    const arrOfSums = [];
    GlobalState.eventsForEachSet.arrOfEvents.forEach(function (v,i) {
        if (v > 0) {
            sum += v;
            arrOfSums.push([i, sum]);
        }
    });
    const n = random(1, sum);
    return binarySearch(arrOfSums, n);
}

/*-
AudiosEventsArray: AudioState -> Array<string>
*/
function AudiosEventsArray(audio_list) {
    let arrOfAudiosEvents = [];
    audio_list.forEach(function (element, key) {
        const v = element.audioEvents;
        const arr = (new Array(v)).fill(key);
        arrOfAudiosEvents = arrOfAudiosEvents.concat(arr);
    });
    return arrOfAudiosEvents;
}

/*-
createNewSetExecution: number -> Object<string, undefined>
*/
function createNewSetExecution(n) {
    const AUDIO_LIST = GlobalState._audio_list;
    const executeSet = {};
    //selects elements for the set
    let arrOfAudiosEvents = AudiosEventsArray(AUDIO_LIST);
    for (let i = 0; i < n; i++) {
        const _KEY = arrOfAudiosEvents[random(0, arrOfAudiosEvents.length-1)];
        executeSet[_KEY] = undefined;
        arrOfAudiosEvents = arrOfAudiosEvents.filter(key => key !== _KEY);
    }
    console.log("executeSet", executeSet);//DEBUGGER
    return executeSet;
}

/*-
randomSetsExecution: appDispatcher -> undefined
*/
function randomSetsExecution(appDispatcher) {
    const n = calculateTheLenghtOfSetExecution();
    console.log("set execution size: ",n);//DEBUGGER
    if (n === 0) {
        return;
    }

    const executeSet = createNewSetExecution(n);
    appDispatcher({type: "newAudiosSet", payload: executeSet});
}


/*-
randomTimeExecution: (appDispatcher, string) -> undefined;
*/
function randomTimeExecution(appDispatcher, STARTED_ID) {
    if (GlobalState._is_started
        && GlobalState._started_id === STARTED_ID
    ) {
        randomSetsExecution(appDispatcher);
        const n = random(GlobalState.timeInterval.min, GlobalState.timeInterval.max) * 100;
        console.log("next execution: ", n + " ms");//DEBUGGER
        return wait(n).then(() => randomTimeExecution(appDispatcher, STARTED_ID));
    } else {
        console.log("END");
    }
}

/*-
startApp: appDispatcher -> undefined
*/
function startApp(appDispatcher) {
    GlobalState._started_id = createId();
    randomTimeExecution(appDispatcher, GlobalState._started_id);
}

/*-
stopApp: audioDispatcher -> undefined
*/
function stopApp(audioDispatcher) {
    GlobalState._audio_list.forEach(function (audio_state) {
        if (audio_state.isPlaying) {
            _stop(audio_state, audioDispatcher);
        }
    });
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                  */
/* -------------------------------------------------------------------------- */
export {
    play,
    rePlay,
    stop,
    setAudioVolume,
    deleteAudio,
    deleteAll,
    startApp,
    stopApp
}