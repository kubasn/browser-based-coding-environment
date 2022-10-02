import cellsReducer from "./cellsReducer";
import { combineReducers } from "redux";
import bundlesReducer from "./bundlesReducer";

const reducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
