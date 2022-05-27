import "./ToolPop.scss";

export default function ToolPop(props) {
    return (
        <div className={"tool-pop " + props.className}>
            {props.children}
        </div>
    );
}