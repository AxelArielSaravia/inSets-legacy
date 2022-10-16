/*-
-- create a random arbitrary number
random: number, number -> number
*/
function random(min, max) {
    try {
        if(typeof min !== "number" || typeof max !== "number") {
            new Error("the arguments in random function must be numbers");
        }
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1) + min);
    } catch(err) {
        console.error(err);
        return 0;
    }
}

export {
    random
};