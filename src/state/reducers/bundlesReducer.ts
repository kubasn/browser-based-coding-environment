import produce from "immer";
import { ActionType } from "../actionTypes";
import { Action } from "../actions";

interface BundlesState {
  [key: string]: {
    loading: boolean;
    err: string;
    code: string;
  };
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        return state;
      case ActionType.BUNDLE_COMPLATE:
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
