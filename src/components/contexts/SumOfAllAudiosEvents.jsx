//@ts-check
import React, {createContext, useReducer, memo} from "react";

import {sumOfAllAudiosEventsReducer} from "../../slices/sumOfAllAudiosEvents.js";
import dispatch from "../../state/dispatch.js";

const SumOfAllAudiosEventsContext = createContext(0);

const SumOfAllAudiosEventsProvider = memo(
    /**
    @type {(prop: {children: JSX.Element}) => JSX.Element} */
    function SumOfAllAudiosEventsProvider({children}) {
        const value = useReducer(sumOfAllAudiosEventsReducer, 0);
        dispatch.sumOfAllAudiosEvents = value[1];
        return (
            <SumOfAllAudiosEventsContext.Provider value={value[0]}>
                {children}
            </SumOfAllAudiosEventsContext.Provider>
        );
    }
);

export {
    SumOfAllAudiosEventsContext,
    SumOfAllAudiosEventsProvider
};