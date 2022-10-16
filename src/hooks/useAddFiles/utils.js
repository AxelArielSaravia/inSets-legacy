import { createAudioState } from "../../state/Audio/index.js";
import { GlobalState } from "../../state/Global/index.js";

import createId  from "../../services/createId/service.js";


/*-
@desc (
    See if the type of the file have a valid audio type
)
isValidAudioType: string -> boolean
*/
const isValidAudioType = (type) => (/^audio\/\w+$/).test(type);


/*-
canPlayType: HTMLAudioElement, string -> "probably" | "maybe" | ""
*/
function canPlayType(HTMLAudio, mediaType) {
    if (!HTMLAudio.canPlayType) {
        throw new Error("HTMLAudioElement.prototype.canPlayType does not find");
    }
    return HTMLAudio.canPlayType(mediaType);
}

/*-
audioFromFile_AudioNode: (
    File,
    {id: string, type: string} -> undefined,
    {type: string} -> udnefined
) -> undefined
*/
async function audioFromFile_AudioNode(
    file,
    audioListDispatcher,
    sumOfAllEventsDispatcher
) {
    //ID of AudioState
    const id = createId();
    try {
        //available to use in view
        audioListDispatcher({id, type: "addLoading"});

        const url = URL.createObjectURL(file);
        const htmlAudio = await new Audio(url);
        if (!canPlayType(htmlAudio, file.type)) {
            throw new Error(`Can not play this audio type ${file.type}`);
        }

        //presersPitch false in playbackrate
        if (htmlAudio.preservesPitch !== undefined) {
            htmlAudio.preservesPitch = false;
        }

        htmlAudio.addEventListener("error", function() {
            console.warn(`Delete ${file.name} from list`);
            audioListDispatcher({id, type: "loadingError"});
            throw new Error(`Error loading: ${file.name}`);
        }, {once: true});

        htmlAudio.addEventListener("canplaythrough", function() {
            /* the audio is now playable; play it if permissions allow */
            try {
                let source = GlobalState._audio_context.createMediaElementSource(htmlAudio);
                let audioState = createAudioState({
                    GlobalState,
                    audioEngine: htmlAudio,
                    duration: htmlAudio.duration,
                    id,
                    source,
                    title: file.name,
                    type: file.type
                });

                //Add audioState to GlobalState
                GlobalState._audio_list.set(id, audioState);
                //available to use in view
                audioListDispatcher({id, type: "addCompleted"});
                sumOfAllEventsDispatcher({type: "add"});

                source = undefined;
                audioState = undefined;
            } catch (err) {
                console.error(err);
                console.warn(`The error was catching and delete ${file.name} from list`);
                audioListDispatcher({id, type: "loadingError"});
            }
        },{once: true});
    } catch (err) {
        console.error(err);
        console.warn(`The error was catching and delete ${file.name} from list`);
        audioListDispatcher({id, type: "loadingError"});
    }
}

export {
    audioFromFile_AudioNode,
    isValidAudioType
};