import { createContext, useReducer, memo } from "react";

import { ViewAppReducer } from "../reducer/index.js";
import { createViewAppState } from "../state/Global/index.js";

const AppContext = createContext(null); 

const AppProvider = memo(function AppProvider({children}) {
    const value = useReducer(ViewAppReducer, createViewAppState());
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