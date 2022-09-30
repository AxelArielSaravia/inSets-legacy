export const hasAudioContext = () => {
    const audioContextClass = window.AudioContext || window.webkitAudioContext || null;
    return audioContextClass != null
}
