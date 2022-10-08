import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middleware";

// const reducer = combineReducers({
//   cells: cellsReducer,
// });

export const store = configureStore(
  {
    reducer,
  },
  {},
  applyMiddleware(thunk)
);

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
