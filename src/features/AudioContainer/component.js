import {useContext} from "react";

import {AudioListContext} from "../../context/index.js";

import {IconMusicFile} from "../../components/icons/component.js";
import AudioElement from "../AudioElement/component.js";
import Show from "../../components/Show/component.js";

import "./style.scss";

function AudioLoadingElement() {
    return (
        <div className="audio-loading-element flex-row align-c px-10">
            <h3 className="fs-text">Loading...</h3>
        </div>
    );
}

function SelectAudioElement({bool, id}) {
    if (bool) {
        return <AudioElement id={id}/>;
    }
    return <AudioLoadingElement/>;
}



function LoadedAudioList({list, completed}) {
    return list.map(function m(id) {
        return (
            <SelectAudioElement
                key={id}
                bool={id in completed}
                id={id}
            />
        );
    });
}


function AudioContainer() {
    const [{
        loadedAudioList,
        loadedAudioListSize,
        completedAudioList
    }] = useContext(AudioListContext);

    const asd = (
        window.matchMedia("(min-width: 1000px)").matches
        ? {gridTemplateColumns: "repeat(2, 50%)"}
        : null
    );

    return (
        <main className="main flex-column p-5">
            <div className="audio-container flex-column">
                <div className="audio-container_sub" style={asd}>
                    <LoadedAudioList
                        list={Object.keys(loadedAudioList)}
                        completed={completedAudioList}
                    />
                </div>
                <Show is={loadedAudioListSize === 0}>
                    <div className="audioFiles_icon flex-column align-c justify-c flex-grow-1">
                        <IconMusicFile className="icon-drop o-5"/>
                        <p className="fs-text p-5">No Audio Files</p>
                    </div>
                </Show>
            </div>
        </main>
    );
}
export default AudioContainer;