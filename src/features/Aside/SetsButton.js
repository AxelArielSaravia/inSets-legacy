import { useState, useEffect, Fragment } from "react";

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
    const areAllValuesIqual = props.setOf.every(el => props.setOf[0] === el);
    const [value, setValue] = useState(areAllValuesIqual ? props.setOf[0] : 0);
    const [hidden, setHidden] = useState(true);
    const clickReset = props.clickReset;
    const n = props.setOf.length - 1 + props.startIndex;
    
    useEffect(() => {
        if (!areAllValuesIqual) {
            setValue(() => 0);
        } else {
            setValue(() => props.setOf[0]);
        }
    }, [areAllValuesIqual]);

    useEffect(() => {
        if (clickReset) {
            setValue(() => 1);
        }
    }, [clickReset]);

    const handleOnClick = () => setHidden(state => !state);

    const add = (a) => {
        if (value < 50) {
            a.forEach((_,i) => props.add(i + props.startIndex, value + 1));
            setValue(state => ++state);
        }
    }
    const subtract = (a) => {
        if (value > 0) {
            a.forEach((_,i) => props.subtract(i + props.startIndex, value - 1));
            setValue(state => --state);
        }
    }

    return (
        <>
            <h4 className="fs-text flex-row align-c justify-c p-2">
                { props.startIndex !== n
                    ? `${props.startIndex}-${n}:`
                    : `${n}:`
                }
            </h4>
            <TouchButton
                orientation="row"
                output={!areAllValuesIqual? "-" :value}
                add={add}
                subtract={subtract}
                data={props.setOf}
                textStyle={{fontWeight: "900"}}
            />
            <h4 className="fs-text">
                { areAllValuesIqual ? percent(value, props.arrOfProbability) + '%' : '-' }
            </h4>
            { props.startIndex !== n ? (
                <ToolButton onClick={handleOnClick} className="set-group">
                    { hidden
                        ? <i style={{padding: "0px"}} className="fs-text flex-column align-c justify-c bi bi-caret-right"></i>
                        : <i style={{padding: "0px"}} className="fs-text flex-column align-c justify-c bi bi-caret-down"></i>
                    }
                </ToolButton>
            ) : <div></div>}
            {!hidden &&  props.startIndex !== n && (
                props.setOf.map((v, i2) => (
                    <Fragment key={`set-${i2+props.index}`}>
                        <span className="fs-text p-2">
                            {`${i2+props.startIndex}:`}
                        </span>
                        <TouchButton
                            orientation="row"
                            output={v}
                            add={props.add}
                            subtract={props.subtract}
                            data={i2+props.startIndex}
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
    const newArr = separateArrInSetsOf(props.arrOfProbability, props.grupNumberSize);

    return (
        <div className="set-container4 grid align-c">
            <h4 className="fs-text">Size</h4>
            <h4 className="fs-text">Value</h4>
            <h4 className="fs-text">Probability</h4>
            <div></div>
            {grupNumberSize > 0 && newArr.map((setOf, i1) => {
                const startIndex = i1 * grupNumberSize;
                return (
                    <Fragment key={"setOf-" + startIndex +"-"+ (setOf.length - 1 + startIndex)}>
                        <GrupSetsButtons 
                            setOf={setOf}
                            startIndex={startIndex}
                            index={i1}
                            add={props.add}
                            subtract={props.subtract}
                            arrOfProbability={props.arrOfProbability}
                            clickReset={clickReset}
                        />
                    </Fragment>
                );
            })}
        </div>
    );
}

export default function SetsButton(props) {
    const audioListSize = props.audioListSize;
    const arrOfProbability = props.arrOfProbability;
    const [grupNumberSize, setGrupNumberSize] = useState(5);
    const [clickReset, setClickReset] = useState(false);

    useEffect(() => { setClickReset(() => false); }, [clickReset])

    const operation = (type) => (i, newVal) => {
        if (newVal != null) {
            props.setDispatcher("probabilityOfSetSize", "set", newVal, i);
        } else {
            const value = arrOfProbability[i];
            if (type === "add")
                props.setDispatcher("probabilityOfSetSize", "set", value + 1, i);
            else if (type === "subtract")
                props.setDispatcher("probabilityOfSetSize", "set", value - 1, i);
        }
    } 

    const reset = () => {
        props.setDispatcher("probabilityOfSetSize", "reset", null);
        setClickReset(state => !state);
    }
    const addGrupNumberSize = (val) => {
        if (grupNumberSize < audioListSize) 
            setGrupNumberSize(state => state + val)
    }
    const subtractGrupNumberSize = (val) => {
        if (grupNumberSize > 1) 
            setGrupNumberSize(state => state - val)
    }
    return (
        <AsideButton 
            title="Sets"
            description="Change the probability value of set execution size."
        >
            {audioListSize === 0 
             ? (
                <div style={{padding: "20px 0"}}>
                    <p className="fs-text text-center">No audio files</p>
                </div>
             ) : (
                <>
                    <div className="flex-column align-c justify-c p-3">
                        <ToolButton onClick={reset}>Reset</ToolButton>
                    </div>
                    { audioListSize < 10 ? (
                        <div className="set-container3 grid align-c"> 
                            <h4 className="fs-text p-2">Size</h4>
                            <h4 className="fs-text">Value</h4>
                            <h4 className="fs-text">Probability</h4>
                            {arrOfProbability.map((val, i) => (
                                <Fragment key={"set-" + i}>
                                    <h4 className="fs-text p-2">{i}</h4>
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
                        <div className="flex-row align-c justify-c p-3">
                            <span className="fs-text">Order in grups of:</span>
                            <TouchButton
                                scroll
                                orientation="row"
                                disable="configs"
                                output={grupNumberSize}
                                add={addGrupNumberSize}
                                subtract={subtractGrupNumberSize}
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