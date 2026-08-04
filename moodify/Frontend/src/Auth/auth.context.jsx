import { useState } from "react";
import { createContext } from "react";
export const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);



  return(
    <Authcontext.Provider value={{user, setuser, loading, setloading}}>
      {children}
    </Authcontext.Provider>
  )
};
