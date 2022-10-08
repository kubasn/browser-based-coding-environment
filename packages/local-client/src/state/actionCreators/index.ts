import { ActionType } from "../actionTypes";
import axios from "axios";
import { Dispatch } from "redux";
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  Direction,
  BundleStart,
  BundleComplete,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import bundle from "../../bundler";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return { type: ActionType.DELETE_CELL, payload: { id } };
};
export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (id: string, inputCode: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      //we have to provide what cell we will bundle
      payload: {
        id,
      },
    });
    const result = await bundle(inputCode);
    dispatch({
      type: ActionType.BUNDLE_COMPLATE,
      payload: {
        id,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const fetchCells = () => {
  //we can only call dispatch with a propely typed Action object
  return async (dispatch: Dispatch<Action>) => {
    //flip loading flag over to true
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      //request to api
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({ type: ActionType.FETCH_CELLS_COMPLATE, payload: data });
    } catch (err) {
      if (err instanceof Error)
        dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();
    //get data in propely order
    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: err.message });
      }
    }
  };
};
