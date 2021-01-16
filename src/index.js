import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { shuffleCards } from "./state/actions/game.actions";
import { store } from './state/store/app.store';

store.dispatch(shuffleCards());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
