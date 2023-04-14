/*-
flipCoin :: undefined -> number */
function flipCoin() {
    return (Math.random() < 0.5);
}

/*-
wait :: number -> Promise */
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export {
    flipCoin,
    wait
};