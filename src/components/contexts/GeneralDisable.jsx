//@ts-check
import React, {createContext, useReducer, memo} from "react";

import {generalDisableReducer} from "../../slices/generalDisable.js";
import {createGeneralDisableState} from "../../state/factory.js";
import dispatch from "../../state/dispatch.js";

/**
@type {React.Context<GeneralDisableState>} */
const GeneralDisableContext = createContext(createGeneralDisableState());

const GeneralDisableProvider = memo(
    /**
    @type {(prop: {children: JSX.Element}) => JSX.Element} */
    function GeneralDisableProvider({children}) {
        const value = useReducer(generalDisableReducer, createGeneralDisableState());
        dispatch.generalDisable = value[1];
        return (
            <GeneralDisableContext.Provider value={value[0]}>
                {children}
            </GeneralDisableContext.Provider>
        );
    }
);

export {
    GeneralDisableContext,
    GeneralDisableProvider
};