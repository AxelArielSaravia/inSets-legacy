import {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
} from "./configurations.js";

import {GlobalState} from "../../state/Global/index.js";

import createId from "../createId/service.js";
import {rToFade} from "../convert/service.js";

import {random} from "../utils.js";

/*-
randomChance: undefined -> number
*/
function randomChance() {
    return (random(0, 1) === 1);
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
    //The variable that we use for the connections chain
    let input;
    //main gains
    const inputGain = await audioCtx.createGain();
    const outputGain = await audioCtx.createGain();
    //atenuate the general volume
    inputGain.gain.value = 0.8;

    //set min gain value to create a fadeIn later
    outputGain.gain.value = 0.001;


    input = inputGain; //our input is the GainNode
    //PANNER
    if (!audio_state.pannerIsDisable) {
        const audioPannerConfig = createAudioPannerConfiguration(GlobalState.panner);
        const PANNER = await createPanner(audioCtx, audioPannerConfig);
        await input.connect(PANNER); //input is PannerNode
        input = PANNER;
    }
    //FILTER
    if (randomChance() && !audio_state.filterIsDisable) {
        const audioFilterConfig = createAudioFilterConfiguration(GlobalState.filter);
        const FILTER = createFilter(audioCtx, audioFilterConfig);
        await input.connect(FILTER);
        input = FILTER; //input is a FilterNode
    }
    //DELAY
    if (randomChance() && !audio_state.delayIsDisable) {
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
        GlobalState.audio_context,
        audio_state
    );

    await audio_state.source.connect(inputGain);
    await outputGain.connect(GlobalState.audio_context.destination);

    audio_state.outputGain = outputGain;
}

/* -------------------------------------------------------------------------- */
/*                         Audio Interaction Functions                        */
/* -------------------------------------------------------------------------- */

/*-
createPlaybackInterval: AudioState -> number
*/
function createPlaybackInterval(audio_state) {
    const d = Math.round(audio_state.duration * 10);
    const p = Math.round((audio_state.endTime - audio_state.endTime) * 10);
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
    const fadeTime = rToFade(GlobalState.fadeOut);
    audio_state.outputGain.gain.linearRampToValueAtTime(
        0,
        GlobalState.audio_context.currentTime + fadeTime / 1000
    );
    return wait(fadeTime);
}

/*-
fadeIn: AudioState -> undefined
*/
function fadeIn(audio_state) {
    const fadeTime = rToFade(GlobalState.fadeIn);
    audio_state.outputGain.gain.linearRampToValueAtTime(
        audio_state.volume,
        GlobalState.audio_context.currentTime + fadeTime / 1000
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
    audio_state.audioEngine.ontimeupdate = function (e) {
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
    if (audio_state !== undefined && audio_state.isPlaying) {
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
            audioDispatcher({type: "stop"});
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


        await play_ENGINE_audioNode(audio_state);
        calculateEnd_ENGINE_audioNode(audio_state, audioDispatcher);
        fadeIn(audio_state);

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
    const audio_state = GlobalState.audio_list.get(id);
    return _stop(audio_state, audioDispatcher);
}

/*-
play: (string, audioDispatcher) -> _play
*/
async function play(id, audioDispatcher) {
    const audio_state = GlobalState.audio_list.get(id);
    return await _play(audio_state, audioDispatcher);
}

/*-
rePlay: (string, audioDispatcher) -> undefined
*/
function rePlay(id, audioDispatcher) {
    const audio_state = GlobalState.audio_list.get(id);
    if (audio_state.isPlaying) {
        new Promise(function (resolve) {
            resolve(_stop(audio_state, audioDispatcher));
        })
        .then(function (bool) {
            if (bool && GlobalState.is_started) {
                return _play(audio_state, audioDispatcher);
            }
        })
        .catch((err) => console.error(err));
    } else {
        wait(rToFade(GlobalState.fadeOut))
        .then(function () {
            if (GlobalState.is_started) {
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
    const audio_state = GlobalState.audio_list.get(id);
    if (audio_state !== undefined && audio_state.isPlaying) {
        audio_state.outputGain.gain.exponentialRampToValueAtTime(
            audio_state.volume,
            GlobalState.audio_context.currentTime + 0.3
        );
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
    const AUDIO_LIST = GlobalState.audio_list;

    await audioListDispatcher({type: "clear"});
    AUDIO_LIST.forEach((_, id) => stop(id));

    GlobalState.audio_list = new Map();
}

/* -------------------------------------------------------------------------- */
/*                            Generattive Algoritms                           */
/* -------------------------------------------------------------------------- */

/*-
binarySearch: (Array<number>, number) -> number
*/
function binarySearch(arr, target) {
    let startI = 0;
    let endI = arr.length - 1;

    while (startI <= endI) {
        const midI = Math.floor((startI + endI) / 2);
        if (arr[midI][1] < target) {
            startI = midI + 1;
        } else {
            if (arr[midI - 1] === undefined || arr[midI - 1][1] < target) {
                return {
                    i: midI,
                    value: arr[midI][0]
                };
            }
            endI = midI - 1;
        }
    }
    //if the target did not found
    return;
}
/*-
calculateTheLenghtOfSetExecution: undefined -> number
its use Vose's Alias Method algorithm
*/
function calculateTheLenghtOfSetExecution() {
    //Initialize
    const length = GlobalState.eventsForEachSet.arrOfEvents.length;
    const rand_i = random(0, length - 1);
    const alias = Array(length);
    const prob = Array(length);
    const small = [];
    const large = [];
    const p = GlobalState.eventsForEachSet.arrOfEvents.map(function m(value, i) {
        const res = value * length;
        if (res < 1) {
            small.push(i);
        } else {
            large.push(i);
        }
        return res;
    });
    while (small.length !== 0 && large.length !== 0) {
        const l = small.pop();
        const g = large.pop();
        prob[l] = p[l];
        alias[l] = g;

        p[g] = (p[g] + p[l]) - 1;

        if (p[g] < 1) {
            small.push(g);
        } else {
            large.push(g);
        }
    }
    while (small.length !== 0) {
        prob[small.pop()] = 1;
    }
    while (large.length !== 0) {
        prob[large.pop()] = 1;
    }
    //generate
    return (
        Math.random() < prob[rand_i]
        ? rand_i
        : alias[rand_i]
    );
}

/*-
createNewSetExecution: number -> Object<string, true>
*/
function createNewSetExecution(n) {
    const AUDIO_LIST = GlobalState.audio_list;
    const executeSet = {};

    const arrOfSums = [];
    let sum = 0;

    if (n <= Math.floor(AUDIO_LIST.size / 2)) {
        //INITIALIZE
        AUDIO_LIST.forEach(function fe(el, key) {
            const audioEvents = el.audioEvents;
            sum += audioEvents;
            arrOfSums.push([key, sum, audioEvents]);
        });
        for (let i = 0; i < n; i += 1) {
            const arrOfSums_length = arrOfSums.length - 1;
            const element = binarySearch(arrOfSums, random(0, sum));
            executeSet[element.value] = true;

            if (i < n-1) {
                sum = (
                    element.i !== 0
                    ? arrOfSums[element.i - 1][1]
                    : 0
                );
                for (let j = element.i; j < arrOfSums_length; j += 1) {
                    sum += arrOfSums[element.i + 1][2];
                    arrOfSums[element.i+1][1] = sum;
                }
                arrOfSums.pop();
            }
        }
    } else {
        const excludeKey = new Set();
        //INITIALIZE
        AUDIO_LIST.forEach(function fe(el, key) {
            const audioEvents = GlobalState.sumOfAllAudiosEvents - el.audioEvents;
            sum += audioEvents;
            arrOfSums.push([key, sum, audioEvents]);
        });
        for (let i = AUDIO_LIST.size; i > n; i -= 1) {
            const arrOfSums_length = arrOfSums.length - 1;
            const element = binarySearch(arrOfSums, random(0, sum));
            excludeKey.add(element.value);

            if (i > n+1) {
                sum = (
                    element.i !== 0
                    ? arrOfSums[element.i - 1][1]
                    : 0
                );
                for (let j = element.i; j < arrOfSums_length; j += 1) {
                    sum += arrOfSums[element.i + 1][2];
                    arrOfSums[element.i+1][1] = sum;
                }
                arrOfSums.pop();
            }
        }
        AUDIO_LIST.forEach(function fe(el, key) {
            if (!excludeKey.has(key)) {
                executeSet[key] = true;
            }
        });
    }
    return executeSet;
}

/*-
randomSetsExecution: undefined -> Object<string, true>
*/
function randomSetsExecution() {
    const n = calculateTheLenghtOfSetExecution();
    console.log("set execution size: ", n);//DEBUGGER
    if (n <= 0) {
    //do not select any sound
        return;
    }
    if (n === GlobalState.audio_list.size) {
    //Select all audios to execute
        const executeSet = {};
        GlobalState.audio_list.forEach(function fe(_, key) {
            executeSet[key] = true;
        });
        return executeSet;
    }
    //executeSet
    return createNewSetExecution(n);
}


/*-
randomTimeExecution: (appDispatcher, string) -> undefined;
*/
function randomTimeExecution(appDispatcher, STARTED_ID) {
    if (GlobalState.is_started
        && GlobalState.started_id === STARTED_ID
    ) {
        const n = random(GlobalState.timeInterval.min, GlobalState.timeInterval.max) * 100;
        console.log("next execution:", n + " ms");//DEBUGGER
        return Promise.all([
            wait(random(GlobalState.timeInterval.min, GlobalState.timeInterval.max) * 100),
            new Promise(function (resolve) {
                resolve(randomSetsExecution());
            })
        ])
        .then(function p(values) {
            //values[1] is the execution set of audios
            if (values[1] !== undefined) {
                appDispatcher({type: "newAudiosSet", payload: values[1]});
            }
            return randomTimeExecution(appDispatcher, STARTED_ID);
        });
    } else {
        console.log("END");
    }
}

/*-
startApp: appDispatcher -> undefined
*/
function startApp(appDispatcher) {
    GlobalState.started_id = createId();
    //First play
    const executeSet = randomSetsExecution(appDispatcher);
    appDispatcher({type: "newAudiosSet", payload: executeSet});
    //recursive call
    randomTimeExecution(appDispatcher, GlobalState.started_id);
}

/*-
stopApp: audioDispatcher -> undefined
*/
function stopApp(audioDispatcher) {
    GlobalState.audio_list.forEach(function (audio_state) {
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
};
