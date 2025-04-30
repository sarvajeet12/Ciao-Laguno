import { createContext, useEffect, useState } from "react";
import { auth } from "../service/apis";
import { apiConnector } from "../service/api-connector";

// 1. create
export const AppContext = createContext();

// 2. Provider
const ContextProvider = (props) => {

  // -------------------------------------- State -----------------------------------------------------
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("tokenCiao"));
  const [isLoading, setIsLoading] = useState(true);
  const [codeEmail, setCodeEmail] = useState([]);


  // --------------------------- definition of storeTokenInLS -----------------------------------------
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("tokenCiao", serverToken);
  };


  // ------------------------------------- get user data ---------------------------------------------
  const authorizationToken = `Bearer ${token}`;

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector("GET", auth.USER_DETAILS_API, "", headers);

      const userData = response.data.response;

      if (!response.data.success) {
        setUser(null);
        setIsLoading(false);
      } else {
        setUser(userData);
        setIsLoading(false);
        console.log("user details", userData);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("getting user details: ", error.response.data.message);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);


  // getting value email and code 
  const gettingValueCodeAndEmail = (code, email) => {
    setCodeEmail({
      code: code,
      email: email
    })
  }



  // bundle
  const contextValue = {
    user,
    token,
    codeEmail,
    isLoading,
    setUser,
    setToken,
    storeTokenInLS,
    gettingValueCodeAndEmail,
  
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
