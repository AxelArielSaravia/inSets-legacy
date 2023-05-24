// @ts-check
import globalState from "../state/globalState.js";
import {globalDefault} from "../state/globalDefault.js";
import {fadeLimits} from "../state/limits.js";
import {createFadesState} from "../state/factory.js";

/**
@type {Readonly<{
    reset: () => FadeAction,
    changeFadeIn: (n: number) => Maybe<FadeAction>,
    changeFadeOut: (n: number) => Maybe<FadeAction>
}>} */
const fadesActions = {
    /**
    @type {() => FadeAction} */
    reset() {
        globalState.fadeIn = globalDefault.fadeIn;
        globalState.fadeOut = globalDefault.fadeOut;
        localStorage.setItem("fadeIn", String(globalDefault.fadeIn));
        localStorage.setItem("fadeOut", String(globalDefault.fadeOut));
        return {type: "reset", payload: createFadesState()};
    },
    /**
    @type {(n: number) => Maybe<FadeAction>} */
    changeFadeIn(n) {
        if (fadeLimits.MIN <= n && n <= fadeLimits.MAX) {
            globalState.fadeIn = n;
            localStorage.setItem("fadeIn", String(n));
            return {type: "fadeIn/change", payload: createFadesState()};
        }
    },
    /**
    @type {(n: number) => Maybe<FadeAction>} */
    changeFadeOut(n) {
        if (fadeLimits.MIN <= n && n <= fadeLimits.MAX) {
            globalState.fadeOut = n;
            localStorage.setItem("fadeOut", String(n));
            return {type: "fadeOut/change", payload: createFadesState()};
        }
    }
};

/**
@type {(
    state: {fadeIn: number, fadeOut: number},
    action: Maybe<FadeAction>
) => {fadeIn: number, fadeOut: number}} */
function fadesReducer(state, action) {
    if (action !== undefined) {
        return action.payload;
    }
    return state;
}

export {
    fadesActions,
    fadesReducer
};