/*-
createId: undefined -> string
*/
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";

function createId() {
    let id = Date.now() + "";
    for (let i = 0; i < 8; i += 1) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const position = Math.floor(Math.random() * id.length);
        if (position === id.length) {
            id = String.prototype.concat.call("", id, char);
        } else if (position === 0) {
            id = String.prototype.concat.call("", char, id);
        } else {
            id = String.prototype.concat.call(
                "",
                String.prototype.slice.call(id, 0, position),
                char,
                String.prototype.slice.call(id, position)
            );
        }
    }
    return id;
}

export default createId;