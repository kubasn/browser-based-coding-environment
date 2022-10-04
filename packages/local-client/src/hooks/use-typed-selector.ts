import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

//to help react-redux understend what type we are using

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
