import { useState } from "react";
import { createContext } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  let [counter, setcounter] = useState(null);
  let [user, setuser] = useState("ali");

  return (
    <CounterContext.Provider value={{ counter, setcounter, user, setuser }}>
      {props.children}
    </CounterContext.Provider>
  );
}
