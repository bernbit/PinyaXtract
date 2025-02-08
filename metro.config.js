const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("cjs");

const nativewindConfig = withNativeWind(config, { input: "./global.css" });

module.exports = wrapWithReanimatedMetroConfig(nativewindConfig);
