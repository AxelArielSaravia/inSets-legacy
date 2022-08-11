export default function AsideButton({title, description, children}) {
    return (
        <div className="asideButton">
            {title && (
                <div className="asideButton-title">
                    <h3 className="fs-text-l text-center" style={{marginBottom: "10px"}}>
                        {title}
                    </h3>
                </div>
            )}
            <div className="asideButton-content">
                {description != null && (
                    <p className="fs-text text-center">{description}</p>
                )}
                {children}
            </div>
    </div>
    );
}