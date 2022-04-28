import "./AudioCardSwitch.scss"

export default function Switcher(props) {

    return (
        <label className="switcher" role="switch" aria-checked="true">
            <input type="checkbox" name="switcher" className="hidden" onClick={props.onClick}/>
            <span className="switcher_thumb fs-text">{props.name}</span>
        </label>
    );
}
