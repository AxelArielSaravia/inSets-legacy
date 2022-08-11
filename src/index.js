import React from 'react';
import ReactDOM from 'react-dom/client';

import { GlobalProvider } from "./context/Global/index.js" 
import InitScreen from './features/InitScreen.js';

import handleInitState from './services/localStorage/index.js';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <GlobalProvider state={handleInitState()}>
            <InitScreen />
        </GlobalProvider>
    </React.StrictMode>
);