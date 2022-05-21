import { useState } from "react";
import "./AudioCard.Volume.scss";

import { changeVolume } from "../../../core/audioEffects.js";

export default function AudioCardVolume(props) {
    const [volume, setVolume] = useState(props.volume.get() * 10 || 10);

    const handleAddOnClick = (e) => {
        let val = e.target.value;
        changeVolume(props.id, val/10);
        setVolume(() => val);
    }

    return (
        <div className="audioCard-volume flex-row justify-c align-c"> 
            <i className="bi bi-volume-off-fill flex-row align-c"/>
            <input 
                className="audioCard-volume_input" 
                type="range" 
                value={volume} 
                onChange={handleAddOnClick}
                min="1" 
                max="10" 
                step="1"
            />
        </div>
    );
}