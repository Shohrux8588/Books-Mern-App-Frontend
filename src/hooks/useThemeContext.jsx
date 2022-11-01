import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContextProvider.jsx";

const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw Error("use ThemeContext inside ThemeContextProvider.");
  }
  return themeContext;
};

export default useThemeContext;
