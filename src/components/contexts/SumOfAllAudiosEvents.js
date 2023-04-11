import {createContext, useReducer, memo} from "react";

import {sumOfAllAudiosEventsReducer} from "../../slices/sumOfAllAudiosEvents.js";

const SumOfAllAudiosEventsContext = createContext();

const SumOfAllAudiosEventsProvider = memo(
    function SumOfAllAudiosEventsProvider({children}) {
        const value = useReducer(sumOfAllAudiosEventsReducer, 0);
        return (
            <SumOfAllAudiosEventsContext.Provider value={value}>
                {children}
            </SumOfAllAudiosEventsContext.Provider>
        );
    }
);

export {
    SumOfAllAudiosEventsContext,
    SumOfAllAudiosEventsProvider
};