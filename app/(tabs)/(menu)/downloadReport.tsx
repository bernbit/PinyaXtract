//React
import React, { useState, useMemo } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
//Expo
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Notifications from "expo-notifications";
import * as Print from "expo-print";
//External Libraries
import BouncyCheckbox from "react-native-bouncy-checkbox";
import XLSX from "xlsx";
import Modal from "@/components/Modal";
//Constants
import { Colors } from "@/constants/Colors-Constants";
import SVG from "@/constants/SVG-Constants";
//Context
import useGlobal from "@/context/GlobalContext";
//Helper Functions
import { getFilteredTimestamp } from "@/helper/timestampFilter";
import { getGeneratedHTML } from "@/helper/getGeneratedHTML";

//Time Range Option
const timeRange = [
  { key: "lastDay", label: "Last Day" },
  { key: "lastWeek", label: "Last Week" },
  { key: "lastMonth", label: "Last Month" },
  { key: "allTime", label: "All Time" },
];

//Types
interface SaveFileType {
  uri: string;
  filename: string;
  mimetype: string;
}

const downloadReport = () => {
  // useGlobal
  const { timestamps } = useGlobal();
  //useStates
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(
    "null",
  );
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);

  //Functions

  // Filtered Timestamp Data
  const filteredData = Object.values(
    getFilteredTimestamp(timestamps, selectedTimeRange || "allTime"),
  );

  //Filtered Time Range Options
  const filteredTimeRange = useMemo(
    () =>
      timeRange.map((time) => ({
        ...time,
        isEmpty:
          Object.values(getFilteredTimestamp(timestamps, time.key)).length ===
          0,
      })),
    [timestamps],
  );

  const handleTimeRange = (key: string) => {
    setSelectedTimeRange((prev) => (prev === key ? null : key));
  };

  // Helpers Functions
  const sendNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
      },
      trigger: null, // Show immediately
    });
  };

  const saveFile = async ({ uri, filename, mimetype }: SaveFileType) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype,
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });

            // Send notification when the user is back in the app
            await sendNotification(
              "Pinyaxtract Invetory Report Saved",
              "Pinyaxtract inventory report has been saved successfully!",
            );
          })
          .catch((e) => console.log(e));
      } else {
        Sharing.shareAsync(uri);
      }
    } else {
      Sharing.shareAsync(uri);
    }
  };

  const generateFileName = () => {
    const data = Object.values(
      getFilteredTimestamp(timestamps, selectedTimeRange),
    );

    if (data.length === 0) return `Pinyaxtract_Report`; // Fallback filename

    const startDate = data[0]?.date?.replace(/[/\\:*?"<>|]/g, "_") || "Unknown";
    const endDate =
      data[data.length - 1]?.date?.replace(/[/\\:*?"<>|]/g, "_") || "Unknown";

    return `Pinyaxtract_${startDate}_to_${endDate}`;
  };

  const handleDownload = () => {
    if (!selectedTimeRange) {
      setShowErrorModal(true);
    } else {
      setShowDownloadModal(true);
    }
  };

  //* File Download Handlers
  const downloadXLS = async () => {
    // Convert JSON object to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pinyaxtract");

    // Write the workbook to a binary string
    const excelFile = XLSX.write(workbook, {
      type: "base64",
      bookType: "xlsx",
    });

    // File Path
    const fileUri = FileSystem.documentDirectory + `${generateFileName()}.xlsx`;

    await FileSystem.writeAsStringAsync(fileUri, excelFile, {
      encoding: FileSystem.EncodingType.Base64,
    });

    //Saved File Locally
    saveFile({
      uri: fileUri,
      filename: `${generateFileName()}.xlsx`,
      mimetype:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  const downloadPDF = async () => {
    const timestampData = Object.values(
      getFilteredTimestamp(timestamps, selectedTimeRange),
    );
    const dynamicHTML = getGeneratedHTML(timestampData);
    const { uri } = await Print.printToFileAsync({ html: dynamicHTML });
    // console.log("File has been saved to:", uri);
    // await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

    saveFile({
      uri: uri,
      filename: `${generateFileName()}.pdf`,
      mimetype: "application/pdf",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-main dark:bg-dark-main">
      <ScrollView contentContainerClassName="min-h-full">
        <View className="flex flex-1 justify-center px-2.5 py-2.5">
          <View className="flex flex-1 justify-center gap-12 rounded-md bg-background px-4 py-10">
            <View className="flex items-center gap-2">
              <View className="rounded-full bg-background-alt p-4">
                <MaterialIcons
                  name="download"
                  color={Colors.primary}
                  size={40}
                />
              </View>

              <Text className="text-center font-satoshi-bold text-2xl text-light-text">
                Your Inventory Report is Ready!
              </Text>
              <Text className="text-center font-satoshi-bold text-primary">
                Tap below to download it instantly or come back anytime.
              </Text>
            </View>

            <View className="gap-1">
              <Text className="text font-satoshi-regular text-light-text">
                Pick a Date Range
              </Text>

              <View className="gap-2 rounded-md py-2">
                {filteredTimeRange.map((time, index) => (
                  <TouchableOpacity
                    className={`flex flex-row items-center gap-4 rounded-md bg-secondary px-4 py-4 ${time.isEmpty ? "pointer-events-none opacity-60" : ""}`}
                    onPress={() => handleTimeRange(time.key)}
                    key={index}
                  >
                    <BouncyCheckbox
                      size={25}
                      fillColor={Colors.primary}
                      unFillColor={Colors["light-text"]}
                      iconStyle={{ borderColor: "red" }}
                      innerIconStyle={{ borderWidth: 2 }}
                      textStyle={{ fontFamily: "Poppins-Regular" }}
                      disableText={true}
                      isChecked={selectedTimeRange === time.key}
                    />
                    <Text
                      className={`font-satoshi-bold text-xl ${
                        selectedTimeRange === time.key
                          ? "text-primary"
                          : "text-light-text"
                      }`}
                    >
                      {time.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                className="rounded-md bg-primary"
                onPress={handleDownload}
              >
                <Text className="rounded-md p-4 text-center font-satoshi-bold text-lg text-dark-text">
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal showModal={showErrorModal}>
          <View className="">
            <View className="flex items-center gap-2">
              <View className="aspect-square h-[50] w-[50] items-center justify-center rounded-md bg-danger">
                <MaterialIcons
                  name={"error"}
                  size={30}
                  color={Colors["light-text"]}
                />
              </View>
              <Text className="text-center font-cabinetGrotesk-bold text-2xl text-light-text">
                No Time Range Selected!
              </Text>
            </View>

            <Text className="text-center font-satoshi-medium text-lg text-light-text">
              Select a time range to proceed with the download.
            </Text>

            {/* Button */}
            <TouchableOpacity
              className="mt-5 w-full rounded-md bg-danger p-2"
              onPress={() => setShowErrorModal(false)}
            >
              <Text className="text-center font-satoshi-bold text-lg text-light-text">
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal showModal={showDownloadModal}>
          <View className="flex gap-6">
            <Text className="text-center font-cabinetGrotesk-bold text-xl text-light-text">
              Choose a File Type to Download
            </Text>
            <View className="flex flex-row items-center justify-center gap-8">
              <TouchableOpacity onPress={downloadPDF}>
                <SVG.PDFIcon width={80} height={80} />
              </TouchableOpacity>

              <TouchableOpacity onPress={downloadXLS}>
                <SVG.XLSIcon width={80} height={80} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="w-full rounded-md bg-danger p-2"
              onPress={() => setShowDownloadModal(false)}
            >
              <Text className="text-center font-satoshi-bold text-lg text-light-text">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default downloadReport;
