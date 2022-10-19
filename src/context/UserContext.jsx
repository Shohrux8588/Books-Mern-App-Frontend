import React, { createContext } from "react";

const UserContext = createContext({
  state: { user: null, lng: "en", theme: "light" },
  login: () => {},
  logout: () => {},
  toggleTheme: () => {},
  changeLanguage: () => {},
});

export default UserContext;
