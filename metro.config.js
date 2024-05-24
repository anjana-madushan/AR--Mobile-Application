const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('bin', 'gltf', 'glb', 'patt');

module.exports = mergeConfig(defaultConfig, {});