import React from 'react';
import ReactDOM from 'react-dom/client';

import { GlobalProvider } from "./context/Global/index.js" 
import InitScreen from './features/InitScreen.js';

import initState from "./state/initState.json"; 

import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function verifyAppVersion() {
  if (localStorage.getItem('version') !== "v0.2.4") {
    localStorage.clear();
    localStorage.setItem("version", "v0.2.4");
  }
}

/**
 * @param {ElementsState} elementsState
 * @returns {ElementsState}
 */
const handleInitState = (elementsState) => {
  verifyAppVersion();
  const keysOfElementsState = Object.keys(elementsState);
  if (localStorage.getItem('version')) {
      keysOfElementsState.forEach(key => {
          const el = elementsState[key];
          if (typeof el === "object" && el !== null) {
              localStorage.setItem(key, JSON.stringify(elementsState[key]));
          } else {
              localStorage.setItem(key, elementsState[key]);
          }
      });
  } 
  
  const  returnObj = {};
  
  keysOfElementsState.forEach(key => {
    returnObj[key] = JSON.parse(localStorage.getItem(key));
  });
  return returnObj;
}

root.render(
  <React.StrictMode>
    <GlobalProvider state={handleInitState(initState)}>
      <InitScreen />
    </GlobalProvider>
  </React.StrictMode>
);