const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

module.exports = (async () => ({
  transformer: {
    babelTransformerPath: require.resolve("react-native-sass-transformer"),
  },
  resolver: {
    ...defaultResolver,
    sourceExts: [...defaultResolver.sourceExts, "scss", "sass", "cjs"],
  },
}))();
