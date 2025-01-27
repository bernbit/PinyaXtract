import React, { createContext, useContext, useState, useMemo } from "react";

//* Create a Context
const GlobalContext = createContext();

//* Configure GlobalContext
export function GlobalProvider({ children }) {
  const [activeTab, setActiveTab] = useState("control");

  const [machineState, setMachineState] = useState(false);
  const [heaterState, setHeaterState] = useState("off");
  const [heaterManual, setHeaterManual] = useState(false);
  const [heaterClickCount, setHeaterClickCount] = useState(0);
  const [fanState, setFanState] = useState(false);
  const [extractionLevel, setExtractionLevel] = useState(1);
  const [rollerSpeed, setRollerSpeed] = useState(50);
  const [operationStatus, setOperationStatus] = useState(false);
  const [machineCondition, setMachineCondition] = useState("");
  const [tempValue, setTempValue] = useState(34);
  const [weightValue, setWeightValue] = useState(1.9);

  const toggleMachineState = () => setMachineState(!machineState);
  const toggleHeaterState = () => {
    const newClickCount = heaterClickCount + 1;
    setHeaterClickCount(newClickCount);

    switch (newClickCount) {
      case 1:
        setHeaterState("low");
        break;
      case 2:
        setHeaterState("off");
        break;
      case 3:
        setHeaterState("high");
        break;
      default:
        setHeaterState("off");
        setHeaterClickCount(0);
    }
  };
  const toggleHeaterManual = () => setHeaterManual(!heaterManual);
  const toggleFanState = () => setFanState(!fanState);

  const value = useMemo(
    () => ({
      machineState,
      setMachineState,
      toggleMachineState,

      heaterState,
      setHeaterState,
      toggleHeaterState,
      heaterManual,
      setHeaterManual,
      toggleHeaterManual,

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

      machineCondition,
      setMachineCondition,

      tempValue,
      setTempValue,
      weightValue,
      setWeightValue,

      activeTab,
      setActiveTab,
    }),
    [
      machineState,
      heaterState,
      heaterManual,
      heaterClickCount,
      fanState,
      extractionLevel,
      rollerSpeed,
      operationStatus,
      machineCondition,
      tempValue,
      weightValue,
      activeTab,
      setActiveTab,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

//* Create Custom Hook- useGlobal
export default function useGlobal() {
  return useContext(GlobalContext);
}
