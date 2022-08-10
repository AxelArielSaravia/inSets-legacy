import { memo, useEffect } from "react";

import Switch from "../SwitchButton.js";

export default memo(function Switcher(props) {
    const isDisable = props.isDisable;
    const AreAllDisable = props.AreAllDisable;
    const handleOnEffect = props.handleOnEffect
    const effectName = props.effectName;
    useEffect(() => {
        if (AreAllDisable.global) {
            handleOnEffect(effectName, AreAllDisable.value);
        }
    }, [AreAllDisable, handleOnEffect, effectName]);

    const handleOnClick = () => {
        props.handleOnClick(AreAllDisable.value, isDisable, effectName);
    }

    return (
        <Switch 
            onClick={handleOnClick}
            isDisable={isDisable}
            title={props.title}
            name={props.name}
        />
        
    );
});