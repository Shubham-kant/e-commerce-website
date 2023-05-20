const path = require('path');
const nodeExternals = require('webpack-node-externals'); 

 module.exports = {
  mode: 'development',
   entry: {
     main: './index.js'
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dev-build'),
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