import { useReducer, memo } from "react";

import { createGlobalView } from "../../state/Global/index.js"

import globalViewReducer from "../../reducer/Global/reducer.js";

import GlobalContext from "./context.js";

const GlobalProvider = memo(function GlobalStateProvider({children, state}) {
    const initGlobalView =  createGlobalView(state);
    const [globalView, globalViewDispatcher] = useReducer(globalViewReducer, initGlobalView);
    const value = [globalView, globalViewDispatcher];
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
});

export default GlobalProvider;