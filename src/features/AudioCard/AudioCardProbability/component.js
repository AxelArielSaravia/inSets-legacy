import TouchButton from "../../../components/TouchButton/index.js"

import { calcPercent } from "../../utils.js";

export default function ProbabilityButton(props) {
    const probability = props.probability;
    const totalAudioProbabilityPoints = props.totalAudioProbabilityPoints;

    const add = () => props.probabilityOperation("add");
    const subtract = () => props.probabilityOperation("subtract");

    return (
        <>
            <TouchButton
                orientation="row"
                add={add}
                subtract={subtract}
                output={probability}
            />
            <p className="fs-text text-center">{calcPercent(totalAudioProbabilityPoints, probability) + "%"}</p>
        </>
    );
}
