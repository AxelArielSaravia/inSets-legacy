function changeLocalStorageState(name, value, objKey = null) {
    if (objKey != null) {
        const localStorageElement = JSON.parse(localStorage.getItem(name));
        localStorageElement[objKey] = value;
        localStorage.setItem(name, JSON.stringify(localStorageElement)); 
    }  else {
        localStorage.setItem(name, JSON.stringify(value)); 
    }
}

export { changeLocalStorageState }