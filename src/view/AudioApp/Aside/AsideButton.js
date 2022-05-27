import { useState, useEffect } from "react";
import ToolButton from "../ToolButton.js";
import ToolPop from "./ToolPop.js";


export default function AsideButton(props) {
    const [active, setActive] = useState(false);
    const handleOnClick = () => { setActive(state => !state) }
    useEffect(() => {
        const el = (e) => {
            const a = "." + props.match + " *";
            if (e.target.matches(a)) return;
            handleOnClick();
        }
        if (active) {
            document.addEventListener('click', el);
            return () => { document.removeEventListener('click', el); } 
        }
    }, [active]);

    return (
        <div className={props.match + " aside-button flex-row"}>
            <ToolButton className="flex-row" onClick={handleOnClick}>
                <h4 className={"fs-text " + props.className}>{props.name}</h4>
            </ToolButton>
            {active && <ToolPop>{props.children}</ToolPop>}
        </div>
    );
}