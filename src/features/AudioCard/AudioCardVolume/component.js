import { IconVolume } from "../../../icons/index.js";
import "./style.scss";

export default function AudioCardVolume(props) {
    return (
        <div className="audioCard-volume flex-row justify-c align-c"> 
            <IconVolume className="icon"/>
            <input 
                className="audioCard-volume_input" 
                type="range" 
                value={props.volume} 
                onChange={props.handleOnClick}
                min="1" 
                max="10" 
                step="1"
            />
        </div>
    );
}