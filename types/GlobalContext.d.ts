import { ReactNode } from "react";

export interface GlobalContextType {
  machineState: boolean;
  setMachineState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMachineState: () => void;

  heaterState: string;
  setHeaterState: React.Dispatch<React.SetStateAction<string>>;
  toggleHeaterState_Switch: (value: string) => void;
  toggleHeaterState_SVG: () => void;

  heaterManual: boolean;
  setHeaterManual: React.Dispatch<React.SetStateAction<boolean>>;
  toggleHeaterManual: () => void;

  heaterClickCount: number;
  setHeaterClickCount: React.Dispatch<React.SetStateAction<number>>;

  fanState: boolean;
  setFanState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFanState: () => void;

  extractionLevel: number;
  setExtractionLevel: React.Dispatch<React.SetStateAction<number>>;

  rollerSpeed: number;
  setRollerSpeed: React.Dispatch<React.SetStateAction<number>>;

  tempValue: number;
  setTempValue: React.Dispatch<React.SetStateAction<number>>;

  weightValue: number;
  setWeightValue: React.Dispatch<React.SetStateAction<number>>;

  weightRotation: number;
  setWeightRotation: React.Dispatch<React.SetStateAction<number>>;
}

interface GlobalProviderProps {
  children: ReactNode;
}
