import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import cellsReducer from "./reducers/cellsReducer";

const rootReducer = () => {
  cells: cellsReducer;
};

export const store = configureStore({
  reducer: {
    rootReducer,
  },
});
