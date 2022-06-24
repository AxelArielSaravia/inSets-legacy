import "./SwitchButton.scss";

export default function SwitchButton(props) {
    const className = "switch-button";
    return (
        <button 
            className={props.className? className + props.className : className} 
            type="button"
        >
            <label 
                className="switcher flex-row align-c justify-c" 
                role="switch" 
                aria-checked="true"
                title={props.title ? props.title : ""}
            >
                <input type="checkbox" name="switcher" className="hidden" checked={props.isDisable} onChange={props.onClick}/>
                <span className="switcher_thumb fs-text">{props.name}</span>
            </label>
        </button>
    );
}