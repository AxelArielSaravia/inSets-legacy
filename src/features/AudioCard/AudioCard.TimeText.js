import TouchButton from "../TouchButton.js";

const isMinorThanTen = (num) => num < 10 ? "0" + num : num;
const durationToTime = (val) => {
    const _val = Math.floor(val);
    const sec = _val % 60;
    const min = Number.parseInt(_val / 60) % 60;
    const hr = Number.parseInt(_val / 3600);
    let str = (hr > 0) ? hr + ":" : "";
    str += isMinorThanTen(min) + ":" + isMinorThanTen(sec);
    return str;
}

export default function AudioCardTimeText({time, add, subtract, data}) {
    const t = durationToTime(time);
    return <TouchButton
        scroll
        touch
        output={t}
        add={add}
        subtract={subtract}
        data={data}
    />;
}