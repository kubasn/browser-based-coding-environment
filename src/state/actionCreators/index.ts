import { ActionType } from "../actionTypes";
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
import { CellTypes } from "../cell";
import bundle from "../../bundler";

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
