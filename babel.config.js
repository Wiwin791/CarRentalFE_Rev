module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'bebelrc',
        alias: {
          '@utils': './src/utils',
          '@components': './src/components',
          '@screens': './src/screens',
          '@reducers': './src/redux/reducers',
          '@constant': './src/config/constant.js',
          '@assets': './src/assets'
        },
      },
    ],
  ],
};
