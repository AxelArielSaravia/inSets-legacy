/*-
-- Looks if a number exist in a close interval
isInsideInterval: (number, number, number) -> boolean 
*/
function isInsideInterval(min, max, val) {
    return (min <= val && val <= max);
}

export {
    isInsideInterval
};