import { ActionType } from "../actionTypes";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";
import { stat } from "fs/promises";

const randomId = () => Math.random().toString(36).substr(2, 5);

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
//CellsState - to make sure that we dont access property on state that not exist
//and returns object that type is CellsState
const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      //to prevent ts warnings
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const index_insert = state.order.findIndex(
        (id) => id === action.payload.id
      );
      if (index_insert < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index_insert, 0, cell.id);
      }
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    default:
      return state;
  }
}, initialState);

export default reducer;
