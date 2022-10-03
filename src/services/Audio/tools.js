import {     
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
} from "./configurations.js"

import { GlobalState } from "../../state/Global/index.js";

import createId from "../createId/service.js";

import { random } from "../utils.js";

/**
 * @returns {string}
 */
const changeColor = () => `rgb(${random(32, 141)},${random(32, 141)},${random(32, 141)})`;

const randomDecide = () => !!random(0,1);

/**
 * @param {number} ms 
 * @returns {Promise<number>}
 */
const wait = ms => new Promise(resolve => setInterval(resolve, ms));

/* -------------------------------------------------------------------------- */
/*                                Create Nodes                                */
/* -------------------------------------------------------------------------- */

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioDelay} audioDelayConfig 
 * @returns {GainNode}
 */
const createDelay = (audioCtx, audioDelayConfig) => {
    const DELAY = audioCtx.createDelay(audioDelayConfig.maxDelayTime);
    DELAY.channelCountMode = audioDelayConfig.channelCountMode;
    DELAY.channelInterpretation = audioDelayConfig.channelInterpretation;
    DELAY.delayTime.value = audioDelayConfig.delayTime;

    const feedback = audioCtx.createGain();
    feedback.gain.value = audioDelayConfig.feedback;

    DELAY.connect(feedback);
    feedback.connect(DELAY);

    return feedback 
}

/**
 * @param {AudioContex} audioCtx 
 * @param {AudioFilter} audioFilterConfig 
 * @returns {BiquadFilterNode}
 */
 const createFilter = (audioCtx, audioFilterConfig) => {
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

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioPanner} audioPanner 
 * @returns {PannerNode}
 */
const createPanner = async (audioCtx, audioPannerConfig) => {
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

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioState} audioState 
 * @returns {[GainNode, GainNode]}
 */
const createAudioRandomChain = async (audioCtx, audio_state) => {
    const inputGain = await audioCtx.createGain();
    const outputGain = await audioCtx.createGain();
    //atenuar volumen general
    inputGain.gain.value = 0.8;
    
    //set min gain value to create a fadeIn later
    outputGain.gain.value = 0.01;

    let input = inputGain;

    //PANNER
    //console.log("audio_state.pannerIsDisable",audio_state.pannerIsDisable);
    if (!audio_state.pannerIsDisable) {
        const audioPannerConfig = createAudioPannerConfiguration(GlobalState.panner);
        const PANNER = await createPanner(audioCtx, audioPannerConfig);
        await input.connect(PANNER);
        input = PANNER; 
    }
    //FILTER
    //console.log("audio_state.filterIsDisable",audio_state.filterIsDisable);
    if (randomDecide() && !audio_state.filterIsDisable) {
        const audioFilterConfig =  createAudioFilterConfiguration(GlobalState.filter);
        const FILTER =  createFilter(audioCtx, audioFilterConfig);
        await input.connect(FILTER)
        input = FILTER;  
    }
    //DELAY
    //console.log("audio_state.delayIsDisable",audio_state.delayIsDisable);
    if (randomDecide()  && !audio_state.delayIsDisable) {
        const audioDelayConfig = createAudioDelayConfiguration(GlobalState.delay)
        const feedback = createDelay(audioCtx, audioDelayConfig);
        const gain = await audioCtx.createGain();
        await input.connect(feedback);
        await input.connect(gain);
        await feedback.connect(gain);
        input = gain;
    }

    await input.connect(outputGain);
    return [inputGain, outputGain];
}

/**
 * @param {AudioState} audioState 
 * @param {number} value
 */
 const changePlaybackRate = (audio_state) => {
    //PLAYBACK RATE
    //console.log("audio_state.filterIsDisable",audio_state.filterIsDisable);
    if (!audio_state.playbackRateIsDisable) {
        const value = createAudioPlayBackRateConfiguration(GlobalState.playbackRate);
        audio_state.playbackRate = value;
        audio_state.audioEngine.playbackRate = value;
        return;
    } else {
        audio_state.playbackRate = 1;
        audio_state.audioEngine.playbackRate = 1;
    }
}


const setAudioConfiguration = async (audio_state) => {
    //PLAYBACK RATE
    changePlaybackRate(audio_state);

    //CONNECTIONS
    const [input, output] = await createAudioRandomChain(GlobalState._audio_context, audio_state);

    await audio_state.source.connect(input);
    await output.connect(GlobalState._audio_context.destination);

    audio_state.outputGain = output;
}

/* -------------------------------------------------------------------------- */
/*                         Audio Interaction Functions                        */
/* -------------------------------------------------------------------------- */
const createPlaybackInterval = (audio_state) => {
    const d =  Math.round(audio_state.duration * 10);
    const p =  Math.round((audio_state.endTime - audio_state.endTime) * 10);
    const min = 5; //500 miliseconds;
    const max = p < 5 ? min : p > d ? d : p;
    return (random(min, max) / 10);
}

const setRandomPoints = (audio_state, audioDispatcher) => {
    let rsp = audio_state.startTime, 
    rep = audio_state.endTime;
    if (audio_state.duration >= 1) {
        let interval = 0.5; //500 miliseconds
        if (!audio_state.randomStartPointIsDisable && !audio_state.randomEndPointIsDisable) {
            interval = createPlaybackInterval(audio_state); 
        } 
        if (!audio_state.randomStartPointIsDisable) {
            rsp = random(audio_state.startTime * 10, (rep - interval) * 10) / 10;
        }
        if (!audio_state.randomEndPointIsDisable) {
            rep = random((rsp + interval) * 10, audio_state.endTime * 10) / 10;
        }
    }
    audio_state.startPoint = rsp;
    audio_state.endPoint = rep;
    audioDispatcher({type: "points/change", payload: [rsp, rep]});
}


/**
 * @param {AudioState} audio_state 
 * @returns {Promise <number>}
 */
const fadeOut = (audio_state) => {
    const fadeTime = GlobalState.fadeOut;
    audio_state.outputGain.gain.exponentialRampToValueAtTime(0.001, GlobalState._audio_context.currentTime + fadeTime / 1000);
    return wait(fadeTime);
}

const fadeIn = (audio_state) => {
    const fadeTime = GlobalState.fadeIn;
    audio_state.outputGain.gain.exponentialRampToValueAtTime(audio_state.volume, GlobalState._audio_context.currentTime + fadeTime / 1000);
}

/**
 * @param {AudioState} audio_state 
 */
const play_ENGINE_audioNode = async (audio_state) => {
    audio_state.audioEngine.currentTime = audio_state.startPoint;
    await audio_state.audioEngine.play();
}

const calculateEnd_ENGINE_audioNode = (audio_state, audioDispatcher) => {
    audio_state.audioEngine.ontimeupdate = function(e) {
        audioDispatcher({type: "currentTime/update", payload: e.target.currentTime});
        if (e.target.currentTime >= audio_state.endPoint) {
            audioDispatcher({type: "color/default"});
            return _stop(audio_state, audioDispatcher);
        }
    }
}

const disconnect = async (audioState) => {
    if (audioState && audioState.isPlaying) {

        if (audioState.audioEngine && !audioState.audioEngine.paused) await audioState.audioEngine.pause();
        audioState.audioEngine.ontimeupdate = null;

        if (audioState.source) await audioState.source.disconnect();
        if (audioState.outputGain) await audioState.outputGain.disconnect();
 
        audioState.outputGain = null;

        return true;
    }
    return false;
}



const _stop = async (audio_state, audioDispatcher = null) => {
    if (audio_state != null && audio_state.isPlaying) {
        await fadeOut(audio_state);
        if (typeof audioDispatcher === "function")
            audioDispatcher({ type: "stop"});
        await disconnect(audio_state);

        audio_state.isPlaying = false;

        return true;
    }
    return false;
}

const _play = async (audio_state, audioDispatcher) => {
    if (audio_state != null) {
        setRandomPoints(audio_state, audioDispatcher);

        await setAudioConfiguration(audio_state);

        fadeIn(audio_state);

        await play_ENGINE_audioNode(audio_state);
        calculateEnd_ENGINE_audioNode(audio_state, audioDispatcher);

        audio_state.isPlaying = true;

        if (typeof audioDispatcher === "function")
            await audioDispatcher({type: "play"});
        
        return true;
    }
    return false;
}

const stop = async (id, audioDispatcher) => {
    const audio_state = GlobalState._audio_list.get(id);
    return await _stop(audio_state, audioDispatcher);
}

const play = async (id, audioDispatcher) => {
    const audio_state = GlobalState._audio_list.get(id);
    return await _play(audio_state, audioDispatcher);
}

const rePlay = (id, audioDispatcher) => {
    const audio_state = GlobalState._audio_list.get(id);
    if (audio_state.isPlaying) {
        Promise.resolve()
        .then(() => _stop(audio_state, audioDispatcher))
        .then((bool) => {
            if (bool && GlobalState._is_started) return _play(audio_state, audioDispatcher);
        })
        .catch(err => console.error(err));
    } else {
        wait(GlobalState.fadeOut)
        .then(() => {
            if (GlobalState._is_started) 
                return _play(audio_state, audioDispatcher);
        })
        .catch(err => console.error(err));
    }
}

const setAudioVolume = (id) => {
    const audio_state = GlobalState._audio_list.get(id);
    if (audio_state) {
        if (audio_state.isPlaying) {
            audio_state.outputGain.gain.value = audio_state.volume
        }
    }
}

const deleteAudio = async (id, audioListDispatch, audioDispatch) => {
    await stop(id, audioDispatch);
    await audioListDispatch({type: "delete", id: id});
}

const deleteAll = async (audioListDispatcher) => {
    const AUDIO_LIST = GlobalState._audio_list;
    await audioListDispatcher({type: "clear"});
    for (const id of AUDIO_LIST.keys()) {
        await stop(id);
    }
    GlobalState._audio_list = new Map();
}

/* -------------------------------------------------------------------------- */
/*                            Generattive Algoritms                           */
/* -------------------------------------------------------------------------- */
function binarySearch(arr, target) {
    let startI = 0;
    let endI = arr.length-1;
    
    while (startI <= endI) {
        const midI = Math.floor((startI + endI) / 2);
      
        if (arr[midI][1] < target) {
            startI = midI + 1
        } else {
            if (!arr[midI-1] || arr[midI-1][1] < target) {
                return arr[midI][0];
            } else { 
                endI = midI - 1;
            }
        }
    }
    //if the target did not found 
    return 0;
}

const calculateTheLenghtOfSetExecution = () => {
    let sum = 0;
    const arrOfSums = [];
    GlobalState.eventsForEachSet.arrOfEvents.forEach((v,i) => {
        if (v > 0) {
            sum += v;
            arrOfSums.push([i, sum]);
        }
    });
    const n = random(1, sum);
    return binarySearch(arrOfSums, n);
}

const AudiosEventsArray = (audio_list) => {
    let arrOfAudiosEvents = [];
    audio_list.forEach((element, key) => {
        const v = element.audioEvents;
        const arr = (new Array(v)).fill(key);
        arrOfAudiosEvents = arrOfAudiosEvents.concat(arr);
    });
    return arrOfAudiosEvents;
}

const createNewSetExecution = () => {
    const AUDIO_LIST = GlobalState._audio_list;
    //select set size
    const n = calculateTheLenghtOfSetExecution();
    console.log("set execution size: ",n);//DEBUGGER

    if (n === 0) return [n, {}];

    /**@type {Object<string, null>}*/
    //selects elements for the set
    let arrOfAudiosEvents = AudiosEventsArray(AUDIO_LIST);
    const executeSet = {};
    for (let i = 0; i < n; i++) {
        const _KEY = arrOfAudiosEvents[random(0, arrOfAudiosEvents.length-1)];
        executeSet[_KEY] = null;
        arrOfAudiosEvents = arrOfAudiosEvents.filter(key => key !== _KEY);
    }
    //console.log("executeSet", executeSet);//DEBUGGER
    return [n, executeSet];
}


const randomSetsExecution = (appDispatcher) => {
    const [n, executeSet] = createNewSetExecution();
    if (n > 0) appDispatcher({type: "newAudiosSet", payload: executeSet});
}


const randomTimeExecution = (appDispatcher, STARTED_ID) => {
    if (GlobalState._is_started && GlobalState._started_id === STARTED_ID) {
        randomSetsExecution(appDispatcher);
        const n = random(GlobalState.timeInterval.min, GlobalState.timeInterval.max) * 100;
        console.log("next execution: ", n + " ms");//DEBUGGER
        wait(n).then(() => randomTimeExecution(appDispatcher, STARTED_ID));
    } else {
        console.log("END"); 
    }
}

const startApp = (appDispatcher) => {
    GlobalState._started_id = createId();
    randomTimeExecution(appDispatcher, GlobalState._started_id);
}

const stopApp = (audioDispatcher) => {
    GlobalState._audio_list.forEach((audio_state) => {
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