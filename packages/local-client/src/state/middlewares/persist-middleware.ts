import { Dispatch } from "redux";
import { saveCells } from "../actionCreators";
import { Action } from "../actions";
import { ActionType } from "../actionTypes";
import { RootState } from "../reducers";

//pass along evry action that we will recive, we only want to dispatch one additional action
export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      //no matter what we allways want to dispatch evry single action
      next(action);

      //if action is of type we want
      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
