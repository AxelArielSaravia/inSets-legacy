function Show({is, children}) {
    return (
        is
        ? children
        : undefined
    );
}

export default Show;