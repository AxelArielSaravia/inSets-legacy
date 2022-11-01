import {
    AudioListProvider,
    GeneralDisableProvider,
    AppProvider,
    SumOfAllAudiosEventsProvider
} from "../context/index.js";

import {DropFiles, DragFiles} from "../components/DragAndDrop/component.js";
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
                        <DragFiles style={{height:"100%", width: "100%"}}>
                            {(isDragActive) => (
                                <div className="content-audio">
                                    <section className="content-audio_aside flex-column">
                                        <GeneralPanel/>
                                    </section>
                                    <section className="content-audio_main flex-column">
                                        <GeneralAudioButtons/>
                                        <AudioContainer/>
                                    </section>
                                    {isDragActive && (
                                        <DropFiles className="dropFile flex-column align-c justify-c"/>
                                    )}
                                </div>
                            )}
                        </DragFiles>
                    </SumOfAllAudiosEventsProvider>
                </AppProvider>
            </GeneralDisableProvider>
        </AudioListProvider>
    );
}

export default App;