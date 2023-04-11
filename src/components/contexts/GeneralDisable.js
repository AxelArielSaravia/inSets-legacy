import {createContext, useReducer, memo} from "react";

import {generalDisableReducer} from "../../slices/generalDisable.js";
import {createGeneralDisableInitialState} from "../initialState.js";

const GeneralDisableContext = createContext();

const GeneralDisableProvider = memo(
    function GeneralDisableProvider({children}) {
        const value = useReducer(generalDisableReducer, createGeneralDisableInitialState());
        return (
            <GeneralDisableContext.Provider value={value}>
                {children}
            </GeneralDisableContext.Provider>
        );
    }
);

export {
    GeneralDisableContext,
    GeneralDisableProvider
};