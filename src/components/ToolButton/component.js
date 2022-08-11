import "./style.scss";

export default function ToolButton({className = "", onClick, children}) {
 
    return (
        <button
            className={"tool-button " + className}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}