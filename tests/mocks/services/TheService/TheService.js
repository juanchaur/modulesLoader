/* 
 * 
 *  @overview 
 *  @author Daniel Goberitz <dalgo86@gmail.com>
 * 
 */

define(['require'], function(localRequire){
	'use strict';

	return {
		testName: 'service!TheService',
		load: function(it, cbk){
			localRequire([it], cbk);
		}
	};
	
});
