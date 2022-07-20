import "./ToolButton.scss";

export default function ToolButton(props) {
    return (
        <button
            className={props.className? "tool-button " + props.className : "tool-button"}
            type="button"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}