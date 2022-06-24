export default function AsideButton(props) {
    return (
        <div className="asideButton">
            <div className="asideButton-title">
                <h3 className="fs-text-l text-center" style={{marginBottom: "10px"}}>{props.title}</h3>
            </div>
            <div className="asideButton-content">
                {props.description != null && (
                    <div>
                        <p className="fs-text">{props.description}</p>
                    </div>
                )}
                {props.children}
            </div>
    </div>
    );
}