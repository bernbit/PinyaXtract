import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "./config";

export const uploadProfile = async (dataUri: string, path: string) => {
  if (!dataUri) return;

  // Read the image file as a base64 string
  const base64 = await FileSystem.readAsStringAsync(dataUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Convert base64 to an ArrayBuffer
  const arrayBuffer = decode(base64);

  // Define the file path and name
  const fileName = `${Date.now()}.jpg`;
  const filePath = `${path}/${fileName}`;

  // Upload image to Supabase Storage
  const { data, error } = await supabase.storage
    .from("profileImages")
    .upload(filePath, arrayBuffer, {
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Upload Error:", error);
    return null;
  }

  // Get the public URL of the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from("profileImages")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

export const deleteProfile = async (publicUrl: string) => {
  //Get Image Path from Public URL
  const baseUrl = `https://gseynolxaeekeeawzjtg.supabase.co/storage/v1/object/public/profileImages/`;
  const imagePath = publicUrl.replace(baseUrl, "");

  // console.log("Image Path", imagePath);

  // Actual Deletion
  const { error } = await supabase.storage
    .from("profileImages")
    .remove([imagePath]);

  if (error) {
    console.error("Error deleting profile image:", error.message);
  } else {
    console.log("Profile Image deleted successfully");
  }
};
