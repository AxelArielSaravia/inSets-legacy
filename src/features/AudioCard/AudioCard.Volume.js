import "./AudioCard.Volume.scss";

export default function AudioCardVolume(props) {
    return (
        <div className="audioCard-volume flex-row justify-c align-c"> 
            <i className="bi bi-volume-off-fill flex-row align-c"/>
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