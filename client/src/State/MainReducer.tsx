import { userReducer } from "./user/Reducer";
import { UserState, UserActions } from "./user/UserTypes";

export type AppState = {
  state: UserState;
};

export type AppActions = UserActions;

export const initialState: AppState = {
  state: {
    user: undefined
  }
};

export const mainReducer = ({ state }: AppState, action: AppActions): AppState => ({
  state: userReducer(state, action)
});