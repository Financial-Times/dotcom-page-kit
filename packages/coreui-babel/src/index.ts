export default () => ({
  // prettier-ignore
  presets: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-typescript'),
      require.resolve('@babel/preset-react')
    ],
  plugins: [
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-syntax-dynamic-import')
    // require.resolve('@babel/plugin-transform-runtime')
  ],
  babelrc: true
})

// TODO: Add matts option
