import TouchButton from "../TouchButton.js"

const percent = (val, N) => {
    if (val <= 0) return '0';
    return Math.floor(val / N * 100);
};

const calcPercent = (a, b) => {
    if (a <= 0) return 0;
    return  Math.floor((b * 100) / a);
} 

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
