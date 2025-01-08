import React, { createContext, useContext, useEffect, useState } from "react";

//* Create a Context
const GlobalContext = createContext();

//* Configure GlobalContext
export function GlobalProvider({ children }) {
  const [machineState, setMachineState] = useState(false);
  const [heaterState, setHeaterState] = useState("off");
  const [fanState, setFanState] = useState(false);

  const [extractionLevel, setExtractionLevel] = useState(1);

  const toggleMachineState = () => setMachineState(!machineState);
  const toggleHeaterState = () => {
    setHeaterState((prevMode) => {
      switch (prevMode) {
        case "off":
          return "low";
        case "low":
          return "high";
        case "high":
          return "off";
        default:
          return "off";
      }
    });
  };
  const toggleFanState = () => setFanState(!fanState);

  const handleExtractionLevel = (value, type) => {
    setExtractionLevel((prevLevel) => {
      let newLevel;

      if (type === "add") {
        newLevel = Math.min(prevLevel + value, 100);
      } else if (type === "subtract") {
        newLevel = Math.max(prevLevel - value, 1);
      } else if (type === "manual") {
        const parsedValue = value === "" ? "" : Math.min(value, 100);
        newLevel = parsedValue;
      }
      return newLevel;
    });
  };

  const value = {
    machineState,
    setMachineState,
    toggleMachineState,

    heaterState,
    setHeaterState,
    toggleHeaterState,

    fanState,
    setFanState,
    toggleFanState,

    extractionLevel,
    setExtractionLevel,
    handleExtractionLevel,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

//* Create Custom Hook- useGlobal
export default function useGlobal() {
  return useContext(GlobalContext);
}
