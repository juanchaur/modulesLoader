/* jshint node: true */

module.exports = function (grunt) {
	'use strict';

	// Livereload and connect variables
	var LIVERELOAD_PORT = 35729;
	var lrSnippet = require('connect-livereload')({
		port: LIVERELOAD_PORT
	});
	var mountFolder = function( connect, dir ) {
		return connect.static(require('path').resolve(dir));
	};

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: [
				'Gruntfile.js',
				'tests/specs/**/*.js',
				'tests/mocks/**/*.js',
				'src/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		connect: {
			dev: {
				options: {
					port: 8999,
					hostname: 'localhost',
					// keepalive: true,
					// livereload: true,
					// open: true,
					// middleware: function( connect ) {
					// 	return [lrSnippet, mountFolder(connect, '.')];
					// }
				}
			}
		},

		open: {
			dev: {
				path: 'http://localhost:<%= connect.dev.options.port %>/_SpecRunner.html'
			}
		},

		jasmine: {
			dev: {
				src: 'tests/mocks/**/*.js',
				options: {
					specs: 'tests/specs/**/*.spec.js',
					version: '2.0.1',
					keepRunner: true,
					template: require('grunt-template-jasmine-istanbul'),

					templateOptions: {
						coverage: 'bin/coverage/coverage.json',
						report: 'bin/coverage',
						thresholds: {
							lines: 75,
							statements: 75,
							branches: 75,
							functions: 90
						}
					}
				}
			}
		},

		watch: {
			dev: {
				files: [
					'app/src/**/*.js',
					'app/test/**/*.spec.js'
				],
				task: ['jasmine'],
				options: {
					Livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-open');

	/**
	 * Opens the jasmine runner on the browser at: http://localhost:8999/_SpecRunner.html
	 */
	grunt.registerTask('default', [
		'jshint',
		'jasmine:dev',
		'connect:dev:livereload',
		'open:dev',
		'watch:dev'
	]);

	/**
	 * Tests only on terminal: with PhantomJS
	 */
	grunt.registerTask('test', [
		//'jshint',
		'jasmine:dev'
	])
};
