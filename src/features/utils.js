const isMinorThanTen = (num) => num < 10 ? "0" + num : num;

const calcPercent = (a, b) => {
    if (a <= 0) return 0;
    return  Math.floor((b * 100) / a);
} 

export {
    calcPercent,
    isMinorThanTen
}