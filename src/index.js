import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css';

import { GlobalProvider } from "./core/Globals.js" 
import InitScreen from './InitScreen.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <InitScreen />
    </GlobalProvider>
  </React.StrictMode>
);