import { memo } from "react";

import { DropFiles } from "./DragAndDrop/index.js";
import Aside from "./Aside/index.js";
import Main from "./Main/index.js";

import './AppContainer.scss';

//COMPONENTS
//App Component
function AppContainer({isDragActive}) {
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
          isDragActive && (
            <DropFiles
              className="dropFile flex-column align-c justify-c"
            />
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