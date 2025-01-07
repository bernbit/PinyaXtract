import React, { createContext, useContext, useEffect, useState } from "react";

//* Create a Context
const GlobalContext = createContext();

//* Configure GlobalContext
export function GlobalProvider({ children }) {
  const [machineState, setMachineState] = useState(false);

  const [extractionLevel, setExtractionLevel] = useState(1);

  const value = {
    extractionLevel,
    setExtractionLevel,
    machineState,
    setMachineState,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

//* Create Custom Hook- useGlobal
export default function useGlobal() {
  return useContext(GlobalContext);
}
