import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Ludo } from './containers/Ludo/Container';
import { store } from './state/store';

import './prototypeOverrides';

import * as serviceWorker from './serviceWorker';

import './index.css';

const LudoGame = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Ludo /> {/* This renders the Ludo game component */}
      </React.StrictMode>
    </Provider>
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default LudoGame;
