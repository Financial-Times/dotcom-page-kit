// Karma configuration
// Generated on Fri Apr 18 2014 18:19:03 GMT+0100 (BST)

const path = require('path');
const BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = function (karma) {

	const config = {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
		// list of files / patterns to load in the browser
		files: [
			'http://cdn.polyfill.io/v2/polyfill.min.js?features=' + [
				'default',
				'requestAnimationFrame',
				'Promise',
				'matchMedia',
				'HTMLPictureElement',
				'fetch',
				'Array.prototype.find',
				'Array.prototype.findIndex',
				'IntersectionObserver',
				'Map',
				'Array.from',
				'NodeList.prototype.@@iterator',
				'Array.prototype.@@iterator',
				'EventSource',
				'Number.isInteger'
			].join(',') + '&flags=gated&source=n-ui-foundations-tests',
			'test/**/*.spec.js'
		],

		// preprocess matching files before serving them to	the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/**/*.spec.js': ['webpack', 'sourcemap']
		},
		webpack: {
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel',
						exclude: [
							path.resolve('./node_modules')
						],
						query: {
							cacheDirectory: true,
							presets: ['es2015'],
							plugins: [
								['add-module-exports', {loose: true}],
								['transform-es2015-classes', { loose: true }]
							]
						}
					},
					// set 'this' scope to window
					{
						test: /cssrelpreload\.js$/,
						loader: 'imports-loader?this=>window'
					},
				]
			},
			plugins: [
				new BowerWebpackPlugin({ includes: /\.js$/ }),
			],
			resolve: {
				root: [
					path.join(__dirname, 'bower_components'),
					path.join(__dirname, 'node_modules')
				]
			}
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
		logLevel: karma.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],

		plugins: [
			require('karma-mocha'),
			require('karma-chai'),
			require('karma-sinon'),
			require('karma-sinon-chai'),
			require('karma-sourcemap-loader'),
			require('karma-webpack'),
			require('karma-chrome-launcher'),
			require('karma-browserstack-launcher'),
			require('karma-html-reporter')
		],
		client: {
			mocha: {
				reporter: 'html',
				ui: 'bdd',
				timeout: 0
			}
		},

		// wait 10 minutes for a browser if we have to...
		captureTimeout: (1000 * 60) * 10,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,
		browserNoActivityTimeout: 50000,
		browserDisconnectTolerance: 3
	};


	if (process.env.CI) {
		config.browserStack = {
			username: process.env.BROWSERSTACK_USER,
			accessKey: process.env.BROWSERSTACK_KEY,
			project: 'n-ui-foundations',
			name: 'Unit Tests'
		};

		config.customLaunchers = {
			chromeLatest: {
				base: 'BrowserStack',
				browser: 'chrome',
				browser_version: 'latest',
				os: 'Windows',
				os_version: '10'
			},
			firefoxLatest: {
				base: 'BrowserStack',
				browser: 'firefox',
				browser_version: 'latest',
				os: 'Windows',
				os_version: '10'
			},
			ie11: {
				base: 'BrowserStack',
				browser: 'IE',
				browser_version: '11',
				os: 'Windows',
				os_version: '7'
			},
			safari: {
				base: 'BrowserStack',
				os: 'OS X',
				os_version : 'High Sierra',
				browser: 'Safari',
				browser_version: 'latest'
			}
		};

		config.browsers = Object.keys(config.customLaunchers);

		config.reporters.push('BrowserStack');
	}

	karma.set(config);
};
