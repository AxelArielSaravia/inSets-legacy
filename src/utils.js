const EmptyObject = {};



/*-
createId :: undefined -> string */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
function createId() {
    let id = Date.now() + "";
    for (let i = 0; i < 8; i += 1) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const position = Math.floor(Math.random() * id.length);
        if (position === id.length) {
            id = String.prototype.concat.call(id, char);
        } else if (position === 0) {
            id = String.prototype.concat.call(char, id);
        } else {
            id = String.prototype.concat.call(
                String.prototype.slice.call(id, 0, position),
                char,
                String.prototype.slice.call(id, position)
            );
        }
    }
    return id;
}

/*-
getRandomColor :: undefined -> string */
function getRandomColor() {
    return `rgb(${random(32, 141)},${random(32, 141)},${random(32, 141)})`;
}

/*-
@desc (
    Looks if a number exist in a close interval
)
isInsideInterval :: (number, number, number) -> boolean */
function isInsideInterval(min, max, val) {
    return (
        (typeof min !== "number"
         || typeof max !== "number"
         || typeof val !== "number"
        )
        ? false
        : min <= val && val <= max
    );
}

/*-
random :: number, number -> number */
function random(min, max) {
    try {
        if (typeof min !== "number" || typeof max !== "number") {
            new Error("the arguments in random function must be numbers");
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    } catch(err) {
        console.error(err);
        return NaN;
    }
}

export {
    EmptyObject,

    createId,
    getRandomColor,
    isInsideInterval,
    random
};