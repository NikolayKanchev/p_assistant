import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { AppActions, initialState, AppState } from "./MainReducer";

export const StateContext = createContext<[AppState, Dispatch<AppActions>]>([
  initialState,
  (action: AppActions) => {}
]);

type Props = {
  reducer: (state: AppState, action: AppActions) => AppState;
  initialState: AppState;
};

export const StateProvider: React.FC<Props> = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = (): [AppState, Dispatch<AppActions>] =>
  useContext(StateContext);