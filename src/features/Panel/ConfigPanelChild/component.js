function ConfigPanelChild({title, children}) {
    return (
        <div className="config-panel_children p-5" style={{width:"100%"}}>
            <div className="flex-row align-c">
                <h3 className="fs-text text-bold">{title}</h3>
            </div>
            {children}
         </div>
    );
}

export default ConfigPanelChild;