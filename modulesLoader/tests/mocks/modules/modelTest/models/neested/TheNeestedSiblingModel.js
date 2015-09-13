/* 
 * 
 *  @overview 
 *  @author Daniel Goberitz <dalgo86@gmail.com>
 * 
 */

define(['require'], function(localRequire){
	'use strict';
	
	return {
		testName: 'model!neested/TheNeestedSiblingModel',
		
		getModel: function(name, cbk){
			var me = this,
				prop = name.split('/')
			;
			prop = prop[prop.length -1];
				
			localRequire(['model!' + name], function(model){
				me[prop] = model;
				cbk(model);
			});
		}
	};
});
