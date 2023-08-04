//@ts-check
import React from "react";
import {createContext, useReducer, memo} from "react";

import {appReducer} from "../../slices/app.js";
import {createAppState} from "../../state/factory.js";
import dispatch from "../../state/dispatch.js";

/**@type {React.Context<AppState>} */
const AppContext = createContext(createAppState());

const AppProvider = memo(
    /**@type {(prop: {children: JSX.Element}) => JSX.Element} */
    function AppProvider({children}) {
        const value = useReducer(appReducer, createAppState());
        dispatch.app = value[1];
        return (
            <AppContext.Provider value={value[0]}>
                {children}
            </AppContext.Provider>
        );
    }
);

export {
    AppContext,
    AppProvider
};