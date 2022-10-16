import { random } from "../utils.js";

/*-
changeColor: undefined -> string
*/
function changeColor() {
  return `rgb(${random(32, 141)},${random(32, 141)},${random(32, 141)})`;
}

export default Object.freeze(changeColor);