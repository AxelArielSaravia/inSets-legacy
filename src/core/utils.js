/**
 * create a random arbitrary number
 * @param {number} min the min number (real number) to the random interval
 * @param {number} max the max number (real number) to the random interval
 * @returns {number} a pseudo random integer number
 */
function random(min, max){
    try{
        if(typeof min !== 'number') throw new Error("min argument in random method must be a number");
        if(typeof max !== 'number') throw new Error("max argument in random method must be a number");
        
        min = Math.ceil(min);
        max = Math.floor(max);

        if (min > max) [min, max] = [max, min];//swap

        return Math.floor(Math.random() * (max - min + 1) + min);
    } catch(err){
        console.error(err);
        return err;
    }    
}



/**
 *  Devuelve un numbero que representa cuantos audios (consevidos como conjuntos o sets) deben ejecutarse.
 *  Mientras más repeticiones tenga algun conjunto, set, más posibilidades de aparecer tiene.
 * @param {Sets} sets 
 * @returns {number}
 */
function organizateSetsExecution(sets) {
    //almacena el numero que representa el set,la cantidad de veces que se repite
    let arrOfPossibilities = []; 
  
    for (let i = 0; i < sets.length; i++) {
        //adquirimos la cantidad de repeticiones por set
        const repeats = sets.get(i);
        if (repeats <= 0) continue; 

        //creamos un array que tiene la cantidad de espacios por repeticion
        //y donde cada espacio tiene el valor del set
        const arrSetLength = (new Array(repeats)).fill(i);

        //concatenamos arrays
        arrOfPossibilities = [...arrOfPossibilities, ...arrSetLength];
    }
    //creamos un numbero random
    const n = random(0, arrOfPossibilities.length-1);
    //devolvemos de manera aleatoria alguno de los numeros, que representan un set, almacenados en arr
    return arrOfPossibilities[n];
}

/**
 * @param {number} ms 
 * @returns {Promise<number>}
 */
const wait = ms => new Promise(resolve => setInterval(resolve, ms));


export {
    random,
    organizateSetsExecution,
    wait
}