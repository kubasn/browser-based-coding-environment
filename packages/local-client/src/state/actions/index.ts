import { ActionType } from "../actionTypes";
import { Cell, CellTypes } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStart {
  type: ActionType.BUNDLE_START;
  payload: {
    id: string; //cell ID
  };
}

export interface BundleComplete {
  type: ActionType.BUNDLE_COMPLATE;
  payload: {
    id: string; //cell ID
    bundle: {
      //bundled code
      code: string;
      err: string;
    };
  };
}

export interface fetchCellsAction {
  type: ActionType.FETCH_CELLS;
}

export interface fetchCellsActionErrorComplate {
  type: ActionType.FETCH_CELLS_COMPLATE;
  payload: Cell[];
}

export interface fetchCellsErrorAction {
  type: ActionType.FETCH_CELLS_ERROR;
  payload: string;
}

//union
export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStart
  | BundleComplete;
