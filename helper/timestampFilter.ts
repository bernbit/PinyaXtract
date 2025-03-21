type TimestampObject = Record<string, number>;

interface TimestampData {
  // value: number;
  weight: string;
  date: string;
  time: string;
}

export function getFilteredTimestamp(
  timestamps: TimestampObject,
  filter: string | null,
): Record<string, TimestampData> {
  const now = Date.now(); // Current time in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneMonth = 30 * oneDay;

  const filteredTimestamps: Record<string, TimestampData> = {}; // Stores filtered timestamps

  Object.entries(timestamps).forEach(([key, value]) => {
    const timestampMs = value * 1000; // Convert to milliseconds
    const date = new Date(timestampMs);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    // Timestamp data object
    const timestampData: TimestampData = {
      // value,
      date: formattedDate,
      time: formattedTime,
      weight: "5kg",
    };

    // Filter logic
    if (filter === "lastDay" && now - timestampMs <= oneDay) {
      filteredTimestamps[key] = timestampData;
    } else if (filter === "lastWeek" && now - timestampMs <= oneWeek) {
      filteredTimestamps[key] = timestampData;
    } else if (filter === "lastMonth" && now - timestampMs <= oneMonth) {
      filteredTimestamps[key] = timestampData;
    } else if (filter === "allTime") {
      filteredTimestamps[key] = timestampData;
    }
  });

  return filteredTimestamps;
}
