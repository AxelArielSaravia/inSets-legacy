function HasNotAudioContext () {
    return (
        <div className="init-content flex-column align-c justify-c">
            <h1 className="fs-text-l text-center py-20">
            ERROR: Sorry we have a problem
            </h1>
            <div className="py-20">
            <p className="fs-text-l text-center" >
                Your browser does NOT have AudioContext🎵 support❗❗
            </p>
            <p className="fs-text-l text-center" >
                and because of that, we CAN NOT run the app 😭
            </p>
    
            </div>
            <p className="fs-text-l text-center py-20">
            Please, use any other actualized browser.
            </p>
        </div>
    );
}

export default HasNotAudioContext;