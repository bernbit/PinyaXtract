import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import useGlobal from "@/context/GlobalContext";

const PAGE_SIZE = 10; // Number of rows per page

const inventory = () => {
  const { timestamps } = useGlobal();
  const timeKeys: string[] = Object.keys(timestamps);
  const [page, setPage] = useState<number>(1);

  // Pagination Calculations
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = timeKeys.slice(startIndex, endIndex);

  //Date Formatting Functions
  const formatDate = (epoch: number): string =>
    new Date(epoch * 1000).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });

  const formatTime = (epoch: number): string =>
    new Date(epoch * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <View className="flex-1 bg-main">
      {/* Time Picker */}
      {/* <View className="px-4 py-4">
          <View className="flex flex-row gap-2 border border-background/80">
            <Text className="flex-1 bg-background p-2 text-center font-satoshi-medium text-lg text-light-text">
              Live
            </Text>
            <Text className="flex-1 rounded-md p-2 text-center font-satoshi-medium text-lg text-dark-text">
              1H
            </Text>
            <Text className="flex-1 rounded-md p-2 text-center font-satoshi-medium text-lg text-dark-text">
              1D
            </Text>
            <Text className="flex-1 rounded-md p-2 text-center font-satoshi-medium text-lg text-dark-text">
              1W
            </Text>
          </View>
        </View> */}

      <View className="flex-1">
        <View className="px-6 py-4">
          <View className="flex flex-row items-center justify-center gap-2 rounded-md bg-background px-4 py-4">
            <MaterialIcons
              name={"monitor-weight"}
              size={35}
              color={Colors["light-text"]}
            />
            <Text className="text-center font-satoshi-bold text-lg text-light-text">
              Total Weight: {timeKeys.length * 5}
            </Text>
          </View>
        </View>

        {/* Table Header */}
        <View className="flex flex-row bg-background">
          {["Date", "Time", "Weight"].map((header) => (
            <View key={header} className="flex-1 px-4 py-4">
              <Text className="text-center font-satoshi-bold text-light-text">
                {header}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-1">
          <FlatList
            data={paginatedData}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <View className="flex flex-row border border-dark-text/20">
                <View className="flex-1 px-4 py-4">
                  <Text className="text-center font-satoshi-bold text-dark-text">
                    {formatDate(+item)}
                  </Text>
                </View>

                <View className="flex-1 border-l border-dark-text/20 px-4 py-4">
                  <Text className="text-center font-satoshi-bold text-dark-text">
                    {formatTime(+item)}
                  </Text>
                </View>

                <View className="flex-1 border-l border-dark-text/20 px-4 py-4">
                  <Text className="rounded-md bg-primary p-1 text-center font-satoshi-bold text-dark-text">
                    5KG
                  </Text>
                </View>
              </View>
            )}
            initialNumToRender={10} // Number of items to render initially
            windowSize={2} // Controls how many items remain in memory (higher is smoother)
            maxToRenderPerBatch={2} // How many new items should render per batch
            removeClippedSubviews={true} // Improves memory usage
          />
        </View>

        {/* Pagination Controls */}
        {timeKeys.length > 10 && (
          <View className="flex flex-row items-center px-4 py-4">
            <TouchableOpacity
              className={`rounded-md px-3 py-2 ${page === 1 ? "bg-background/45" : "bg-background"}`}
              disabled={page === 1}
              onPress={() => setPage(page - 1)}
            >
              <Text className="font-satoshi-medium text-lg text-light-text">
                Previous
              </Text>
            </TouchableOpacity>

            <Text className="flex-1 text-center font-satoshi-bold">
              Page {page}
            </Text>

            <TouchableOpacity
              className={`rounded-md bg-background px-3 py-2 ${endIndex >= timeKeys.length ? "bg-background/45" : "bg-background"}`}
              disabled={endIndex >= timeKeys.length}
              onPress={() => setPage(page + 1)}
            >
              <Text className="font-satoshi-medium text-lg text-light-text">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default inventory;
