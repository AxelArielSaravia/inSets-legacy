import { useState, useEffect,memo } from "react";

import Switch from "../SwitchButton.js";

export default memo(function Switcher(props) {
    const isAllDisable = props.isAllDisable;
    const [isDisable, setIsDisable] = useState(props.effect.isDisable);
 
    useEffect(() => {
        if (isAllDisable.generalBTN) {
            props.effect.isDisable = isAllDisable.value;
            setIsDisable(() => isAllDisable.value);
        }
    }, [isAllDisable]);

    const handleOnClick = () => {
        if (isAllDisable.value) {
            props.setIsAllDisable(props.effectName);
        }
        props.effect.isDisable = !props.effect.isDisable;
        setIsDisable(() => props.effect.isDisable);
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