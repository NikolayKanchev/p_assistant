import { UserState, LOGOUT, LOGIN, UserActions } from "./UserTypes";
  
  export const userReducer = (
    state: UserState,
    action: UserActions
  ): UserState => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          user: action.payload
        };
      case LOGOUT:
        return {
          ...state,
          user: action.payload
        };
  
      default:
        return state;
    }
  };