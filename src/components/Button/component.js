import "./style.scss";

export default function ToolButton({
    className = "", 
    title,
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onKeyDown,
    children
}) {
 
    return (
        <button
            title={title}
            className={"t-button " + className}
            type="button"
            onClick={onClick}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
            onKeyDown={onKeyDown}
        >
            {children}
        </button>
    );
}