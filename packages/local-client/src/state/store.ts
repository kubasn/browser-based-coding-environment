import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middleware";
import thunk from "redux-thunk";

// const reducer = combineReducers({
//   cells: cellsReducer,
// });

const preloadedState = {};
const middleware = [persistMiddleware, thunk];

export const store = configureStore({
  reducer,
  preloadedState, //middleware(persistMiddleware),
  middleware,
});

// //test
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//   },
// });

console.log(store.getState());
