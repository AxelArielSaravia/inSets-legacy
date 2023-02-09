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

/* -------------------------------------------------------------------------- */
/*                               util functions                               */
/* -------------------------------------------------------------------------- */
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
        await input.connect(PANNER); //input is PannerNode
        input = PANNER;
    }
    //FILTER
    if (randomChance() && !audio_state.filterIsDisable) {
        const audioFilterConfig = createAudioFilterConfiguration(GlobalState.filter);
        const FILTER = audioCtx.createBiquadFilter();
        FILTER.channelCountMode = audioFilterConfig.channelCountMode;
        FILTER.channelInterpretation = audioFilterConfig.channelInterpretation;
        FILTER.detune.value = audioFilterConfig.detune;
        FILTER.gain.value = audioFilterConfig.gain;
        FILTER.frequency.value = audioFilterConfig.frequency;
        FILTER.Q.value = audioFilterConfig.q;
        FILTER.type = audioFilterConfig.type;
        await input.connect(FILTER);
        input = FILTER; //input is a FilterNode
    }
    //DELAY
    if (randomChance() && !audio_state.delayIsDisable) {
        const audioDelayConfig = createAudioDelayConfiguration(GlobalState.delay);
        const DELAY = audioCtx.createDelay(audioDelayConfig.maxDelayTime);
        const feedback = audioCtx.createGain();
        const gain = await audioCtx.createGain();
        DELAY.channelCountMode = audioDelayConfig.channelCountMode;
        DELAY.channelInterpretation = audioDelayConfig.channelInterpretation;
        DELAY.delayTime.value = audioDelayConfig.delayTime;
        feedback.gain.value = audioDelayConfig.feedback;

        await DELAY.connect(feedback);
        await feedback.connect(DELAY);
        await input.connect(DELAY);
        await input.connect(gain);
        await feedback.connect(gain);

        input = gain; //input is a GainNode
    }

    await input.connect(outputGain);


    return {
        inputGain,
        outputGain
    };
}

/* -------------------------------------------------------------------------- */
/*                         Audio Interaction Functions                        */
/* -------------------------------------------------------------------------- */

/*-
fadeOut: AudioState -> Promise
*/
function fadeOut(audio_state) {
    const fadeTime = rToFade(GlobalState.fadeOut);
    audio_state.outputGain.gain.exponentialRampToValueAtTime(
        0.0001,
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
    //Set RandomPoints
        {
            let rsp = audio_state.startTime;
            let rep = audio_state.endTime;

            if (audio_state.duration >= 1) {
                let interval = 0.5; //500 miliseconds
                if (!audio_state.randomStartPointIsDisable
                    && !audio_state.randomEndPointIsDisable
                ) {
                    //create interval
                    const d = Math.round(audio_state.duration * 10);
                    const p = Math.round((audio_state.endTime - audio_state.endTime) * 10);
                    const min = 5; //500 miliseconds;
                    const max = (p < 5 ? min : p > d ? d : p);
                    interval = random(min, max) / 10;
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

//Set Audio Configuration
        {
            //PLAYBACK RATE
            if (!audio_state.playbackRateIsDisable) {
                const value = createAudioPlayBackRateConfiguration(GlobalState.playbackRate);
                audio_state.playbackRate = value;
                audio_state.audioEngine.playbackRate = value;
            } else {
                audio_state.playbackRate = 1;
                audio_state.audioEngine.playbackRate = 1;
            }

            //CONNECTIONS
            const {inputGain, outputGain} = await createAudioRandomChain(
                GlobalState.audio_context,
                audio_state
            );

            await audio_state.source.connect(inputGain);
            await outputGain.connect(GlobalState.audio_context.destination);

            audio_state.outputGain = outputGain;
        }


//Play AudioEngine
        audio_state.audioEngine.currentTime = audio_state.startPoint;
        await audio_state.audioEngine.play();


//Calculate the End
        audio_state.audioEngine.ontimeupdate = function (e) {
            audioDispatcher({
                payload: e.target.currentTime,
                type: "currentTime/update"
            });
            if (e.target.currentTime >= audio_state.endPoint) {
                audioDispatcher({type: "color/default"});
                _stop(audio_state, audioDispatcher);
            }
        };

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
                return midI;
            }
            endI = midI - 1;
        }
    }
    //if the target did not found
    return;
}

/*-
randomSetsExecution: undefined -> Object<string, true>
*/
function randomSetsExecution() {
//Do not select any sound
    if (GlobalState.eventsForEachSet.arrOfEvents.length < 2) {
        return;
    }
//Calculate the cardinal of set execution
//its use practical Vose's Alias Method
//from https://keithschwarz.com/darts-dice-coins
    let cardinal = 0;
    {
        //Initialize
        const length = GlobalState.eventsForEachSet.arrOfEvents.length;
        const rand_i = random(0, length - 1);
        const alias = Array(length);
        const prob = Array(length);
        const small = [];
        const large = [];
        const sumOfAllEvents = GlobalState.eventsForEachSet.sumOfAllEvents;
        const p = GlobalState.eventsForEachSet.arrOfEvents.map(function m(value, i) {
            const res = (value / sumOfAllEvents) * length;
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
        cardinal = (
            Math.random() < prob[rand_i]
            ? rand_i
            : alias[rand_i]
        );
    }

    console.log("next set execution size: ", cardinal);//DEBUGGER

//Do not select any sound
    if (cardinal <= 0) {
        return;
    }

//Select all audios to execute
    if (cardinal === GlobalState.audio_list.size) {
        const executeSet = {};
        GlobalState.audio_list.forEach(function fe(_, key) {
            executeSet[key] = true;
        });
        return executeSet;
    }

    {
//Create a new set execution
        const audio_list = GlobalState.audio_list;
        const executeSet = {};
        const arrOfKeys = [];
        const arrOfSums = [];
        let sum = 0;
        let i_key = -1;

        if (cardinal <= Math.floor(audio_list.size / 2)) {
    //initialize
            audio_list.forEach(function fe(audio, key) {
                arrOfKeys.push(key);
                arrOfSums.push([i_key += 1, sum += audio.audioEvents]);
            });
            for (let i = 0; i < cardinal; i += 1) {
    //select an element
                const arrOfSums_length = arrOfSums.length - 1;
                const index = binarySearch(arrOfSums, random(0, sum));

                executeSet[arrOfKeys[arrOfSums[index][0]]] = true;

                if (i < cardinal-1) {
    //re initialize
                    sum = (
                        index !== 0
                        ? arrOfSums[index - 1][1]
                        : 0
                    );
                    for (let j = index; j < arrOfSums_length; j += 1) {
                        sum += arrOfSums[j + 1][1] - arrOfSums[j][1];
                        arrOfSums[j][1] = sum;
                    }
                    arrOfSums.pop();
                }
            }
        } else {
            const excludeKeys = new Set();
            const sumOfAllAudiosEvents = GlobalState.sumOfAllAudiosEvents;
    //initialize
            audio_list.forEach(function fe(el, key) {
                arrOfKeys.push(key);
                arrOfSums.push([i_key += 1, sum += sumOfAllAudiosEvents - el.audioEvents]);
            });
            for (let i = audio_list.size; i > cardinal; i -= 1) {
    //select an exclude element
                const arrOfSums_length = arrOfSums.length - 1;
                const index = binarySearch(arrOfSums, random(0, sum));
                excludeKeys.add(arrOfSums[index][0]);

                if (i > cardinal+1) {
    //re initialize
                    sum = (
                        index !== 0
                        ? arrOfSums[index - 1][1]
                        : 0
                    );
                    for (let j = index; j < arrOfSums_length; j += 1) {
                        sum += arrOfSums[j + 1][1] - arrOfSums[j][1];
                        arrOfSums[j][1] = sum;
                    }
                    arrOfSums.pop();
                }
            }
    //select the elements
            arrOfKeys.forEach(function fe(audio, i) {
                if (!excludeKeys.has(i)) {
                    executeSet[audio] = true;
                }
            });
        }
        return executeSet;
    }
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
        const sets = randomSetsExecution();
        setTimeout(function a() {
            if (sets !== undefined) {
                appDispatcher({type: "newAudiosSet", payload: sets});
            }
            return randomTimeExecution(appDispatcher, STARTED_ID);
        }, n);
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
    const sets = randomSetsExecution();
    if (sets !== undefined) {
        appDispatcher({type: "newAudiosSet", payload: sets});
    }
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
