export interface User {
    id: string;
    displayName: string;
  }
  export interface UserState {
    user: User | undefined;
  }
  
  export const LOGIN = "login";
  export const LOGOUT = "logout";
  
  export interface Login {
    type: typeof LOGIN;
    payload: User;
  }
  
  export interface Logout {
    type: typeof LOGOUT;
    payload: User | undefined;
  }
  
  export type UserActions = Login | Logout;