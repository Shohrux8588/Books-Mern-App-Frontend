import { useContext } from "react";
import UserContext from "./../context/UserContext";

const useUserContext = () => {
    const userContext = useContext(UserContext);
  
    if (!userContext) {
      throw Error("use UserContext inside UserContextProvider.");
    }
    return userContext;
  };
  
  export default useUserContext;