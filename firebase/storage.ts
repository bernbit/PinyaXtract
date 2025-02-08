import { storage } from "./config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Function to upload profile image
export const uploadProfile = async (dataUrl: string) => {
  try {
    const blob = await fetchBlobFromDataUrl(dataUrl);
    const fileName = generateFileName();

    const storageRef = ref(storage, `profileImg/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, {
      contentType: "image/jpg",
    });

    // Log upload progress and state
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    });

    const downloadURL = await getDownloadUrl(uploadTask);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

// Function to fetch blob data from data URL
const fetchBlobFromDataUrl = async (dataUrl: string) => {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    throw new Error("Error fetching blob from data URL");
  }
};

// Function to generate a unique file name
const generateFileName = () => {
  const timestamp = Date.now();
  return `${timestamp}.jpg`;
};

// Function to get the download URL after upload completion
const getDownloadUrl = async (uploadTask) => {
  try {
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        },
      );
    });
  } catch (error) {
    throw new Error("Error getting download URL after upload completion");
  }
};
