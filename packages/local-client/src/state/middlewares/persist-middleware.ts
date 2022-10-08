import { Dispatch } from "redux";
import { saveCells } from "../actionCreators";
import { Action } from "../actions";
import { ActionType } from "../actionTypes";

//pass along evry action that we will recive, we only want to dispatch one additional action
export const persistMiddleware = ({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
}) => {
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      //no matter what we allways want to dispatch evry single action
      next(action);
    };
  };
};
