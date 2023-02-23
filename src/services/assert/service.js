/*-
-- Looks if a number exist in a close interval
isInsideInterval: (number, number, number) -> boolean
*/
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

export {
    isInsideInterval
};