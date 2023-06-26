const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();

// https://github.com/kristerkari/react-native-svg-transformer#step-3-configure-the-react-native-packager

// For React Native v0.59 or newer
// Merge the contents from your project's metro.config.js file with this config (create the file if it does not exist already).

// metro.config.js:

// https://www.npmjs.com/package/react-native-svg-transformer
