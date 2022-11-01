import { createContext } from "react";

const UserContext = createContext({
  user: { email: "", password: "" },
  login: () => {},
  logout: () => {},
});

export default UserContext;
