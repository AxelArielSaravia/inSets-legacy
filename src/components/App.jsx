import {AudioListProvider} from "./contexts/AudioList.jsx";
import {GeneralDisableProvider} from "./contexts/GeneralDisable.jsx";
import {AppProvider} from "./contexts/App.jsx";
import {SumOfAllAudiosEventsProvider} from "./contexts/SumOfAllAudiosEvents.jsx";

import DragContainer from "./DragContainer.jsx";
import PanelContainer from "./Panel/PanelContainer.jsx";
import AudioContainer from "./Audio/AudioContainer.jsx";
import GlobalButtons from "./GlobalButtons.jsx";

function App() {
    return (
        <AudioListProvider>
            <GeneralDisableProvider>
                <AppProvider>
                    <SumOfAllAudiosEventsProvider>
                        <DragContainer className="content-audio">
                            <section
                                className="content-audio_aside flex-column"
                            >
                                <PanelContainer/>
                            </section>
                            <section
                                className="content-audio_main flex-column"
                            >
                                <GlobalButtons/>
                                <AudioContainer/>
                            </section>
                        </DragContainer>
                    </SumOfAllAudiosEventsProvider>
                </AppProvider>
            </GeneralDisableProvider>
        </AudioListProvider>
    );
}

export default App;
