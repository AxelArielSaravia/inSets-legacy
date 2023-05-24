/**@type {React.Dispatch<A>} */
function emptyDispatch(a) {}

const dispatch = {
    /**
    @type {React.Dispatch<Maybe<AppAction>>} */
    app: emptyDispatch,
    /**
    @type {React.Dispatch<AudioListAction>} */
    audioList: emptyDispatch,
    /**
    @type {React.Dispatch<GeneralDisableAction>} */
    generalDisable: emptyDispatch,
    /**
    @type {React.Dispatch<Maybe<SumOfAllAudiosEventsAction>>} */
    sumOfAllAudiosEvents: emptyDispatch,
    /**
    @type {React.Dispatch<PanelConfigAction>} */
    panelConfig: emptyDispatch,
};
export default dispatch;
export {
    emptyDispatch,
};