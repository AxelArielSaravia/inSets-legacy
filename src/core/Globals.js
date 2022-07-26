export { GlobalState, initAudioContext } from "./GlobalState.js";
export { GlobalProvider, GlobalContext } from "./GlobalContextAndProvider.js";
export {     
    globalDelayStatic,
    globalFadeTimeStatic,
    globalFilterStatic,
    globalPannerStatic,
    globalPlayBackRateStatic,
    globalTimeIntervalStatic,
    pannerListener 
} from "./GlobalStatics.js"
export { 
    createAudioState, 
    createAudioViewState,
    audioViewReducer,
} from "./AudioState.js";
export { 
    play, 
    stop, 
    setAudioVolume, 
    deleteAudio, 
    startApp, 
    stopApp 
} from "./AudioTools.js";

/**
* @returns {string}
*/
export function createId() {
    const values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
    let str = Date.now() + "";
    for (let i = 0; i < 8; i++) {
        const indexValue = Math.floor(Math.random() * values.length);
        const indexPosition = Math.floor(Math.random() * str.length);
        str = str.slice(0, indexPosition) + values[indexValue] + str.slice(indexPosition);
    }
    return str;
}

/**
* create a random arbitrary number
* @param {number} min the min number (real number) to the random interval
* @param {number} max the max number (real number) to the random interval
* @returns {number} a pseudo random integer number
*/
export function random(min, max){
   try {
       if(typeof min !== 'number') throw new Error("min argument in random method must be a number");
       if(typeof max !== 'number') throw new Error("max argument in random method must be a number");
       
       min = Math.ceil(min);
       max = Math.floor(max);

       return Math.floor(Math.random() * (max - min + 1) + min);
   } catch(err){
       console.error(err);
       return err;
   }    
}

