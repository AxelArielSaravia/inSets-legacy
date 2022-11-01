import Button from "../../../components/Button/component.js";

function ItemsPanelElement({
    active = false,
    onClickHandler,
    text,
    title
}) {
    return (
        <div className={"items-panel_button flex-row justify-c"}>
            <Button
                title={title}
                className={(
                    active
                    ? "active flex-row align-c justify-c"
                    : "flex-row align-c justify-c"
                )}
                onClick={onClickHandler}
            >
                <h4 className="fs-text">{text}</h4>
            </Button>
        </div>
    );
}

export default ItemsPanelElement;