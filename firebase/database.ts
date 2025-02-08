import { database } from "@/firebase/config";
import { ref, onValue, set, remove, update } from "firebase/database";
//Type
import { FirebaseRTDBType } from "@/types/FirebaseData";

// ! Read Data From Firebase RTDB
export function getAllData(callback: (data: FirebaseRTDBType) => void) {
  const dataRef = ref(database, "/");
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

// ! Write Data From Firebase RTDB
export function writeData(path: string, data: any) {
  const dataRef = ref(database, path);
  set(dataRef, data);
}

// export function getBeehive2(callback) {
//   const beehiveRef = ref(database, "/beehive-2");
//   onValue(beehiveRef, (snapshot) => {
//     const data = snapshot.val();
//     callback(data);
//   });
// }

// export function getBeehiveData(callback) {
//   const beehiveRef = ref(database, "/Beehives");
//   onValue(beehiveRef, (snapshot) => {
//     const data = snapshot.val();
//     callback(data);
//   });
// }

// export function addBeehive(beehive) {
//   const beehiveRef = ref(database, `/Beehives/${beehive}`);
//   const timestamp = String(Math.floor(Date.now() / 1000));
//   const initialBeeData = {
//     Beehive_Logs: {
//       [timestamp]: {
//         condition: "",
//         temperature: "",
//         humidity: "",
//         timestamp: timestamp,
//       },
//     },
//     "DHT-11": {
//       Humidity: 0,
//       Temperature: 0,
//     },
//   };

//   set(beehiveRef, initialBeeData);
// }

// export function deleteBeehive(beehive) {
//   const beehiveRef = ref(database, `/Beehives/${beehive}`);
//   remove(beehiveRef);
// }

// export function deleteBeehiveLogs(beehive) {
//   const beehiveRef = ref(database, `/Beehives/${beehive}/Beehive_Logs`);
//   remove(beehiveRef);
// }

// // ! Write Data From Firebase RTDB

// // function writeRTDB(ref, data) {
// //   set(ref, data);
// // }

// // export function writePIRState(data) {
// //   writeRTDB(pirStateRef, data);
// // }

// // export function writeMotorState(data) {
// //   writeRTDB(motorStateRef, data);
// // }

// export function writeFanState(beeSource, data) {
//   const fanStateRef = ref(database, `Beehives/${beeSource}/Fan/fanState`);
//   set(fanStateRef, data);
// }

// export function writeLightState(beeSource, data) {
//   const lightStateRef = ref(database, `Beehives/${beeSource}/Light/lightState`);
//   set(lightStateRef, data);
// }

// export function writeMobileNumber(uid, data) {
//   const mobilNumbersRef = ref(database, `/mobileNumbers/${uid}`);
//   set(mobilNumbersRef, data);
// }

// export function removeMobileNumber(uid) {
//   const mobilNumbersRef = ref(database, `/mobileNumbers/${uid}`);
//   remove(mobilNumbersRef);
// }

// export function writeServiceProvider(beeSource, data) {
//   const serviceProviderRef = ref(
//     database,
//     `Beehives/${beeSource}/GSM/serviceProvider`,
//   );
//   set(serviceProviderRef, data);
// }

// export function writeGSMMobileNumber(beeSource, data) {
//   const gsmMobileNumberRef = ref(
//     database,
//     `Beehives/${beeSource}/GSM/mobileNumber`,
//   );
//   set(gsmMobileNumberRef, data);
// }

// export function updateDownloadedBy(beeSource, data) {
//   const downloadedByRef = ref(database, `Beehives/${beeSource}`);
//   update(downloadedByRef, { downloadedBy: data });
// }
