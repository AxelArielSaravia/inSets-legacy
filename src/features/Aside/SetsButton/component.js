import { useState, useEffect, Fragment, useMemo } from "react";

import AsideButton from "../AsideButton/component.js";
import TouchButton from "../../../components/TouchButton/index.js";
import ToolButton from "../../../components/ToolButton/index.js";

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

function GrupSetsButtons({setOf, clickReset, startIndex, add, subtract, arrOfProbability, index}) {
    const areAllValuesIqual = useMemo(() => setOf.every(el => setOf[0] === el), [setOf]);
    const [value, setValue] = useState(areAllValuesIqual ? setOf[0] : 0);
    const [hidden, setHidden] = useState(true);
    const n = setOf.length - 1 + startIndex;
    
    useEffect(() => {
        if (!areAllValuesIqual) {
            setValue(() => 0);
        } else {
            setValue(() => setOf[0]);
        }
    }, [areAllValuesIqual, setOf]);

    useEffect(() => {
        if (clickReset) {
            setValue(() => 1);
        }
    }, [clickReset]);

    const handleOnClick = () => setHidden(state => !state);

    const _add = (a) => {
        if (value < 50) {
            a.forEach((_,i) => add(i + startIndex, value + 1));
            setValue(state => ++state);
        }
    }
    const _subtract = (a) => {
        if (value > 0) {
            a.forEach((_,i) => subtract(i + startIndex, value - 1));
            setValue(state => --state);
        }
    }

    return (
        <>
            <h4 className="fs-text flex-row align-c justify-c p-2">
                { startIndex !== n
                    ? `${startIndex}-${n}:`
                    : `${n}:`
                }
            </h4>
            <TouchButton
                orientation="row"
                output={!areAllValuesIqual? "-" :value}
                add={_add}
                subtract={_subtract}
                data={setOf}
                textStyle={{fontWeight: "900"}}
            />
            <h4 className="fs-text">
                { areAllValuesIqual ? percent(value, arrOfProbability) + '%' : '-' }
            </h4>
            { startIndex !== n ? (
                <ToolButton onClick={handleOnClick} className="set-group">
                    { hidden
                        ? <i style={{padding: "0px"}} className="fs-text flex-column align-c justify-c bi bi-caret-right"></i>
                        : <i style={{padding: "0px"}} className="fs-text flex-column align-c justify-c bi bi-caret-down"></i>
                    }
                </ToolButton>
            ) : <div></div>}
            {!hidden &&  startIndex !== n && (
                setOf.map((v, i2) => (
                    <Fragment key={`set-${i2+index}`}>
                        <span className="fs-text p-2">
                            {`${i2+startIndex}:`}
                        </span>
                        <TouchButton
                            orientation="row"
                            output={v}
                            add={add}
                            subtract={subtract}
                            data={i2+startIndex}
                        />
                        <p className="fs-text">{percent(v, arrOfProbability) + '%'}</p>
                        <div></div>
                    </Fragment>
                ))
            )}

        </>
    );
}

function GrupSetsButtonsGen({grupNumberSize, clickReset, arrOfProbability, add, subtract}) {

    const newArr = separateArrInSetsOf(arrOfProbability, grupNumberSize);

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
                            add={add}
                            subtract={subtract}
                            arrOfProbability={arrOfProbability}
                            clickReset={clickReset}
                        />
                    </Fragment>
                );
            })}
        </div>
    );
}

export default function SetsButton({audioListSize, arrOfProbability, setDispatcher}) {
    const [grupNumberSize, setGrupNumberSize] = useState(5);
    const [clickReset, setClickReset] = useState(false);

    useEffect(() => { setClickReset(() => false); }, [clickReset])

    const operation = (type) => (i, newVal) => {
        if (newVal != null) {
           setDispatcher("probabilityOfSetSize", "set", newVal, i);
        } else {
            const value = arrOfProbability[i];
            if (type === "add")
                setDispatcher("probabilityOfSetSize", "set", value + 1, i);
            else if (type === "subtract")
                setDispatcher("probabilityOfSetSize", "set", value - 1, i);
        }
    } 

    const reset = () => {
        setDispatcher("probabilityOfSetSize", "reset", null);
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