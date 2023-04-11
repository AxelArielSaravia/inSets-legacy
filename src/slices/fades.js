import globalState from "../state/globalState.js";
import {globalDefault} from "../state/globalDefault.js";
import {fadeLimits} from "../state/limits.js";
import {isInsideInterval} from "../utils.js";

/*-
fadesReducer :: (FadesState, {
    type: "reset" | "fadeIn/change" | "fadeOut/change",
    payload?: FadesState
}) -> FadesState */
function fadesReducer(state, action) {
    const type = action?.type;
    const payload = action?.payload;
    return (
        type === "reset"
        || type === "fadeIn/change"
        || type === "fadeOut/change"
        ? payload
        : state
    );
}

const fadesActions = Object.freeze({
    reset() {
        globalState.fadeIn = globalDefault.fadeIn;
        globalState.fadeOut = globalDefault.fadeOut;
        localStorage.setItem("fadeIn", globalDefault.fadeIn);
        localStorage.setItem("fadeOut", globalDefault.fadeOut);
        return {
            type: "reset",
            payload: {
                fadeIn: globalDefault.fadeIn,
                fadeOut: globalDefault.fadeOut
            }
        };
    },
    changeFadeIn(number) {
        if (isInsideInterval(fadeLimits.MIN, fadeLimits.MAX, number)) {
            globalState.fadeIn = number;
            localStorage.setItem("fadeIn", globalDefault.fadeIn);
            return {
                type: "fadeIn/change",
                payload: {fadeIn: number, fadeOut: globalState.fadeOut}
            };
        }
    },
    changeFadeOut(number) {
        if (isInsideInterval(fadeLimits.MIN, fadeLimits.MAX, number)) {
            globalState.fadeOut = number;
            localStorage.setItem("fadeOut", globalDefault.fadeOut);
            return {
                type: "fadeOut/change",
                payload: {fadeIn: globalState.fadeIn, fadeOut:number}
            };
        }
    }
});

export {
    fadesActions,
    fadesReducer
};