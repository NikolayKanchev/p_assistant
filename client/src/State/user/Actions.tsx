import { User, Login, Logout, LOGIN, LOGOUT } from "./UserTypes";
  
  export function login(user: User): Login {
    return { type: LOGIN, payload: user };
  }
  
  export function logout(): Logout {
    return { type: LOGOUT, payload: undefined };
  }