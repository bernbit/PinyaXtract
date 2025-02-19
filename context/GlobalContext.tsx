import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllData, writeData } from "@/firebase/database";

// Types
import { GlobalContextType, GlobalProviderProps } from "@/types/GlobalContext";
import { FirebaseRTDBType } from "@/types/FirebaseData";

const Path = {
  Machine: "/Machine",
  Fan: "/Fan",
  Heater: "/Heater",
  HeaterManual: "/HeaterManual",
  Timestamp: "/Timestamp",
};

//* Create a Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

//* Configure GlobalContext
export function GlobalProvider({ children }: GlobalProviderProps) {
  //! useStates
  // Machine States
  const [machineState, setMachineState] = useState<boolean>(false);
  // Heater States
  const [heaterState, setHeaterState] = useState<string>("off");
  const [heaterManual, setHeaterManual] = useState<boolean>(false);
  const [heaterClickCount, setHeaterClickCount] = useState<number>(0);
  // Fan States
  const [fanState, setFanState] = useState<boolean>(false);
  // Extraction Level
  const [extractionLevel, setExtractionLevel] = useState<number>(1);
  // Roller Speed State
  const [rollerSpeed, setRollerSpeed] = useState<number>(1);
  // Temperature State
  const [tempValue, setTempValue] = useState<number>(0);
  // Weight State
  const [weightValue, setWeightValue] = useState<number>(0);
  const [weightRotation, setWeightRotation] = useState<number>(-74);
  //Timestamp
  const [timestamps, setTimestamps] = useState<Record<string, any>>({});

  //! Functions
  // Machine Function
  const toggleMachineState = () =>
    setMachineState((prevState) => {
      writeData(Path.Machine, !prevState);
      return !prevState;
    });
  //Heater Functions
  const toggleHeaterState_Switch = (value: string) => {
    const valParse = value.toLowerCase();
    writeData(Path.Heater, valParse);
    setHeaterState(valParse);
  };
  const toggleHeaterState_SVG = () => {
    setHeaterState((prevState) => {
      if (prevState === "off") {
        return "low";
      }
      const newValue = prevState === "low" ? "high" : "low";
      writeData(Path.Heater, newValue);
      return newValue;
    });
  };
  const toggleHeaterManual = () =>
    setHeaterManual((prevState) => {
      writeData(Path.HeaterManual, !prevState);
      return !prevState;
    });
  // Fan Function
  const toggleFanState = () =>
    setFanState((prevState) => {
      writeData(Path.Fan, !prevState);
      return !prevState;
    });

  //! useEffects
  useEffect(() => {
    const fetchData = () => {
      getAllData((data: FirebaseRTDBType) => {
        setMachineState(data.Machine);

        setTempValue(data.Temperature);
        setWeightValue(data.Weight);

        setRollerSpeed(data.RollerSpeed);
        setExtractionLevel(data.ExtractionLevel);
        setFanState(data.Fan);
        setHeaterState(data.Heater);
        setHeaterManual(data.HeaterManual);
        setTimestamps(data.Timestamp);
      });
    };
    fetchData();

    return () => {};
  }, []);

  const value = {
    machineState,
    setMachineState,
    toggleMachineState,

    heaterState,
    setHeaterState,
    toggleHeaterState_Switch,
    toggleHeaterState_SVG,
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

    tempValue,
    setTempValue,
    weightValue,
    setWeightValue,
    weightRotation,
    setWeightRotation,

    timestamps,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

//* Create Custom Hook- useGlobal
export default function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
