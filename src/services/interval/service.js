/**
 * Looks if a number exist in a close interval 
 * @param {number} min 
 * @param {number} max 
 * @param {number} val 
 * @returns {boolean}
 */
 const isInsideInterval = (min, max, val) => min <= val && val <= max;


export { isInsideInterval }