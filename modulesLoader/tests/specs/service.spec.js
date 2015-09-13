/* 
 * 
 *  @overview 
 *  @author Daniel Goberitz <dalgo86@gmail.com>
 * 
 */



define(['require_config'], function(config){
	var definedModules = require.s.contexts._.defined,
		TheService
	;

	describe('service!', function(){
		describe('service!TheService', function(){
			var fullPath = config.baseUrl.replace(/\\/g, '/') + 'services/TheService/TheService.js';

			it('The service is loaded correctly', function(){
				var loaded = false;
				runs(function(){
					require(['service!TheService'], function(service){
						loaded = true;
						TheService = service;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(TheService.testName).toBe('service!TheService');
				});
			});

			it('The full path is defined in require context', function(){
				expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
			});
			it('testee definition and full path definition must be exactly equal', function(){
				expect(TheService).toBeDefined();
				expect(TheService).toBe(definedModules[fullPath]);
			});

		});

		describe('the service can load files using ./FileName without extension', function(){
			var fullPath = config.baseUrl.replace(/\\/g, '/') + 'services/TheService/aHelper.js',
				aHelper
			;

			it('The service is loaded correctly', function(){
				var loaded = false;
				runs(function(){
					require(['service!TheService'], function(service){
						loaded = true;
						TheService = service;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(TheService.testName).toBe('service!TheService');
				});
			});

			xit('The relative file is loaded correctly', function(){
				var loaded = false;
				runs(function(){
					TheService.load('./aHelper.js', function(it){
						loaded = true;
						aHelper = it;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(aHelper.testName).toBe('service!TheService/aHelper');
				});
			});
			
			it('The relative file is loaded correctly (ADDING THE EXTENSION ".js" TO WORKS CORRECTLY requirejs issue #1019)', function(){
				var loaded = false;
				runs(function(){
					TheService.load('./aHelper.js', function(it){
						loaded = true;
						aHelper = it;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(aHelper.testName).toBe('service!TheService/aHelper');
				});
			});

			it('The full path is defined in require context', function(){
				expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
			});
			it('testee definition and full path definition must be exactly equal', function(){
				expect(aHelper).toBeDefined();
				expect(aHelper).toBe(definedModules[fullPath]);
			});
		});
	});
	
});
	