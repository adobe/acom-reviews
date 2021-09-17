// Custom Jest transform implementation that wraps babel-jest and injects our
// babel presets, so we don't have to use babel config file
// otherwise parcel will want to use the babel config file

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').default.createTransformer({
    presets: ['@babel/preset-env', '@babel/preset-react'],
});
