/* 
 * 
 *  @overview 
 *  @author Daniel Goberitz <dalgo86@gmail.com>
 * 
 */

define(['require_config', 'module!moduleTest'], function(config, moduleTest){
	var definedModules = require.s.contexts._.defined,
		fullPath = config.baseUrl.replace(/\\/g, '/') + 'modules/moduleTest/controllers/moduleTest.js'
	;
	
	describe('module!', function(){
		it('The module!moduleTest is loaded correctly', function(){
			expect(moduleTest.testName).toBe('module!moduleTest');
		});

		it('The full path of module controller is defined', function(){
			expect(definedModules[fullPath]).toBeDefined('The full path: ' + fullPath);
		});
		it('The module!moduleTest is defined', function(){
			expect(definedModules['module!moduleTest']).toBeDefined('The module!moduleTest must be defined');
		});
		it('module!moduleTest and full path definition must be exactly equal', function(){
			expect(definedModules['module!moduleTest']).toBe(definedModules[fullPath], 'module!moduleTest and full path definition must be exactly equal');
		});
	});

});
