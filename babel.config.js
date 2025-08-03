module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // …any other plugins…
     require('react-native-worklets/plugin'),
  ],
};
