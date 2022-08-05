import { memo } from "react";

import DropFiles from "./DropFiles.js";
import Aside from "./Aside/Aside.js";
import Main from "./Main.js";
import DropArea from "./DropArea.js";

import './AppContainer.scss';

//COMPONENTS
//App Component
function AppContainer(props) {
  return (
    <>
      <div className="audio-app">
        <section className="tool-section">
          <Aside/>
        </section>
        <section className="main-section flex-column align-c justify-c">
          <Main/>
        </section>
        {
          props.isDragActive && (
            <DropFiles
              className="dropFile flex-column align-c justify-c"
            >
              <DropArea />
            </DropFiles>
          )
        }
      </div>
      <section>
        <footer className="fs-text-s text-center p-3">by Axel Ariel Saravia</footer>
      </section>
    </>
  );
}

export default memo(AppContainer);