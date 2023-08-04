const style = {width:"100%"};

/**
@type {(props: {
    title?: string,
    children?: JSX.Element | Array<JSX.Element>
}) => JSX.Element} */
function PanelConfigChild({title, children}) {
    return (
        <div className="config-panel_children p-5" style={style}>
            <div className="flex-row align-c">
                <h3 className="fs-text text-bold">{title}</h3>
            </div>
            {children}
        </div>
    );
}

export default PanelConfigChild;
