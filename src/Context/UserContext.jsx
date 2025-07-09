import { createContext, useActionState, useEffect, useState } from "react";
import axios from "axios";

export let UserContext = createContext(0);

export default function UserContextProvider(props) {
  let [userLogin, setuserLogin] = useState(null);

  // handle reload
  useEffect(() => {
    if (localStorage.getItem("usertoken") !== null) {
      setuserLogin(localStorage.getItem("usertoken"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
