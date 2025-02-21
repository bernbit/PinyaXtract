import { firestore } from "./config";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

//Types
import { FirestoreUserDataType } from "@/types/FirebaseData";

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
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export function getUserDataRealtime(
  uid: string,
  setUserData: (userData: any) => void,
) {
  if (!uid) {
    console.error("No UID stored in Firestore");
    return;
  }

  const userRef = doc(firestore, "users", uid);

  return onSnapshot(
    userRef,
    (userSnap) => {
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.log("No such user data!");
        setUserData(null);
      }
    },
    (error) => {
      console.error("Error fetching user data:", error);
      setUserData(null);
    },
  );
}

export async function getAllUserData(
  setUserData: (data: FirestoreUserDataType[]) => void,
): Promise<() => void> {
  try {
    const usersCollection = collection(firestore, "users");

    // Fetch Initial User Data List
    const usersSnapshot = await getDocs(usersCollection);
    const initialUserData: FirestoreUserDataType[] = usersSnapshot.docs.map(
      (doc) => ({
        ...doc.data(),
      }),
    );
    //Assign Initial Value to a state
    setUserData(initialUserData);

    // Realtime Listener Change to User Data List
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const updatedUserData: FirestoreUserDataType[] = snapshot.docs.map(
        (doc) => ({ ...doc.data() }),
      );

      //Assign Updated Value to a state
      setUserData(updatedUserData);
    });

    // Return the unsubscribe function to clean up the listener when necessary
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching all user data from Firestore:", error);
    throw error;
  }
}

export async function addUserData(
  newData: FirestoreUserDataType,
  userUid: string,
) {
  try {
    // Store User Data in Firestore
    const userRef = doc(firestore, "users", userUid);

    await setDoc(userRef, newData);
    console.log("User data added to Firestore");
  } catch (error) {
    console.error("Error adding user data to Firestore:", error);
    throw error;
  }
}

export async function updateUserData(
  updateData: Partial<FirestoreUserDataType>,
  uid: string,
) {
  const userRef = doc(firestore, "users", uid);

  try {
    await updateDoc(userRef, updateData);
    console.log("User Data updated successfully!");
  } catch (error) {
    console.error("Error updating user data", error);
  }
}

export async function deleteUserData(uid: string) {
  const userRef = doc(firestore, "users", uid);

  try {
    await deleteDoc(userRef);
    console.log("User Data Deletion successfully!");
  } catch (error) {
    console.error("User Data Deletion fail", error);
  }
}

export async function storeDeviceToken(uid: string, uniqueToken: string) {
  const userRef = doc(firestore, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const existingTokens: string[] = userDoc.data()?.expoPushTokens || [];

    if (!existingTokens.includes(uniqueToken)) {
      // ✅ Only update if the token is not already stored
      try {
        await updateDoc(userRef, {
          expoPushTokens: arrayUnion(uniqueToken),
        });
      } catch (error) {
        console.error("Error storing Device Token in Firestore: ", error);
      }
    }
  } else {
    // If the user document doesn't exist, create it with the new token
    try {
      await setDoc(userRef, {
        expoPushTokens: [uniqueToken],
      });
    } catch (error) {
      console.error("Error creating user document in Firestore: ", error);
    }
  }
}

export async function removeDeviceToken(uid: string, uniqueToken: string) {
  const userRef = doc(firestore, "users", uid);
  const token = {
    expoPushTokens: arrayRemove(uniqueToken),
  };

  try {
    await updateDoc(userRef, token);
  } catch (error) {
    console.error("Error storing Device Token in Firestore: ", error);
  }
}

export function getAllNotification(
  setNotificationList: (notifications: any) => void,
) {
  const notificationRef = collection(firestore, "notifications");

  // Query Firestore to order by timestamp (newest first)
  const q = query(notificationRef, orderBy("timestamp", "desc"));

  return onSnapshot(
    q,
    (notifSnap) => {
      if (!notifSnap.empty) {
        const notifications = notifSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotificationList(notifications);
      } else {
        console.log("No notifications found!");
        setNotificationList([]);
      }
    },
    (error) => {
      console.error("Error fetching notifications:", error);
      setNotificationList([]);
    },
  );
}

export function deleteNotification(docId: string) {
  const notifRef = doc(firestore, "notifications", docId);
  deleteDoc(notifRef);
}

export async function deleteAllNotifications() {
  const notifCollectionRef = collection(firestore, "notifications");
  const querySnapshot = await getDocs(notifCollectionRef);

  const deletePromises = querySnapshot.docs.map((document) =>
    deleteDoc(doc(firestore, "notifications", document.id)),
  );

  await Promise.all(deletePromises);
  console.log("All notifications deleted successfully.");
}
