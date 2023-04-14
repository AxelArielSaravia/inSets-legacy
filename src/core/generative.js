import globalState from "../state/globalState.js";
import {random} from "../utils.js";
import {appActions} from "../slices/app.js";
import {startApp} from "./app.js";

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
    if (globalState.eventsForEachSet.arrOfEvents.length < 2) {
        return;
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

    console.log("next set execution size: ", cardinal);//DEBUGGER

//Do not select any sound
    if (cardinal <= 0) {
        return;
    }

//Select all audios to execute
    if (cardinal === globalState.audioList.size) {
        const executeSet = {};
        globalState.audioList.forEach(function fe(_, key) {
            executeSet[key] = true;
        });
        return {
            state: true, //include
            audios: executeSet
        };
    }

    {
//Create a new set execution
        const audio_list = globalState.audioList;
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
            const sumOfAllAudiosEvents = globalState.sumOfAllAudiosEvents;
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

function randomTimeExecutionCallback(STARTED_ID, set, appDispatcher) {
    if (set !== undefined) {
        appDispatcher(appActions.newExecution(set));
    }
    randomTimeExecution(appDispatcher, STARTED_ID);
}

/*-
randomTimeExecution: (appDispatcher, string) -> undefined;
*/
function randomTimeExecution(appDispatcher, STARTED_ID) {
    if (globalState.isStarted
        && globalState.startedId === STARTED_ID
    ) {
        const n = random(globalState.timeInterval.min, globalState.timeInterval.max) * 100;
        console.log("next execution:", n + " ms");//DEBUGGER
        const set = randomSetsExecution();
        setTimeout(randomTimeExecutionCallback, n, STARTED_ID, set, appDispatcher);
    } else {
        console.log("END");
    }
}

export {
    randomSetsExecution,
    randomTimeExecution
};