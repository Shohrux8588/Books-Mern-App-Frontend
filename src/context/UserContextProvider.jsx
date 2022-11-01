import React, { useReducer, useEffect } from "react";

import UserContext from "./UserContext.jsx";
import { LOGIN_USER, LOGOUT_USER } from "./UserActionTypes";

const initialState = { email: "", token: "", role: "", _id: "" };

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...action.payload };
    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify({ ...user }));
    dispatch({ type: LOGIN_USER, payload: { ...user } });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      login(JSON.parse(userFromLocalStorage));
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
