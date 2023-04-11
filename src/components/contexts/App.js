import {createContext, useReducer, memo} from "react";

import {appReducer} from "../../slices/app.js";
import {appInitialState} from "../initialState.js";

const AppContext = createContext();

const AppProvider = memo(function AppProvider({children}) {
    const value = useReducer(appReducer, appInitialState);
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
});

export {
    AppContext,
    AppProvider
};