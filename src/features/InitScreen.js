import { useState, useContext, memo } from "react";

import { GlobalState } from "../state/Global/index.js";
import { GlobalContext } from "../context/Global/index.js"
import { initAudioContext } from "../services/Global/index.js"

import AppContainer from "./AppContainer.js";
import Header from "./Header/index.js";
import { DragFiles } from "./DragAndDrop/index.js";

import './InitScreen.scss';

//COMPONENTS
const hasNotAudioContext = (
  <section className="init-section flex-column align-c justify-c">
    <div className="flex-column align-c justify-c">
      <div style={{padding: "20px 0"}}>
        <p className="fs-text-l text-center">Your browser does NOT have AudioContext🎵❗❗</p>
      </div>
      <div style={{padding: "20px 0"}}>
        <p className="fs-text-l text-center">We CAN NOT run the app 😭</p>
      </div>
      <div style={{padding: "20px 0"}}>
        <p className="fs-text-l text-center">Please, use any other actualized browser.</p>
      </div>
    </div>
  </section>
);

//App Component
const InitScreen = memo(function InitScreen() {
  const [global, globalDipatch] = useContext(GlobalContext);
  const [startApp, setStartApp] = useState(false);

  const handleAcceptOnClick = () => {
    initAudioContext(GlobalState);
    setStartApp(() => true);
    console.log(GlobalState.AUDIO_CONTEXT.listener);
  };

  const handleRadioOnChange = (e) => globalDipatch({type: "ENGINE_TYPE", value: e.target.value});
  const handleRadioOnClick = (val) => globalDipatch({type: "ENGINE_TYPE", value: val});
  
  return (
    <DragFiles
      className="flex-column"
      start={startApp}
      style={{
        width: '100%',
        height: '100%',
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      {isDragActive => (
        <>
          <section className="header-section flex-column align-c justify-c">
            <Header />
          </section>
          { GlobalState.hasAudioContext
            ? (
              <>
              { startApp 
                ? (
                  <AppContainer isDragActive={isDragActive}/>
                )
                : (
                  <section className="init-section flex-column align-c justify-c">
                    <div className="flex-column align-c justify-c">
                      <div className="init-message flex-column align-c justify-c">
                        <h2 className="fs-title text-center">inSets Composition App</h2>
                      </div>
                      <div className="init-message flex-column align-c justify-c">
                        <p className="fs-text text-center">This project was created by</p>
                        <p className="fs-text-l text-center">Axel Ariel Saravia</p>
                      </div>
                      <div className="init-message flex-column justify-c"> 
                        <p className="fs-text-l text-center">Audio Engine:</p>
                        <label className="audioEngine-button">
                          <input 
                            type="radio" 
                            name="audioEngine" 
                            value="audioBuffer" 
                            onChange={handleRadioOnChange} 
                            checked={global.ENGINE_TYPE === "audioBuffer"}
                          />
                          <div className="flex-row align-c ">
                            <button 
                              className="checkmark" 
                              role="switch" 
                              aria-checked={global.ENGINE_TYPE === "audioBuffer"}
                              onClick={() => handleRadioOnClick("audioBuffer")}
                            />
                            <span className="fs-text text-bold">AudioBuffers:</span>
                            <span className="fs-text">(preferred)</span>
                          </div>
                            <p className="fs-text">It uses AudioBuffer to handle audio files. It has better audio quality but needs more computer resources.</p>
                        </label>
                        <label className="audioEngine-button">
                          <input 
                            type="radio"
                            name="audioEngine"
                            value="audioNode"
                            onChange={handleRadioOnChange} 
                            checked={global.ENGINE_TYPE === "audioNode"}
                          />
                          <div className="flex-row align-c ">
                            <button
                              className="checkmark" 
                              role="switch" 
                              aria-checked={global.ENGINE_TYPE === "audioNode"} 
                              onClick={() => handleRadioOnClick("audioNode")}
                            />
                            <span className="fs-text text-bold">AudioNodes:</span>
                          </div>
                          <p className="fs-text">It uses HTMLAudioElement to handle audio files. It has optimized computer resources, but less audio quality.</p>
                        </label>
                      </div>
                      <div className="init-message">
                        <button 
                          className="startApp-button fs-text-l" 
                          type="button" 
                          onClick={handleAcceptOnClick}
                        >
                          Start App
                        </button>
                      </div>
                    </div>
                  </section>
                )
              }
              </>
            )
            : (hasNotAudioContext)
          }
        </>
      )}
    </DragFiles>
  );
})

export default InitScreen;