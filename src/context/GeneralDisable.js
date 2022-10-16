import { createContext, useReducer, memo } from "react";

import { ViewGeneralDisableReducer } from "../reducer/index.js";
import { createViewGeneralDisableState } from "../state/Global/index.js";

const GeneralDisableContext = createContext();

const GeneralDisableProvider = memo(
    function GeneralDisableProvider({children}) {
        const value = useReducer(ViewGeneralDisableReducer, createViewGeneralDisableState());
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