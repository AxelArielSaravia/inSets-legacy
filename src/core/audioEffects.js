import { randomDecide, createAudioState, random } from "./states.js";
import { 
    AUDIO_CONTEXT, 
    AUDIO_MAP, 
    GSEngine, 
    GSDelay, 
    GSFilter, 
    GSPanner,
    GSFadeTime,
    GSPlayBackRate, 
    GSRandomCurrentTime,
    GSTimeInterval,
    GSIsStarted,
    GSSTARTED_ID,
    ADD_Audio,
    DELETE_Audio,
    GSProbabilityOfExecutionSets
} from "./initGlobalState.js";

/**
 * @typedef {import("./states.js").AudioState} AudioState
 */


const createAudioContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    AUDIO_CONTEXT(new AudioContext());
    AUDIO_CONTEXT().resume();
    setAudioContextPannerPosition();
}

const changeAudioEngine = (val) => GSEngine(val);

/**
 * @param {AudioContext} audioCtx 
 * @param {AaudioPannerState} audioPannerState 
 */
 const setAudioContextPannerPosition = () => {
    let audioCtx = AUDIO_CONTEXT();
    if (audioCtx.listener.positionX) {
        audioCtx.listener.positionX.value = 6;
        audioCtx.listener.positionY.value = 6;
        audioCtx.listener.positionZ.value = 6;
    } else {
        audioCtx.listener.setPosition(6, 6, 6);
    }
}

const elementsState = {
    panner: GSPanner,
    filter: GSFilter,
    delay: GSDelay,
    playBackRate: GSPlayBackRate,
    randomCurrentTime: GSRandomCurrentTime
}

/**
 * @param {HTMLAudioElement} HTMLAudio 
 * @param {string} mediaType 
 * @returns {"probably" | "maybe" | ""}
 */
 const canPlayType = (HTMLAudio, mediaType) => {
    if (!HTMLAudio.canPlayType) throw new Error("HTMLAudioElement.prototype.canPlayType does not find");
    return HTMLAudio.canPlayType(mediaType); 
}

/**
 * @returns {string}
 */
 function createId() {
    const values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
    let str = Date.now() + "";
    for (let i = 0; i < 8; i++) {
        let indexValue = Math.floor(Math.random() * values.length);
        let indexPosition = Math.floor(Math.random() * str.length);
        str = str.slice(0, indexPosition) + values[indexValue] + str.slice(indexPosition);
    }
    return str;
}

const audioStateFromFile_AudioNode = (file, callback) => {
    return Promise.resolve()
    .then(() => URL.createObjectURL(file))
    .then(url => new Audio(url))
    .then(htmlAudio => {
        if (!canPlayType(htmlAudio, file.type)) {
            console.warn(`Can not play this audio type ${file.type}`);
            return;
        }
        htmlAudio.addEventListener("canplaythrough", () => {
            /* the audio is now playable; play it if permissions allow */
            const id = createId();
            let source = AUDIO_CONTEXT().createMediaElementSource(htmlAudio); 
            let audioState = createAudioState(id, file.name, file.type, htmlAudio.duration, elementsState);
            audioState.audioEngine = htmlAudio;
            audioState.source = source;

            ADD_Audio(id, audioState);

            if (typeof callback === "function") callback();

            audioState = source = null;
            //console.log(AUDIO_MAP);
        },{once: true});
    })
    .catch(err => console.error(err));
}

const audioStateFromFile_AudioBuffer = (file, callback) => {
    return Promise.resolve()
    .then(() => file.arrayBuffer())
    .then(data => AUDIO_CONTEXT().decodeAudioData(data))
    .then(audioBuffer => {
        const id = createId();
        let audioState = createAudioState(id, file.name, file.type, audioBuffer.duration, elementsState);
        audioState.audioEngine = audioBuffer;

        ADD_Audio(id, audioState);

        if (typeof callback !== "undefined") callback();
        
        audioState = null;
        //console.log(AUDIO_MAP);
    })
    .catch(err => console.error(err));
}

const createAudioStateFromFile = (file, id, callback) => {
    if (GSEngine() === "audioNode") {
        return audioStateFromFile_AudioNode(file, id, callback)
    } else {
        return audioStateFromFile_AudioBuffer(file, id, callback);
    }
}

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioDelayState} AudioDelayState 
 * @returns {DelayNode}
 */
const createDelay = (audioCtx, audioDelayState) => {

    let DELAY = new DelayNode(audioCtx, {
        delayTime: audioDelayState.delayTime,
        maxDelayTime: audioDelayState.maxDelayTime,
        channelCountMode: audioDelayState.channelCountMode,
        channelInterpretation: audioDelayState.channelInterpretation,
    });

    let feedback = audioCtx.createGain();
    feedback.gain.value = audioDelayState.feedback;

    feedback.connect(DELAY);
    DELAY.connect(feedback);

    return feedback 
}

/**
 * @param {AudioContex} audioCtx 
 * @param {AudioFilterComponent} audioFilterState 
 * @returns {BiquadFilterNode}
 */
const createFilter = (audioCtx, audioFilterState) => {
    return new BiquadFilterNode(audioCtx, {
        type: audioFilterState.type,
        Q: audioFilterState.q,
        detune: audioFilterState.detune,
        frequency: audioFilterState.frequency,
        gain: audioFilterState.gain,
        channelCountMode: audioFilterState.channelCountMode,
        channelInterpretation: audioFilterState.channelInterpretation
    });
}

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioPannerState} audioPannerState 
 * @returns {PannerNode}
 */
const createPanner = (audioCtx, audioPannerState) => {
    let PANNER = audioCtx.createPanner();
    PANNER.panningModel = audioPannerState.panningModel;
    PANNER.distanceModel = audioPannerState.channelCountMode;
    PANNER.refDistance = audioPannerState.refDistance;
    PANNER.maxDistance = audioPannerState.maxDistance;
    PANNER.rolloffFactor = audioPannerState.rolloffFactor;
    PANNER.coneInnerAngle = audioPannerState.coneInnerAngle;
    PANNER.coneOuterAngle = audioPannerState.coneOuterAngle;
    PANNER.coneOuterGain = audioPannerState.coneOuterGain;

    //default parameters
    if (PANNER.positionX) {
        PANNER.positionX.value = audioPannerState.x;
        PANNER.positionY.value = audioPannerState.y;
        PANNER.positionZ.value = audioPannerState.z;
    } else {
        PANNER.setPosition(
            audioPannerState.x, 
            audioPannerState.y, 
            audioPannerState.z
        );
    }
    return PANNER;
}

const changePlayBackRate = (audioState) => {
    audioState.playBackRate.random(GSPlayBackRate);
    if (GSEngine() === "audioNode") {
        audioState.audioEngine.playbackRate = audioState.playBackRate.value;
    } else {
        audioState.source.playbackRate.value = audioState.playBackRate.value;
    }
}

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioState} audioState 
 * @returns {[GainNode, GainNode]}
 */
const createAudioRandomChain = async (audioCtx, audioState) => {
    const inputGain = await audioCtx.createGain();
    const outputGain = await audioCtx.createGain();
    
    //set min gain value to create a fadeIn later
    outputGain.gain.value = 0.01;

    let input = inputGain;

    //the randomDecide() means 50% of posibilities that the effect change randomly
    //PANNER
    if (randomDecide() && !audioState.panner.isDisable) {
        audioState.panner.random(GSPanner);
        const PANNER = await createPanner(audioCtx, audioState.panner);
        await input.connect(PANNER);
        input = PANNER; 
    }

    //FILTER
    if (randomDecide() && !audioState.filter.isDisable) {
        audioState.filter.random(GSFilter);
        const FILTER = await createFilter(audioCtx, audioState.filter);
        await input.connect(FILTER)
        input = FILTER;  
    }

    //DELAY
    if (randomDecide() && !audioState.delay.isDisable) {
        audioState.delay.random(GSDelay);
        const feedback = await createDelay(audioCtx, audioState.delay);
        await input.connect(feedback);
        input = feedback;
    }

    if (randomDecide() && !audioState.playBackRate.isDisable) {
        changePlayBackRate(audioState);
    }

    await input.connect(outputGain);
    return [inputGain, outputGain];
}

const setAudioConfiguration = async (id) => {
    if (AUDIO_MAP.has(id)) {
        const AUDIO_STATE = AUDIO_MAP.get(id);
    
        //CONNECTIONS
        if (GSEngine() === "audioBuffer") {
            AUDIO_STATE.source = await AUDIO_CONTEXT().createBufferSource();
            AUDIO_STATE.source.buffer = await AUDIO_STATE.audioEngine;
        } 
        let [input, output] = await createAudioRandomChain(AUDIO_CONTEXT(), AUDIO_STATE);
    
        await AUDIO_STATE.source.connect(input);
        await output.connect(AUDIO_CONTEXT().destination);
    
        AUDIO_STATE.outputGain = output;
    
        input = output = null;
    }
}

const play = (id, cb) => {
    const AUDIO_STATE = AUDIO_MAP.get(id);
    if (AUDIO_STATE) {
        //FADE IN (to a random value)
        AUDIO_STATE.outputGain.gain.exponentialRampToValueAtTime(AUDIO_STATE.volume.get(), AUDIO_CONTEXT().currentTime + GSFadeTime.time / 1000);

        //CHANGE THE CURRENT TIME
        let startPoint = AUDIO_STATE.startTimePoint.get();

        if (!AUDIO_STATE.randomCurrentTime.isDisable && !GSRandomCurrentTime.disableAll) {
            AUDIO_STATE.randomCurrentTime.random(AUDIO_STATE.startTimePoint.get(), AUDIO_STATE.endTimePoint.get());
            startPoint = AUDIO_STATE.randomCurrentTime.value;
        } else {
            AUDIO_STATE.randomCurrentTime.value = startPoint;
        }
        
        if (GSEngine() === "audioNode") {
            AUDIO_STATE.audioEngine.currentTime = startPoint;
            AUDIO_STATE.audioEngine.play();
            
            AUDIO_STATE.audioEngine.ontimeupdate = function(e) {
                if (e.target.currentTime >= AUDIO_STATE.endTimePoint.get()) {
                    stop(id, cb);
                }
            }
        } else {
            const START_ID =  createId();
            AUDIO_STATE.startID.value = START_ID;
            
            const END_TIME = Math.floor((AUDIO_STATE.endTimePoint.get() - startPoint) * 1000);
            
            AUDIO_STATE.source.start(0, startPoint);

            wait(Math.floor(END_TIME))
            .then(() => {
                if (AUDIO_STATE.startID.value === START_ID && AUDIO_STATE.isPlaying) {
                    return stop(id, cb);
                }
            });  
        }
        AUDIO_STATE.isPlaying = true;
        if (typeof cb === "function") cb(AUDIO_STATE.isPlaying, AUDIO_STATE.randomCurrentTime.value);
    }
}

const stop = (id, cb) => {
    const AUDIO_STATE = AUDIO_MAP.get(id);
    if (AUDIO_STATE && AUDIO_STATE.isPlaying) {
        //FADE OUT 
        AUDIO_STATE.outputGain.gain.exponentialRampToValueAtTime(0.01, AUDIO_CONTEXT().currentTime + GSFadeTime.time / 1000);
        return wait(GSFadeTime.time)
        .then(() => disconnect(AUDIO_STATE, cb));
    }
    return Promise.resolve(false);
}

const disconnect = (audioState, cb) => {
    if (audioState && audioState.isPlaying) {
        if (GSEngine() === "audioNode") {
            if (audioState.audioEngine && !audioState.audioEngine.paused) audioState.audioEngine.pause();
            audioState.audioEngine.ontimeupdate = null;
        } else {
            if (audioState.source) audioState.source.stop();
        }
        if (audioState.source) audioState.source.disconnect();
        if (audioState.outputGain) audioState.outputGain.disconnect();
        //set source to null
        if (GSEngine() === "audioBuffer") {
            audioState.source = null;
        }
        audioState.randomCurrentTime.value = audioState.startTimePoint.get();
        audioState.outputGain = null;
        audioState.isPlaying = false;

        if (typeof cb === "function") cb(audioState.isPlaying, audioState.randomCurrentTime.value);
        return true;
    }
    return false;
}

/**
 * @param {string} id 
 * @param {function} cb example (AUDIO_MAP) => { changeState(() => new Map([...AUDIO_MAP]))} 
 */
const deleteAudio = (id, cb) => {
    stop(id)
    .then(() => DELETE_Audio(id))
    .then(() => cb(AUDIO_MAP));
}

const changeVolume = (id, val) => {
    const AUDIO_STATE = AUDIO_MAP.get(id);
    if (AUDIO_STATE) {
        AUDIO_STATE.volume.set(val);
        if (AUDIO_STATE.isPlaying) {
            AUDIO_STATE.outputGain.gain.value = AUDIO_STATE.volume.get()
        }
    }
}

/**
 * @param {number} ms 
 * @returns {Promise<number>}
 */
const wait = ms => new Promise(resolve => setInterval(resolve, ms));

const changeGSSTARTED_ID = () => GSSTARTED_ID(createId());

const randomTimeExecution = (cb, startedID) => {
    if (GSIsStarted() && GSSTARTED_ID() === startedID) {
        randomSetsExecution(cb);
        const n = random(GSTimeInterval.min, GSTimeInterval.max);
        console.log("next execution: ", n + " ms");//DEBUGGER
        //fadeTime (ms) is the wait execution of play() because we will fadeout the audio if its playing 
        wait(n).then(() => randomTimeExecution(cb, startedID));
    } else {
        console.log("END"); 
    }
}

const AudioProbabilityArray = (AUDIO_MAP) => {
    let arrOfAudioProbabilities = [];
    AUDIO_MAP.forEach((value, key) => {
        let v = value.probability.value;
        let arr = (new Array(v)).fill(key);
        arrOfAudioProbabilities = arrOfAudioProbabilities.concat(arr);
    });
    return arrOfAudioProbabilities
}


const createNewSetExecution = () => {
    //select set size
    const n = GSProbabilityOfExecutionSets.lengthOfExecutionSet();
    console.log("set execution: ",n);//DEBUGGER
    /**@type {Set}*/
    const executeSet = new Set();
    //selects elements for the set
    if (AUDIO_MAP.size / 2 >= n) {
        let possibleAudios = AudioProbabilityArray(AUDIO_MAP);
        //console.log("possibleAudios: ",possibleAudios);//DEBUGGER
        //console.log("while start");//DEBUGGER
        while (executeSet.size < n) {
            let name = possibleAudios[random(0, possibleAudios.length-1)];
            executeSet.add(AUDIO_MAP.get(name));
            possibleAudios = possibleAudios.filter(key => key !== name);
        }
        //console.log("executeSet: ", executeSet);//DEBUGGER
        //console.log("while end");//DEBUGGER

    } else {
        let possibleAudios = AudioProbabilityArray(AUDIO_MAP);
        //console.log("possibleAudios: ",possibleAudios);//DEBUGGER
        for (let total = AUDIO_MAP.size - n; total > 0; total--) {
            let name = possibleAudios[random(0, possibleAudios.length-1)];
            possibleAudios = possibleAudios.filter(key => key !== name);
        }
        (new Set(possibleAudios)).forEach(key => {
            executeSet.add(AUDIO_MAP.get(key));
        });
        //console.log("executeSet: ", executeSet);//DEBUGGER
    }

    const newColorSet = `rgb(${random(32, 141)},${random(32, 141)},${random(32, 141)})`;

    return [executeSet, newColorSet];
}

const randomSetsExecution = (cb) => {
    const [executeSet, newColorSet] = createNewSetExecution();
    executeSet.forEach((data) => {
        if (data.isPlaying) {
            stop(data.id, (isPlaying, rct) => cb(data.id, isPlaying, rct))
            .then(() => setAudioConfiguration(data.id))
            .then(() => play(data.id, (isPlaying, rct) => cb(data.id, isPlaying, rct, newColorSet)));
        } else {
            wait(GSFadeTime.time)
            .then(() => setAudioConfiguration(data.id))
            .then(() => play(data.id, (isPlaying, rct) => cb(data.id, isPlaying, rct, newColorSet)));
        }
    });
}


const stopAll = (cb) => {
    AUDIO_MAP.forEach(data => {
        if (data.isPlaying) {
            stop(data.id, (isPlaying, rtc) => cb(data.id, isPlaying, rtc));
        }
    });
}


export {
    createAudioContext,
    createAudioStateFromFile,
    changeAudioEngine,
    changeGSSTARTED_ID,
    changeVolume,
    deleteAudio,
    play,
    randomTimeExecution,
    setAudioConfiguration,
    setAudioContextPannerPosition,
    stop,
    stopAll,
}