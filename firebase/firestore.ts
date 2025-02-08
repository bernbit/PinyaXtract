import { firestore } from "./config";
// import { writeMobileNumber, removeMobileNumber } from "./database";

import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  addDoc,
  arrayUnion,
} from "firebase/firestore";

import { signup } from "./auth";

// * Store Device Token in Firestore
// export async function storeDeviceToken(deviceToken) {
//   const tokenRef = doc(firestore, "tokens", deviceToken); // Using deviceToken as document ID

//   try {
//     // * Check if the document already exists
//     const tokenDoc = await getDoc(tokenRef);
//     if (tokenDoc.exists()) {
//       console.log("Device Token already exists in Firestore");
//       return; // Exit function if document already exists
//     }

//     // * Document doesn't exist, so store it
//     await setDoc(tokenRef, { id: deviceToken });
//     console.log("Device Token stored in Firestore");
//   } catch (error) {
//     console.error("Error storing Device Token in Firestore: ", error);
//   }
// }

export async function getUserData(uid: string) {
  if (!uid) {
    console.error("No UID stored in Firestore");
    return null;
  }

  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No such user data!");
      return null; // Explicitly return null to avoid "undefined" issues
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function getAllUserData(setUserData) {
  try {
    const usersCollection = collection(firestore, "users");

    // Initial data fetch
    const usersSnapshot = await getDocs(usersCollection);
    const initialUserData = [];
    usersSnapshot.forEach((doc) => {
      initialUserData.push({ id: doc.id, ...doc.data() });
    });
    setUserData(initialUserData); // Set initial data

    // Real-time listener for updates
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const updatedUserData = [];
      snapshot.forEach((doc) => {
        updatedUserData.push({ id: doc.id, ...doc.data() });
      });
      setUserData(updatedUserData); // Update data on change
    });

    // Return the unsubscribe function to clean up the listener when necessary
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching all user data from Firestore:", error);
    throw error;
  }
}

export async function addUserData(newData) {
  try {
    // Create User Account to have UID
    const userCredential = await signup(newData.email, newData.password);
    const userUid = userCredential.user.uid;
    console.log("New User Successful Signup");

    const dateCreated = Date.now();
    const dateSignIn = "";

    // Store User Data in Firestore
    const userRef = doc(firestore, "users", userUid);
    const userData = {
      ...newData,
      uid: userUid,
      created: dateCreated,
      lastSignIn: dateSignIn,
    };
    await setDoc(userRef, userData);
    // writeMobileNumber(userUid, userData.mobileNum);
    console.log("User data added to Firestore");
  } catch (error) {
    console.error("Error adding user data to Firestore:", error);
    throw error;
  }
}

export async function updateUserData(uid: string, data) {
  const userRef = doc(firestore, "users", uid);
  const { mobileNum } = data;

  try {
    await updateDoc(userRef, data);
    // writeMobileNumber(uid, mobileNum);
    console.log("User Data updated successfully!");
  } catch (error) {
    console.error("Error updating user data", error);
  }
}

export async function deleteUserData(uid: string) {
  const userRef = doc(firestore, "users", uid);

  try {
    await deleteDoc(userRef);
    // removeMobileNumber(uid);
    console.log("User Data deleted successfully!");
  } catch (error) {
    console.error("Error deleting user data", error);
  }
}

export async function updateLastSignIn(uid, data) {
  const userRef = doc(firestore, "users", uid);

  const signInData = { lastSignIn: data };

  try {
    await updateDoc(userRef, signInData);
    console.log("User Last Sign in updated successfully!");
  } catch (error) {
    console.error("Error updating User Last Sign in", error);
  }
}

export async function storeDeviceToken(uid, uniqueToken) {
  const userRef = doc(firestore, "users", uid);
  const token = {
    deviceToken: arrayUnion(uniqueToken),
  };

  try {
    await updateDoc(userRef, token);
  } catch (error) {
    console.error("Error storing Device Token in Firestore: ", error);
  }
}

// export async function storeDeviceToken(uid, token) {
//   const userRef = doc(firestore, "users", uid);
//   const tokensCollectionRef = collection(userRef, "deviceTokens");

//   try {
//     // Query to check if the token already exists
//     const tokenQuery = query(tokensCollectionRef, where("token", "==", token));
//     const querySnapshot = await getDocs(tokenQuery);

//     if (querySnapshot.empty) {
//       // Token doesn't exist, add it
//       await addDoc(tokensCollectionRef, {
//         token: token,
//         createdAt: serverTimestamp(),
//       });
//       console.log("Token successfully stored!");
//     } else {
//       console.log("Token already exists, not adding it.");
//     }

//     // Ensure only one instance of the token exists
//     const allTokensSnapshot = await getDocs(tokensCollectionRef);
//     let found = false;
//     const batch = firestore.batch();

//     allTokensSnapshot.forEach((doc) => {
//       if (doc.data().token === token) {
//         if (found) {
//           // If a duplicate is found, mark it for deletion
//           batch.delete(doc.ref);
//         } else {
//           found = true; // Mark the first occurrence
//         }
//       }
//     });

//     // Commit the batch delete if there are duplicates
//     if (found) {
//       await batch.commit();
//       console.log("Duplicate tokens removed.");
//     }
//   } catch (error) {
//     console.error("Error handling token: ", error);
//   }
// }
