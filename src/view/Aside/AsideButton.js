export default function AsideButton(props) {
    return (
        <div className="asideButton">
            {props.title && (
                <div className="asideButton-title">
                    <h3 className="fs-text-l text-center" style={{marginBottom: "10px"}}>
                        {props.title}
                    </h3>
                </div>
            )}
            <div className="asideButton-content">
                {props.description != null && (
                    <p className="fs-text text-center">{props.description}</p>
                )}
                {props.children}
            </div>
    </div>
    );
}