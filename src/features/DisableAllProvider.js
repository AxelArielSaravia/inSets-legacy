import { createContext, useReducer, memo } from "react";

const ContextDisableAll = createContext(null);

const value = () => {
    const arr = ["delay", "filter", "panner", "playBackRate", "randomCurrentTime"]
    const obj = {};
    arr.forEach(el => {
        let storage = JSON.parse(localStorage.getItem(el));
        obj[el] = {};
        obj[el].value = storage.disableAll ?? false;
        obj[el].generalBTN = false
    }); 
    return obj;
}

const disableReducer = (state, action) => {
    if (action.type === "disable") {
        switch (action.typeEffect) {
            case "delay": 
                return {...state, delay: {generalBTN: true, value: !state.delay.value}};
            case "filter": 
                return {...state, filter: {generalBTN: true, value: !state.filter.value}};
            case "panner":
                return {...state, panner: {generalBTN: true, value: !state.panner.value}};
            case "playBackRate":
                return {...state, playBackRate: {generalBTN: true, value: !state.playBackRate.value}};
            case "randomCurrentTime": 
                return {...state, randomCurrentTime: {generalBTN: true, value: !state.randomCurrentTime.value}};
            default:
                return state;
        }
    } else if (action.type === "audioCard") {
        switch (action.typeEffect) {
            case "delay": 
                return {...state, delay: {generalBTN: false, value: false}};
            case "filter": 
                return {...state, filter: {generalBTN: false, value: false}};
            case "panner":
                return {...state, panner: {generalBTN: false, value: false}};
            case "playBackRate":
                return {...state, playBackRate: {generalBTN: false, value: false}};
            case "randomCurrentTime": 
                return {...state, randomCurrentTime: {generalBTN: false, value: false}};
            default:
                return state;
        }
    } else {
        return state;
    }
}

const DisableAllProvider = memo(function (props) {
    const [disableAll, dispatchDisableAll] = useReducer(disableReducer, value());
    return (
        <ContextDisableAll.Provider value={[disableAll, dispatchDisableAll]}> 
            {props.children}
        </ContextDisableAll.Provider>
    );
});

export {
    ContextDisableAll,
    DisableAllProvider
}