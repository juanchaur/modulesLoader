/* 
 * 
 *  @overview 
 *  @author Daniel Goberitz <dalgo86@gmail.com>
 * 
 */

define(['require_config', 'module!modelTest', 'module!modelTest2'], function(config, modelTest, modelTest2){
	var definedModules = require.s.contexts._.defined;
	
	describe('model!', function(){
		describe('model!TheModel', function(){
			var fullPath = config.baseUrl.replace(/\\/g, '/') + 'modules/modelTest/models/TheModel.js';

			it('The model TheModel inside module!modelTest is loaded correctly', function(){
				var loaded = false;
				runs(function(){
					modelTest.getModel('TheModel', function(){
						loaded = true;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(modelTest.TheModel.testName).toBe('model!TheModel');
				});
			});

			it('The full path is defined in require context', function(){
				expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
			});
			it('testee definition and full path definition must be exactly equal', function(){
				expect(modelTest.TheModel).toBeDefined();
				expect(modelTest.TheModel).toBe(definedModules[fullPath]);
			});
		});

		describe('model!neested/TheNeestedModel', function(){
			var fullPath = config.baseUrl.replace(/\\/g, '/') + 'modules/modelTest/models/neested/TheNeestedModel.js';

			it('The model neested/TheNeestedModel inside module!modelTest is loaded correctly', function(){
				var loaded = false;
				runs(function(){
					modelTest.getModel('neested/TheNeestedModel', function(){
						loaded = true;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(modelTest.TheNeestedModel.testName).toBe('model!neested/TheNeestedModel');
				});
			});

			it('The full path of model TheNeestedModel is defined', function(){
				expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
			});
			it('testee definition and full path definition must be exactly equal', function(){
				expect(modelTest.TheNeestedModel).toBeDefined();
				expect(modelTest.TheNeestedModel).toBe(definedModules[fullPath]);
			});
		});

		describe('model!neested/TheNeestedSiblingModel (TheNeestedModel called by a sibling)', function(){
			var fullPath = config.baseUrl.replace(/\\/g, '/') + 'modules/modelTest/models/neested/TheNeestedModel.js';

			it('The model neested/TheNeestedSiblingModel inside module!modelTest is loaded correctly', function(){
				var loaded = false;
				runs(function(){
					modelTest.getModel('neested/TheNeestedSiblingModel', function(){
						loaded = true;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(modelTest.TheNeestedSiblingModel.testName).toBe('model!neested/TheNeestedSiblingModel');
				});
			});

			it('The model TheNeestedSiblingModel try to load model!neested/TheNeestedModel loaded correctly', function(){
				var loaded = false;
				runs(function(){
					modelTest.TheNeestedSiblingModel.getModel('neested/TheNeestedModel', function(){
						loaded = true;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(modelTest.TheNeestedSiblingModel.TheNeestedModel.testName).toBe('model!neested/TheNeestedModel');
				});
			});

			it('The full path of model TheNeestedModel is defined', function(){
				expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
			});
			it('testee definition and full path definition must be exactly equal', function(){
				expect(modelTest.TheNeestedSiblingModel).toBeDefined();
				expect(modelTest.TheNeestedSiblingModel.TheNeestedModel).toBe(definedModules[fullPath]);
			});
		});

		describe('the name TheModel is reusable in another module', function(){
			var fullPath = config.baseUrl.replace(/\\/g, '/') + 'modules/modelTest2/models/TheModel.js';

			it('The model TheModel inside module!modelTest is loaded correctly', function(){
				var loaded = false;
				runs(function(){
					modelTest2.getModel('TheModel', function(){
						loaded = true;
					});
				});

				waitsFor(function(){
					return loaded;
				}, 1000);

				runs(function(){
					expect(modelTest2.TheModel.testName).toBe('model!TheModel');
				});
			});

			it('The full path is defined in require context', function(){
				expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
			});
			it('testee definition and full path definition must be exactly equal', function(){
				expect(modelTest2.TheModel).toBeDefined();
				expect(modelTest2.TheModel).toBe(definedModules[fullPath]);
			});
		});

		describe('try to load model!TheModel from outside a module', function(){
			var fullPath = config.baseUrl.replace(/\\/g, '/') + 'modules/modelTest2/models/TheModel.js';

			it('load module!modelTest from outside result on throw an URIError', function(){
				var throwed = false,
					Err,
					previousOnError = window.onerror
				;
				window.onerror = function(msg, file, line, char, err){
					Err = err;
					throwed = true;
				};

				runs(function(){
					require(['model!TheModel'], function(){
						loaded = true;
					});
				});

				waitsFor(function(){
					return throwed;
				}, 1000);

				runs(function(){
					//tearDown
					window.onerror = previousOnError;
					
					expect(Err).toBeDefined();
					expect(Err instanceof URIError).toBeTruthy();
				});
			});

			it('The full path is defined in require context', function(){
				expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
			});
			it('testee definition and full path definition must be exactly equal', function(){
				expect(modelTest2.TheModel).toBeDefined();
				expect(modelTest2.TheModel).toBe(definedModules[fullPath]);
			});
		});
	});
});
