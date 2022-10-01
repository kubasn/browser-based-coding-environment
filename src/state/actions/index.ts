import { ActionType } from "../actionTypes";
import { CellTypes } from "../cell";

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

export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
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

//union
export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction
  | BundleStart
  | BundleComplete;
