import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  SectionList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import TabHeader from "@/components/TabHeader";
import SVG from "@/constants/SVG-Constants";
import { MaterialIcons } from "@expo/vector-icons";

// Firebase
import {
  getAllNotification,
  deleteNotification,
  deleteAllNotifications,
} from "@/firebase/firestore";
import { Timestamp } from "firebase/firestore";

// Type
interface NotifType {
  id: string;
  body: string;
  title: string;
  type: string;
  timestamp: Timestamp;
}

// Helper function to format time difference
const formatTimeAgo = (timestamp: Timestamp) => {
  const now = Date.now();
  const time = timestamp.toDate().getTime();
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y`;
};

const notification = () => {
  const [sections, setSections] = useState<
    { title: string; data: NotifType[] }[]
  >([]);
  const [isFetching, setIsFetching] = useState(true);
  const [emptyNotif, setEmptyNotif] = useState(false);
  const [timestamps, setTimestamps] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const unsubscribe = getAllNotification((notifList) => {
      setIsFetching(false);

      // Define time threshold (e.g., last 24 hours)
      const now = Date.now();
      const timeThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      // Group notifications
      const newNotifications = notifList.filter(
        (n: any) => now - n.timestamp.toDate().getTime() <= timeThreshold,
      );
      const olderNotifications = notifList.filter(
        (n: any) => now - n.timestamp.toDate().getTime() > timeThreshold,
      );

      // Only include non-empty sections
      const filteredSections = [
        newNotifications.length > 0 && {
          title: "Today",
          data: newNotifications,
        },
        olderNotifications.length > 0 && {
          title: "Older",
          data: olderNotifications,
        },
      ].filter(Boolean) as { title: string; data: NotifType[] }[];

      setSections(filteredSections);

      setEmptyNotif(notifList.length === 0);
    });

    return () => unsubscribe();
  }, []);

  // Real-time timestamp updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamps((prevTimestamps) => {
        const updatedTimestamps: { [key: string]: string } = {};
        sections.forEach((section) => {
          section.data.forEach((notif) => {
            updatedTimestamps[notif.id] = formatTimeAgo(notif.timestamp);
          });
        });
        return updatedTimestamps;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [sections]);

  // Render each notification item
  const renderItem = ({ item }: { item: NotifType }) => (
    <View className="bg-background py-3">
      <View className="flex flex-row items-start justify-center gap-4 p-3 px-2.5">
        <View className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-secondary">
          {item.type === "danger" ? (
            <SVG.Overheat width={40} height={40} />
          ) : (
            <SVG.Stable width={40} height={40} />
          )}
        </View>

        <View className="flex-1">
          <Text
            className={`font-satoshi-bold text-lg ${item.type === "danger" ? "text-danger" : "text-primary"}`}
          >
            {item.title}
          </Text>
          <Text className="text-justify font-satoshi text-light-text">
            {item.body}
          </Text>
          <Text className="flex-1 font-satoshi text-light-text">
            {formatTimeAgo(item.timestamp)}
          </Text>
        </View>

        <TouchableOpacity
          className="justify-center"
          onPress={() => deleteNotification(item.id)}
        >
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  //Loading
  if (isFetching)
    return (
      <View>
        <Text>ssasas</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-main">
      <TabHeader icon="notifications" title="Notifications" />

      <View className={`flex-1 ${emptyNotif ? "hidden" : "flex"}`}>
        <TouchableOpacity onPress={async () => await deleteAllNotifications()}>
          <Text className="px-2.5 text-right font-satoshi-bold text-lg text-danger">
            Delete All
          </Text>
        </TouchableOpacity>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="px-2.5 pb-2 font-satoshi-bold text-lg">
              {title}
            </Text>
          )}
          // contentContainerClassName="pb-16"
        />
      </View>
    </SafeAreaView>
  );
};

export default notification;
