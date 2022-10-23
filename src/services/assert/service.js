/*-
-- Looks if a number exist in a close interval
isInsideInterval: (number, number, number) -> boolean 
*/
function isInsideInterval(min, max, val) {
    if (typeof min !== "number" 
        || typeof max !== "number"
        || typeof val !== "number"
    ) {
        return false;
    }
    return (min <= val && val <= max);
}

export {
    isInsideInterval
};