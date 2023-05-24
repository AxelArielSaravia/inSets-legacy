//@ts-check
import globalState from "../state/globalState.js";
import dispatch from "../state/dispatch.js";
import {appActions} from "../slices/app.js";
import {random} from "../utils.js";

/**
@type {(
    arrOfKeys: Array<string>,
    arrOfSums: Array<number>,
    sum: number,
    i: number,
    w: number
) => {[key: string]: true}} */
function chooseAudios(arrOfKeys, arrOfSums, sum, i, w) {
    /**@type {{[key: string]: true}} */
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

/**
@type {() => boolean} */
function randomSetsExecution() {
//Do not select any sound
    if (globalState.eventsForEachSet.arrOfEvents.length < 2) {
        return false;
    }
//Calculate the cardinal of set execution
//its use practical Vose's Alias Method
//from https://keithschwarz.com/darts-dice-coins
    let cardinal = 0;
    {
        //Initialize
        const length = globalState.eventsForEachSet.arrOfEvents.length;
        const rand_i = random(0, length - 1);
        const alias = Array(length);
        const prob = Array(length);
        const small = [];
        const large = [];
        const sumOfAllEvents = globalState.eventsForEachSet.sumOfAllEvents;
        const p = globalState.eventsForEachSet.arrOfEvents.map(function m(value, i) {
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

    console.info("Set execution size:", cardinal);//DEBUGGER

//Do not select any sound
    if (cardinal <= 0) {
        return false;
    }

//Select all audios to execute
    if (cardinal === globalState.audioList.size) {
        const executeSet = {};
        for (const [key] of globalState.audioList) {
            executeSet[key] = true;
        }
        globalState.generativeState.audiosSet = executeSet;
        globalState.generativeState.playAudiosFromSet = true;
        return true;
    }

    {
//Create a new set execution
        const audioList = globalState.audioList;
        const size = audioList.size;
        const arrOfKeys = Array(size);
        const arrOfSums = Array(size);
        let sum = 0;
        let i_key = 0;

        if (cardinal <= Math.floor(size / 2)) {
    //initialize
            for (let [k, audio] of audioList) {
                sum += audio.audioEvents;
                arrOfKeys[i_key] = k;
                arrOfSums[i_key] = [i_key, sum];
                i_key += 1;
            }
            globalState.generativeState.playAudiosFromSet = true;
            globalState.generativeState.audiosSet = chooseAudios(arrOfKeys, arrOfSums, sum, 0, cardinal);
        } else {
    //initialize
            const sumOfAllAudiosEvents = globalState.sumOfAllAudiosEvents;
            for (let [k, audio] of audioList) {
                sum += sumOfAllAudiosEvents - audio.audioEvents;
                arrOfKeys[i_key] = k;
                arrOfSums[i_key] = [i_key, sum];
                i_key += 1;
            }
            globalState.generativeState.playAudiosFromSet = false;
            globalState.generativeState.audiosSet = chooseAudios(arrOfKeys, arrOfSums, sum, cardinal, size);
        }
        return true;
    }
}

/**
@type {(STARTED_ID: string, execute: boolean) => void} */
function randomTimeExecutionCallback(STARTED_ID, execute) {
    if (execute !== undefined) {
        dispatch.app(appActions.newExecution());
    }
    randomTimeExecution(STARTED_ID);
}

/**
@type {(STARTED_ID: string) => void} */
function randomTimeExecution(STARTED_ID) {
    if (globalState.isStarted
        && globalState.startedId === STARTED_ID
    ) {
        const n = random(globalState.timeInterval.min, globalState.timeInterval.max) * 100;
        console.info("Next execution:", n + "ms");
        const execute = randomSetsExecution();
        setTimeout(randomTimeExecutionCallback, n, STARTED_ID, execute);
    } else {
        console.info("END");
    }
}

export {
    randomSetsExecution,
    randomTimeExecution
};