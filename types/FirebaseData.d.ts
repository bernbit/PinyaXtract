export interface FirebaseRTDBType {
  AutomaticHeater: boolean;
  ExtractionLevel: number;
  Fan: boolean;
  Heater: string;
  // HeaterManual: boolean;
  Machine: boolean;
  RollerSpeed: number;
  Temperature: number;
  Timestamp: Record<string, number>;
  Weight: number;
  rollerSpeed: number;
}

interface FirestoreUserDataType {
  uid?: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  profile?: string | null;
  isAdmin?: boolean | null;
}
