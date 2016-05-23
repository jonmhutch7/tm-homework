var webpack = require('webpack');
var path = require('path');

var build = path.resolve(__dirname, 'src/client/public');
var app = path.resolve(__dirname, 'src/client/app');

var config = {
	entry: app + '/index.jsx',
	output: { path: build, filename: 'bundle.js' },
	module : {
		loaders : [
			{ test: /\.css/, loader: "style-loader!css-loader" },
			{ test: /\.png/, loader: "url-loader?limit=100000&minetype=image/png" },
			{ test: /\.jpg/, loader: "file-loader" },
			{ test : /\.jsx?/, include : app, loader : 'babel', query: { presets: ['es2015', 'react'] } }
		]
	}
};

module.exports = config;
