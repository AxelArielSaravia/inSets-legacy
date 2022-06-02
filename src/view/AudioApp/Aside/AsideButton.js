export default function AsideButton(props) {
    return (
        <div className="asideButton">
            <div className="asideButton-title">
                <h3 className="fs-text-l">{props.title}</h3>
            </div>
            <div className="asideButton-content">
                {props.children}
            </div>
    </div>
    );
}