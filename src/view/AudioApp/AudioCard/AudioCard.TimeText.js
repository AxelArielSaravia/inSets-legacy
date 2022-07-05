import TouchButton from "../TouchButton.js";

const isMinorThanTen = (num) => num < 10 ? "0" + num : num;

const durationToTime = (val) => {
    val = Math.floor(val);
    let sec = val % 60;
    val = Math.floor((val-sec) / 60);
    let min = val % 60;
    let hr = Math.floor((val-min) / 60);

    let str = (hr > 0) ? hr + ":" : "";
    str += isMinorThanTen(min) + ":" + isMinorThanTen(sec);
    return str;
}

export default function AudioCardTimeText(props) {
    const t = durationToTime(props.time);
    return <TouchButton
        scroll
        touch
        output={t}
        add={props.add}
        subtract={props.subtract}
        data={props.data}
    />;
}