//@ts-check
/**
@type {(porp: {is: boolean, children: JSX.Element}) => JSX.Element | null} */
function Show({is, children}) {
    return (
        is
        ? children
        : null
    );
}

export default Show;