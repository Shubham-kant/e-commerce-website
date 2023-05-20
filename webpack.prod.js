const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const TerserPlugin = require("terser-webpack-plugin");
 module.exports = {
  mode: 'production',
   entry: {
     main: './index.js'
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'prod-build'),
     clean: true,
     publicPath:'/'
   },
   target:'node',
   externals: [nodeExternals()],
   module:{
    rules:[
        {
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader'
        }
    ]
   }
 };