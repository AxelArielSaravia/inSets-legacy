const PlayButtonClass = "tool-button flex-row align-c justify-c";

export default function PlayButton(props) {
 return (
    <button 
        className={props.disable ? PlayButtonClass : PlayButtonClass + " pop disable"}
        onClick={props.onClick}
    >
        { props.isPlaying 
            ? <i className="tool-button_icon fs-text-l bi bi-stop-circle"></i>
            : <i className="tool-button_icon fs-text-l bi bi-play-circle"></i>
        }
        <h4 className="fs-text-l">{!props.isPlaying ? "Start" : "Stop"}</h4>
        {!props.disable && <div className="up fs-text-l">add files</div>}
  </button>
 );
}