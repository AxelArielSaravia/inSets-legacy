import {AudioListProvider} from "./contexts/AudioList.js";
import {GeneralDisableProvider} from "./contexts/GeneralDisable.js";
import {AppProvider} from "./contexts/App.js";
import {SumOfAllAudiosEventsProvider} from "./contexts/SumOfAllAudiosEvents.js";

import DragContainer from "./DragContainer.js";
import PanelContainer from "./Panel/PanelContainer.js";
import AudioContainer from "./Audio/AudioContainer.js";
import GlobalButtons from "./GlobalButtons.js";

import "./App.scss";

function App() {
    return (
        <AudioListProvider>
            <GeneralDisableProvider>
                <AppProvider>
                    <SumOfAllAudiosEventsProvider>
                        <DragContainer className="content-audio">
                            <section className="content-audio_aside flex-column">
                                <PanelContainer/>
                            </section>
                            <section className="content-audio_main flex-column">
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