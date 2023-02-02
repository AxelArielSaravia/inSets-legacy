import {
    AudioListProvider,
    GeneralDisableProvider,
    AppProvider,
    SumOfAllAudiosEventsProvider
} from "../context/index.js";

import {DragFiles} from "../components/DragAndDrop/component.js";
import GeneralPanel from "./Panel/component.js";
import AudioContainer from "./AudioContainer/component.js";
import GeneralAudioButtons from "./GeneralAudioButtons/component.js";

import "./App.scss";

function App() {
    return (
        <AudioListProvider>
            <GeneralDisableProvider>
                <AppProvider>
                    <SumOfAllAudiosEventsProvider>
                        <DragFiles className="content-audio">
                            <section className="content-audio_aside flex-column">
                                <GeneralPanel/>
                            </section>
                            <section className="content-audio_main flex-column">
                                <GeneralAudioButtons/>
                                <AudioContainer/>
                            </section>
                        </DragFiles>
                    </SumOfAllAudiosEventsProvider>
                </AppProvider>
            </GeneralDisableProvider>
        </AudioListProvider>
    );
}

export default App;