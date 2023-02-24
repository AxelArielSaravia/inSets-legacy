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


const GAIN_0 = 0.0001;

/* -------------------------------------------------------------------------- */
/*                               util functions                               */
/* -------------------------------------------------------------------------- */
/*-
flipCoin: undefined -> number
*/
function flipCoin() {
    return (Math.random() < 0.5);
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
function createAudioRandomChain(audioCtx, audio_state) {
    //The variable that we use for the connections chain
    let prev;

    //main gains
    const inputGain = audioCtx.createGain();
    const outputGain = audioCtx.createGain();

    //atenuate the general volume
    inputGain.gain.value = 0.8;

    //set min gain value to create a fadeIn later
    outputGain.gain.value = GAIN_0;

    prev = inputGain; //our input is the GainNode
    //PANNER
    if (!audio_state.pannerIsDisable) {
        const audioPannerConfig = createAudioPannerConfiguration(GlobalState.panner);
        const PANNER = audioCtx.createPanner();
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
        prev.connect(PANNER); //input is PannerNode
        prev = PANNER;
    }
    //FILTER
    if (flipCoin() && !audio_state.filterIsDisable) {
        const audioFilterConfig = createAudioFilterConfiguration(GlobalState.filter);
        const FILTER = audioCtx.createBiquadFilter();
        FILTER.channelCountMode = audioFilterConfig.channelCountMode;
        FILTER.channelInterpretation = audioFilterConfig.channelInterpretation;
        FILTER.detune.value = audioFilterConfig.detune;
        FILTER.gain.value = audioFilterConfig.gain;
        FILTER.frequency.value = audioFilterConfig.frequency;
        FILTER.Q.value = audioFilterConfig.q;
        FILTER.type = audioFilterConfig.type;
        prev.connect(FILTER);
        prev = FILTER; //input is a FilterNode
    }
    //DELAY
    if (flipCoin() && !audio_state.delayIsDisable) {
        const audioDelayConfig = createAudioDelayConfiguration(GlobalState.delay);
        const DELAY = audioCtx.createDelay(audioDelayConfig.maxDelayTime);
        const feedback = audioCtx.createGain();
        const gain = audioCtx.createGain();
        DELAY.channelCountMode = audioDelayConfig.channelCountMode;
        DELAY.channelInterpretation = audioDelayConfig.channelInterpretation;
        DELAY.delayTime.value = audioDelayConfig.delayTime;
        feedback.gain.value = audioDelayConfig.feedback;

        DELAY.connect(feedback);
        feedback.connect(DELAY);
        prev.connect(DELAY);
        prev.connect(gain);
        feedback.connect(gain);

        prev = gain; //input is a GainNode
    }

    prev.connect(outputGain);


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
    audio_state.outputGain.gain.linearRampToValueAtTime(
        GAIN_0,
        GlobalState.audio_context.currentTime + fadeTime / 1000
    );
    return wait(fadeTime);
}

/*-
fadeIn: AudioState -> undefined
*/
function fadeIn(audio_state) {
    const fadeTime = rToFade(GlobalState.fadeIn);
    audio_state.outputGain.gain.exponentialRampToValueAtTime(
        audio_state.volume,
        GlobalState.audio_context.currentTime + fadeTime / 1000
    );
}

/*-
_stop: (AudioState, auidioDispatcher) -> Promise<boolean>
*/
function _stop(audio_state, audioDispatcher) {
    return (
        audio_state !== undefined && audio_state.isPlaying
        ? (
//FADEOUT THE AUDIO
            fadeOut(audio_state).then(
                function () {
                    if (typeof audioDispatcher === "function") {
                        return audioDispatcher({type: "stop"});
                    }
                }
            ).then(
//DISCONNECT AUDIO
                function () {
                    if (audio_state === undefined || !audio_state.isPlaying) {
                        return false;
                    }
                    if (audio_state.audioEngine !== undefined
                        && !audio_state.audioEngine.paused
                    ) {
                        audio_state.audioEngine.pause();
                    }
                    audio_state.audioEngine.ontimeupdate = undefined;
                    if (audio_state.outputGain !== undefined) {
                        audio_state.outputGain.disconnect();
                    }
                    audio_state.outputGain = undefined;
                    if (audio_state.source !== undefined) {
                        audio_state.source.disconnect();
                    }
                    audio_state.isPlaying = false;
                    return true;
                }
            )
        )
        : new Promise(function (res) { res(false); })
    );
}

/*-
_play: (AudioState, audioDispatcher) -> Promise<boolean>
*/
function _play(audio_state, audioDispatcher) {
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
                    const p = Math.round((rep - rsp) * 10);
                    const min = 5; //500 miliseconds;
                    const max = (p < 5 ? min : p > d ? d : p);
                    interval = random(min, max) / 10;
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
            const {inputGain, outputGain} = createAudioRandomChain(
                GlobalState.audio_context,
                audio_state
            );

            audio_state.source.connect(inputGain);
            outputGain.connect(GlobalState.audio_context.destination);

            audio_state.outputGain = outputGain;
        }


//Set currentTime
        audio_state.audioEngine.currentTime = audio_state.startPoint;

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

//Play AudioEngine
        //audio_state.outputGain.gain.value = 1;
        return new Promise(
            function (res) {
                res(audio_state.audioEngine.play());
            }
        ).then(
            function () {
                audio_state.isPlaying = true;
                fadeIn(audio_state);
                return audioDispatcher({type: "play"});
            }
        ).then(
            function () {
                return true;
            }
        );
    }
    return new Promise(function (res) { res(false); });
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
function play(id, audioDispatcher) {
    return _play(GlobalState.audio_list.get(id), audioDispatcher);
}

/*-
rePlay: (string, audioDispatcher) -> undefined
*/
function rePlay(id, audioDispatcher) {
    const audio_state = GlobalState.audio_list.get(id);
    if (audio_state.isPlaying) {
        _stop(audio_state, audioDispatcher)
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
function deleteAudio(id, audioListDispatch, audioDispatch) {
    stop(id, audioDispatch);
    audioListDispatch({
        id,
        type: "delete"
    });
}

/*-
deleteAll: audioListDispatcher -> undefined;
*/
function deleteAll(audioListDispatcher) {
    audioListDispatcher({type: "clear"});
    GlobalState.audio_list.forEach((_, id) => stop(id));
    GlobalState.audio_list = new Map();
}

/* -------------------------------------------------------------------------- */
/*                            Generattive Algoritms                           */
/* -------------------------------------------------------------------------- */

function chooseAudios(arrOfKeys, arrOfSums, sum, i, w) {
    const set = {};
    let arrOfSums_length = arrOfSums.length;
    while (i < w) {
        arrOfSums_length -= 1;
        let index = 0;
        {
        //binarySearch
            const target = random(0, sum);
            let startI = 0;
            let endI = arrOfSums_length;

            while (startI <= endI) {
                const midI = Math.floor((startI + endI) / 2);
                if (arrOfSums[midI][1] < target) {
                    startI = midI + 1;
                } else {
                    if (arrOfSums[midI - 1] === undefined || arrOfSums[midI - 1][1] < target) {
                        //select an element
                        index = midI;
                        break;
                    }
                    endI = midI - 1;
                }
            }
        }
        set[arrOfKeys[arrOfSums[index][0]]] = true;

        if (i < w-1) {
    //re initialize
            sum = (
                index !== 0
                ? arrOfSums[index - 1][1]
                : 0
            );
            for (let j = index; j < arrOfSums_length; j += 1) {
                sum += arrOfSums[j+1][1] - arrOfSums[j][1];
                arrOfSums[j][1] = sum;
                arrOfSums[j][0] =  arrOfSums[j+1][0];
            }
        }
        i += 1;
    }
    return set;
}

/*-
randomSetsExecution: undefined -> undefined || {state: boolean, audios: Object<string, true>}
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
            const res = value * length;
            if (res < sumOfAllEvents) {
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

            p[g] = (p[g] + p[l]) - sumOfAllEvents;

            if (p[g] < sumOfAllEvents) {
                small.push(g);
            } else {
                large.push(g);
            }
        }
        while (small.length !== 0) {
            prob[small.pop()] = sumOfAllEvents;
        }
        while (large.length !== 0) {
            prob[large.pop()] = sumOfAllEvents;
        }
        //generate
        cardinal = (
            random(0, sumOfAllEvents-1) < prob[rand_i]
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
        return {
            state: true, //include
            audios: executeSet
        };
    }

    {
//Create a new set execution
        const audio_list = GlobalState.audio_list;
        const size = audio_list.size;
        const arrOfKeys = [];
        const arrOfSums = [];
        let sum = 0;
        let i_key = -1;

        if (cardinal <= Math.floor(size / 2)) {
            //initialize
            audio_list.forEach(function fe(audio, key) {
                arrOfKeys.push(key);
                arrOfSums.push([i_key += 1, sum += audio.audioEvents]);
            });
            return {
                state: true, //include
                audios: chooseAudios(arrOfKeys, arrOfSums, sum, 0, cardinal)
            };
        } else {
            //initialize
            const sumOfAllAudiosEvents = GlobalState.sumOfAllAudiosEvents;
            audio_list.forEach(function fe(el, key) {
                arrOfKeys.push(key);
                arrOfSums.push([i_key += 1, sum += sumOfAllAudiosEvents - el.audioEvents]);
            });

            return {
                state: false, //exclude
                audios: chooseAudios(arrOfKeys, arrOfSums, sum, cardinal, size)
            };
        }
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
