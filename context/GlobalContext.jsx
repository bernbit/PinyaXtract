import React, { createContext, useContext, useEffect, useState } from "react";

//* Create a Context
const GlobalContext = createContext();

//* Configure GlobalContext
export function GlobalProvider({ children }) {
  const [machineState, setMachineState] = useState(false);
  const [heaterState, setHeaterState] = useState("off");
  const [heaterClickCount, setHeaterClickCount] = useState(0);
  const [fanState, setFanState] = useState(false);

  const [extractionLevel, setExtractionLevel] = useState(1);
  const [rollerSpeed, setRollerSpeed] = useState(50);

  const [operationStatus, setOperationStatus] = useState(false);

  const toggleMachineState = () => setMachineState(!machineState);
  const toggleHeaterState = () => {
    const newClickCount = heaterClickCount + 1;
    setHeaterClickCount(newClickCount);

    if (newClickCount === 1) {
      setHeaterState("low");
    } else if (newClickCount === 2) {
      setHeaterState("off");
    } else if (newClickCount === 3) {
      setHeaterState("high");
    } else if (newClickCount === 4) {
      setHeaterState("off");
      setHeaterClickCount(0);
    }
  };
  const toggleFanState = () => setFanState(!fanState);

  const value = {
    machineState,
    setMachineState,
    toggleMachineState,

    heaterState,
    setHeaterState,
    toggleHeaterState,

    heaterClickCount,
    setHeaterClickCount,

    fanState,
    setFanState,
    toggleFanState,

    extractionLevel,
    setExtractionLevel,

    rollerSpeed,
    setRollerSpeed,

    operationStatus,
    setOperationStatus,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

//* Create Custom Hook- useGlobal
export default function useGlobal() {
  return useContext(GlobalContext);
}
