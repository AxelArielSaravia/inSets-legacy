import { useState, memo } from "react";
import "./AudioCard.Switch.scss"

export default memo(function Switcher(props) {
    const [isDisable, setIsDisable] = useState(props.effect.isDisable);
 
    const handleOnClick = () => {
        props.effect.isDisable = !props.effect.isDisable;
        setIsDisable(() => props.effect.isDisable);
    }

    return (
        <button type="button" onClick={handleOnClick}>
            <label 
                className="switcher flex-row align-c justify-c" 
                role="switch" 
                aria-checked="true"
                title={props.title ? props.title : ""}
            >
                <input type="checkbox" name="switcher" className="hidden" checked={isDisable} onChange={handleOnClick}/>
                <span className="switcher_thumb fs-text">{props.name}</span>
            </label>
        </button>
    );
});
