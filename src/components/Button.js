export default function ToolButton({
    className = "",
    value,
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
            onClick={() => onClick(value)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
            onKeyDown={onKeyDown}
        >
            {children}
        </button>
    );
}