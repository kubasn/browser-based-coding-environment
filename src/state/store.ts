import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { combineReducers } from "redux";
import cellsReducer from "./reducers/cellsReducer";
import { ActionType } from "./actionTypes";

const reducer = combineReducers({
  cells: cellsReducer,
});

export const store = configureStore({
  reducer,
});

//test
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});

console.log(store.getState());
