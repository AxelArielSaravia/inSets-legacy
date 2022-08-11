/**
* create a random arbitrary number
* @param {number} min the min number (real number) to the random interval
* @param {number} max the max number (real number) to the random interval
* @returns {number} a pseudo random integer number
*/
function random(min, max){
    try {
        if(typeof min !== 'number') throw new Error("min argument in random method must be a number");
        if(typeof max !== 'number') throw new Error("max argument in random method must be a number");
        
        min = Math.ceil(min);
        max = Math.floor(max);
 
        return Math.floor(Math.random() * (max - min + 1) + min);
    } catch(err){
        console.error(err);
        return err;
    }    
}

export {
    random
}