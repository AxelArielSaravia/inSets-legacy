import { useState, useEffect } from "react";

import { GSProbabilityOfExecutionSets } from "../../../core/initGlobalState.js";

import AsideButton from "./AsideButton.js";
import ScrollButton from "../ScrollButton.js";
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

function GrupSetsButtons(props) {
    const [hidden, setHidden] = useState(true);

    const handleOnClick = () => {
        setHidden(state => !state);
    }
    const n = props.setOf.length - 1 + props.lastIndex;

    return (
        <>
            <div className="flex-row align-c justify-sb p-2">
                <div className="flex-row align-c justify-c">
                    <h4 className="fs-text">
                        { props.lastIndex !== n
                            ? `Sizes ${props.lastIndex} to ${props.setOf.length - 1 + props.lastIndex}:`
                            : `Size ${n}:`
                        }
                    </h4>
                    <ScrollButton
                        orientation="row"
                        disable="configs"
                        output={props.output}
                        add={props.superAdd}
                        subtract={props.superSubtract}
                        data={props.data}
                    />
                </div>
                { props.lastIndex !== n && (
                    <ToolButton onClick={handleOnClick} className="">
                        { hidden
                            ? <i className="flex-column align-c justify-c bi bi-chevron-compact-right"></i>
                            : <i className="flex-column align-c justify-c bi bi-chevron-compact-down"></i>
                        }
                    </ToolButton>
                )}
            </div>
            <div className="flex-column align-c">
                <div className={hidden ? "hidden" : ""}>
                    {props.setOf.map((v, i2) => (
                        <div key={`set-${i2+props.index}`} className="flex-row align-c justify-c p-2">
                            <span className="fs-text" style={{marginRight: "10px"}}>
                                {`Size ${i2+props.lastIndex}:`}
                            </span>
                            <ScrollButton
                                orientation="row"
                                disable="configs"
                                output={v}
                                add={props.add}
                                subtract={props.subtract}
                                data={i2+props.lastIndex}
                            />
                        </div>
                    ))}
                </div>
            </div>
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
        let arr = [...generalArrOfProbability];
        let v = ++arr[j];
        a.forEach((_,i) => props.add(i+k, v));
        setGeneralArrOfProbability(_ => arr);
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
        <>
            {grupNumberSize > 0 && newArr.map((setOf, i1) => {
                let lastIndex = i1 * grupNumberSize;
                return (
                    <div key={"setOf-" + i1} className="">
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
                        />
                    </div>
                );
            })}
        </>
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

    const add = (i, newVal) => {
        if (newVal != null) {
            GSProbabilityOfExecutionSets.set(i, newVal);
        } else {
            let val = GSProbabilityOfExecutionSets.get(i);
            GSProbabilityOfExecutionSets.set(i, val+1)
        }
        setArrOfProbability(() => GSProbabilityOfExecutionSets.values);
    }
    const subtract = (i, newVal) => {
        if (newVal != null) {
            GSProbabilityOfExecutionSets.set(i, newVal);
        } else {
            let val = GSProbabilityOfExecutionSets.get(i);
            GSProbabilityOfExecutionSets.set(i, val-1)
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
            description="Change the probability value of the n size set execution."
        >
            {audioList_size === 0 
             ? (
                <div style={{padding: "20px 0"}}>
                    <p className="fs-text text-center">No audio files</p>
                </div>
             ) : audioList_size < 11
             ? (
                <>
                    <div className="flex-column align-c justify-c p-3">
                        <ToolButton onClick={reset}>Reset</ToolButton>
                    </div> 
                    {arrOfProbability.map((val, i) => (
                        <div key={"set-" + i} className="flex-row align-c justify-c p-2">
                            <h4 className="fs-text">{"Size " + i + ":"}</h4>
                            <ScrollButton
                                orientation="row"
                                disable="configs"
                                output={val}
                                add={add}
                                subtract={subtract}
                                data={i}
                            />
                        </div>
                    ))}
                </>
             ) : (
                <>
                    <div className="flex-column align-c justify-c p-3">
                        <ToolButton onClick={reset}>Reset</ToolButton>
                    </div>
                    <div className="flex-row align-c justify-c p-2">
                        <span className="fs-text">Order in grups of:</span>
                        <ScrollButton
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
                        add={add}
                        subtract={subtract}
                        clickReset={clickReset}
                    />
                </>
             )
                        
            } 
        </AsideButton>
    );
}