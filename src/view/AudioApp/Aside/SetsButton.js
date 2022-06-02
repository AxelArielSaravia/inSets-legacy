import AsideButton from "./AsideButton.js";
export default function SetsButton(props) {


    return (
        <AsideButton title="Sets">
            {props.audioList_size === 0 ? <div>No audio files</div> : (
                <div>

                </div>
            )} 
        </AsideButton>
    );
}