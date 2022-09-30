import { createContext, useReducer, memo } from "react";

import { SumOfAllAudiosEventsReducer } from "../reducer/index.js";

const SumOfAllAudiosEventsContext = createContext(null); 

const SumOfAllAudiosEventsProvider = memo(function SumOfAllAudiosEventsProvider({children}) {
    const value = useReducer(SumOfAllAudiosEventsReducer, 0);
    return (
        <SumOfAllAudiosEventsContext.Provider value={value}>
            {children}
        </SumOfAllAudiosEventsContext.Provider>
    );
});

export {
    SumOfAllAudiosEventsContext,
    SumOfAllAudiosEventsProvider
};