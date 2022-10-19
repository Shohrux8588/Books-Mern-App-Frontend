import React, { useDispatch } from "react";

import UserContext from "./UserContext.jsx";
import {
  LOGIN_USER,
  LOGOUT_USER,
  TOGGLE_THEME,
  CHANGE_LANGUAGE,
} from "./UserActionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    case TOGGLE_THEME:
      return { ...state, theme: !state.theme };
    case CHANGE_LANGUAGE:
      return { ...state, lng: action.payload };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useDispatch(userReducer, {
    user: null,
    theme: "light",
    lng: "en",
  });

  const loginUser = (user) => dispatch({ type: LOGIN_USER, payload: user });
  const logoutUser = () => dispatch({ type: LOGOUT_USER });
  const toggleTheme = () => dispatch({ type: TOGGLE_THEME });
  const changeLanguage = (lng) =>
    dispatch({ type: CHANGE_LANGUAGE, payload: lng });

  return (
    <UserContext.Provider
      value={{ state, loginUser, logoutUser, toggleTheme, changeLanguage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
