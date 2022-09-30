import { memo, useContext} from "react";

import { AudioListContext } from "../../context/index.js";

import { IconMusicFile } from "../../components/icons/component.js";
import AudioElement from "../AudioElement/component.js";

import "./style.scss";

function AudioLoadingElement() {
    return (
        <div className="audio-loading-element flex-row align-c px-10">
            <h3 className="fs-text">Loading...</h3>
        </div>
    )
}

function SelectAudioElement({bool, _id}) {
    if (bool) return <AudioElement _id={_id}/>
    return <AudioLoadingElement/>
}

function AudioContainer() {
    const [{ loadedAudioList, loadedAudioListSize, completedAudioList }] = useContext(AudioListContext);
    return (
        <main className="main flex-column p-5">
            <div className="main_sub">
                <div className="audio-container flex-column">
                    <div className="audio-container_sub flex-column flex-grow-1">
                        {Object.keys(loadedAudioList).map(id => (
                            <div key={id} className="audio-element--prev p-5" role="region" aria-live="polite">
                                <SelectAudioElement bool={id in completedAudioList} _id={id}/>
                            </div>
                        ))}
                    </div>
                    {loadedAudioListSize === 0 && (
                    <div className="audioFiles_icon flex-column align-c justify-c flex-grow-1">
                        <IconMusicFile className="icon-drop o-5"/>
                        <p className="fs-text p-5">No Audio Files</p>
                    </div>
                    )}
                </div>
            </div>
        </main>
    )
}
export default memo(AudioContainer); 