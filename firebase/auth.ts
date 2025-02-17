import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from "firebase/auth";

import { authErrors } from "./errorList";

//* Firebase Signup
export async function signup(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("Signed up succesfully");
    return userCredential;
  } catch (error: any) {
    const errMessage = authErrors[error.code];
    console.error("Signed up failed", errMessage);
    throw errMessage;
  }
}

//*Firebase Login
export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("Login successfully");
    return userCredential;
  } catch (error: any) {
    const errMessage = authErrors[error.code];
    console.error("Login Failed", errMessage);
    throw errMessage;
  }
}

//* Firebase Logout
export async function logout() {
  try {
    await signOut(auth);
    console.log("Logout successfully");
  } catch (error: any) {
    const errMessage = authErrors[error.code];
    console.error("Logout failed", errMessage);
    throw errMessage;
  }
}

//* Firebase Reset Password
export async function resetPassword(email: string) {
  try {
    const resetPass = await sendPasswordResetEmail(auth, email);
    console.log("Sending password reset successful");
    return resetPass;
  } catch (error: any) {
    const errMessage = authErrors[error.code];
    console.error("Sending password reset failed", errMessage);
    throw errMessage;
  }
}

//*Firebase Update Password
export async function changePassword(user: User, newPassword: string) {
  try {
    await updatePassword(user, newPassword);
    console.log("Password changed successfully");
  } catch (error: any) {
    const errMessage = authErrors[error.code];
    console.error("Password change failed:", errMessage);
    throw errMessage;
  }
}

//*Firebase Update Password
export async function changeEmail(user: User, newEmail: string) {
  try {
    await updateEmail(user, newEmail);
    console.log("Email changed successfully");
  } catch (error: any) {
    const errMessage = authErrors[error.code];
    console.error("Email change failed:", errMessage);
    throw errMessage;
  }
}

//* Firebase getAuthState
export function getAuthState(callback: (user: User | null) => void) {
  const getStatus = onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(`Successfully got user id: ${uid}`);
      callback(user);
    } else {
      console.log("Unable to get user status");
      callback(null); // or whatever you want to do when no user is signed in
    }
    return getStatus;
  });
}

//* Firebase Send Email Verification
export function sendVerification(user: User) {
  if (!auth.currentUser) {
    console.log("No authenticated user found");
    return;
  }

  try {
    const sendVerification = sendEmailVerification(user);
    console.log("Successfully email verification");
    return sendVerification;
  } catch (err) {
    console.log("Error sending email verfication", err);
  }
}
//* Firebase Account Deletion
export async function deleteAccount(user: User) {
  try {
    await deleteUser(user);
    console.log("Account deletion succesfull");
  } catch (error: any) {
    const errMessage = authErrors[error.code];
    console.error("Account deletion failed", errMessage);
    throw errMessage;
  }
}
