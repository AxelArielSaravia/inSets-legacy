// @ts-check
const EmptyObject = {};

const EventOnce = {once: true};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
/** @type {() => string }*/
function createId() {
    let id = Date.now().toString();
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

/**
@type {() => string} */
function getRandomColor() {
    return `rgb(${random(32, 141)},${random(32, 141)},${random(32, 141)})`;
}

/**
@type {(min: number, max: number) => number}*/
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



export {
    EmptyObject,
    EventOnce,
    createId,
    getRandomColor,
    random
};