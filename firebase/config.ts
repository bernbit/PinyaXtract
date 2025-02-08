import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvgmzFBU4F3t-ytAEP9Pn8j3Z_YvLiiAw",
  authDomain: "pinyaxtract.firebaseapp.com",
  databaseURL:
    "https://pinyaxtract-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pinyaxtract",
  storageBucket: "pinyaxtract.firebasestorage.app",
  messagingSenderId: "598516128079",
  appId: "1:598516128079:web:8fb01254f47aa06c804d3a",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
// export const messaging = getMessaging(app);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const auth = getAuth();

export const storage = getStorage(app);
