import "./ToolButton.scss";

export default function ToolButton(props) {
    return (
        <button
            className={"tool-button " +  props.className}
            type="button"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}