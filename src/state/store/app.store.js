import { createStore } from "redux";
import game from "../reducers/game.reducer";

export const store = createStore(
    game,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  