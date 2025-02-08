export interface FirebaseRTDBType {
  AutomaticHeater: boolean;
  ExtractionLevel: number;
  Fan: boolean;
  Heater: string;
  HeaterManual: boolean;
  Machine: boolean;
  RollerSpeed: number;
  Temperature: number;
  Timestamp: Record<string, number>;
  Weight: number;
  rollerSpeed: number;
}

interface FirestoreUserDataType {
  uid?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  mobileNum?: string;
  role?: string;
  profile?: string;
}
