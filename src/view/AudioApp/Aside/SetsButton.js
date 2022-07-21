import { useState, useEffect, Fragment } from "react";

import { GSProbabilityOfExecutionSets } from "../../../core/initGlobalState.js";

import AsideButton from "./AsideButton.js";
import TouchButton from "../TouchButton.js";
import ToolButton from "../ToolButton.js";

function separateArrInSetsOf(arr, n) {
    if (n === 0) return [arr];
    let resArr = [];
    let resI = -1;
    let interI = 0;
    arr.forEach((el, i) => {
        if (i % n === 0) {
            resI += 1;
            interI = 0;
            resArr[resI] = [] 
        }
        resArr[resI][interI] = el 
        interI++;
    });
    return resArr;
}

const percent = (val, arrOfProbability) => {
    if (val <= 0) return '0';
    let N = arrOfProbability.reduce((ac, el) => ac + el, 0);
    return (val / N * 100).toFixed(1);
};

function GrupSetsButtons(props) {
    const [hidden, setHidden] = useState(true);

    const handleOnClick = () => {
        setHidden(state => !state);
    }
    const n = props.setOf.length - 1 + props.lastIndex;

    return (
        <>
            <h4 className="fs-text flex-row align-c justify-c">
                { props.lastIndex !== n
                    ? `${props.lastIndex}-${props.setOf.length - 1 + props.lastIndex}:`
                    : `${n}:`
                }
            </h4>
            <TouchButton
                orientation="row"
                output={props.output}
                add={props.superAdd}
                subtract={props.superSubtract}
                data={props.data}
            />
            <p className="fs-text">-</p>
            { props.lastIndex !== n ? (
                <ToolButton onClick={handleOnClick} className="set-group">
                    { hidden
                        ? <i style={{padding: "0px"}} className="flex-column align-c justify-c bi bi-chevron-compact-right"></i>
                        : <i style={{padding: "0px"}} className="flex-column align-c justify-c bi bi-chevron-compact-down"></i>
                    }
                </ToolButton>
            ) : <div></div>}
            {!hidden &&  props.lastIndex !== n && (
                props.setOf.map((v, i2) => (
                    <Fragment key={`set-${i2+props.index}`}>
                        <span className="fs-text">
                            {`${i2+props.lastIndex}:`}
                        </span>
                        <TouchButton
                            orientation="row"
                            output={v}
                            add={props.add}
                            subtract={props.subtract}
                            data={i2+props.lastIndex}
                        />
                        <p className="fs-text">{percent(v, props.arrOfProbability) + '%'}</p>
                        <div></div>
                    </Fragment>
                ))
            )}

        </>
    );
}

function GrupSetsButtonsGen(props) {
    const grupNumberSize = props.grupNumberSize;
    const clickReset = props.clickReset;
    const arrOfProbability_length = props.arrOfProbability.length;
    const n = Math.ceil(arrOfProbability_length/ grupNumberSize);
    const [generalArrOfProbability, setGeneralArrOfProbability] = useState((new Array(n)).fill(1));

    const newArr = separateArrInSetsOf(props.arrOfProbability, props.grupNumberSize);

    useEffect(() => {
        setGeneralArrOfProbability(() => (new Array(n)).fill(1))
    }, [n, clickReset]);

    const add = (j, a, k) => {
        if (generalArrOfProbability[j] < arrOfProbability_length * 2) {
            let arr = [...generalArrOfProbability];
            let v = ++arr[j];
            a.forEach((_,i) => props.add(i+k, v));
            setGeneralArrOfProbability(_ => arr);
        }
    }
    const subtract = (j, a, k) => {
        if (generalArrOfProbability[j] > 0) {
            let arr = [...generalArrOfProbability];
            let v = --arr[j];
            a.forEach((_,i) => props.subtract(i+k, v));
            setGeneralArrOfProbability(_ => arr);
        }
    }

    return (
        <div className="set-container4">
            <h4 className="fs-text">Size</h4>
            <h4 className="fs-text">Value</h4>
            <h4 className="fs-text">Probability</h4>
            <div></div>
            {grupNumberSize > 0 && newArr.map((setOf, i1) => {
                let lastIndex = i1 * grupNumberSize;
                return (
                    <Fragment key={"setOf-" + i1}>
                        <GrupSetsButtons 
                            setOf={setOf}
                            lastIndex={lastIndex}
                            index={i1}
                            superAdd={(a) => add(i1, a, lastIndex)}
                            superSubtract={(a) => subtract(i1, a, lastIndex)}
                            output={generalArrOfProbability[i1]}
                            data={setOf}
                            add={props.add}
                            subtract={props.subtract}
                            arrOfProbability={props.arrOfProbability}
                        />
                    </Fragment>
                );
            })}
        </div>
    );
}

export default function SetsButton(props) {
    const audioList_size = props.audioList_size;
    const [arrOfProbability, setArrOfProbability] = useState(GSProbabilityOfExecutionSets.values)
    const [grupNumberSize, setGrupNumberSize] = useState(5);
    const [clickReset, setClickReset] = useState(false);

    useEffect(() => {
        setArrOfProbability(() => GSProbabilityOfExecutionSets.values);
    }, [audioList_size]);
    useEffect(() => {
        setClickReset(_ => false);
    }, [clickReset])

    const operation = (type) => (i, newVal) => {
        if (newVal != null) {
            GSProbabilityOfExecutionSets.set(i, newVal);
        } else {
            let val = GSProbabilityOfExecutionSets.get(i);
            if (type === "add") 
                GSProbabilityOfExecutionSets.set(i, val+1);
            else if (type === "subtract")
                GSProbabilityOfExecutionSets.set(i, val-1);
            
        }
        setArrOfProbability(() => GSProbabilityOfExecutionSets.values);
    } 

    const reset = () => {
        GSProbabilityOfExecutionSets.reset();
        setArrOfProbability(() => GSProbabilityOfExecutionSets.values);
        setClickReset(state => !state);
    }

  

    return (
        <AsideButton 
            title="Sets"
            description="Change the probability value of set execution size."
        >
            {audioList_size === 0 
             ? (
                <div style={{padding: "20px 0"}}>
                    <p className="fs-text text-center">No audio files</p>
                </div>
             ) : (
                <>
                    <div className="flex-column align-c justify-c p-3">
                        <ToolButton onClick={reset}>Reset</ToolButton>
                    </div>
                    { audioList_size < 10 ? (
                        <div className="set-container3"> 
                            <h4 className="fs-text">Size</h4>
                            <h4 className="fs-text">Value</h4>
                            <h4 className="fs-text">Probability</h4>
                            {arrOfProbability.map((val, i) => (
                                <Fragment key={"set-" + i}>
                                    <h4 className="fs-text">{i}</h4>
                                    <TouchButton
                                        orientation="row"
                                        output={val}
                                        add={operation('add')}
                                        subtract={operation('subtract')}
                                        data={i}
                                    />
                                    <p className="fs-text">{percent(val, arrOfProbability) + '%'}</p>
                                </Fragment>
                            ))}
                        </div>
                    ) : (
                    <>
                        <div className="flex-row align-c justify-c p-2">
                            <span className="fs-text">Order in grups of:</span>
                            <TouchButton
                                scroll
                                orientation="row"
                                disable="configs"
                                output={grupNumberSize}
                                add={(val) => {if (grupNumberSize < audioList_size)setGrupNumberSize(state => state + val)}}
                                subtract={(val) => {if (grupNumberSize > 1) setGrupNumberSize(state => state - val)}}
                                data={1}
                            />
                        </div>
                        <GrupSetsButtonsGen
                            arrOfProbability={arrOfProbability}
                            grupNumberSize={grupNumberSize}
                            add={operation('add')}
                            subtract={operation('subtract')}
                            clickReset={clickReset}
                        />
                    </>
                    )}
                </>
             )
                        
            } 
        </AsideButton>
    );
}