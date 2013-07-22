/*
 *     (c) 2013 Daniel Goberitz.
 *     Modules loader may be freely distributed under the MIT license.
 *     For all details and documentation:
 *     https://www.github.com/danyg/modulesLoader
*/
/**
 * @fileOverview
 * Plugin de requireJS para cargar modulos facilmente
 * Teneindo modulos con esta estructura
 * 
 * - moduleName/
 *		- controllers/
 *			- [moduleName]Controller.js
 *		- models/
 *		- views/
 * 
 * Es posible gracias a este plugin cargar el fichero [moduleName]Controller.js
 * requiriendo module![moduleName]
 * 
 * el controlador sera el encargado de cargar los modelos y vistas internos que 
 * utilize.
 * 
 * **[moduleName].js
 * 
 *	define('../views/[viewName]', '../models/[modelName]', function(){...});
 * 
 * @author Daniel Goberitz <dalgo86@gmail.com>
 */
requirejs(['jquery'], function($){
	function getModuleName(req){
		var localURL = req.toUrl('./'),
			pos = localURL.indexOf('modules/'),
			pS, pE, moduleName
		;
		if(pos !== -1){
			pS = pos+8;
			pE = localURL.indexOf('/', pS);
			pE = pE === -1 ? undefined : pE;
			moduleName = localURL.substring(pS, pE);
		}else{
			throw 'Llamado "module!" fuera de un modulo';
		}
		
		return moduleName;
	}

	function getTemplate(url, cbk){
		if(undefined === getTemplate.cache){
			getTemplate.cache = {};
		}
		
		if(undefined === getTemplate.cache[url]){
			$.get(
				url,
				function(html){
					getTemplate.cache[url] = html;
					cbk(html);
				},
				'html'
			);
		}else{
			cbk(getTemplate.cache[url]);
		}
	}
	
	function isNoCacheName(name){
		if(name.substring(0, 2) === 'E:' || name === '_'){
			return true;
		}else{
			return false;
		}
	}
	
	function getNormalize(sname){
		
		return function (name, normalize){
			var aName = name,
				tmp = normalize(name)
			;
			if(isNoCacheName(name)){
				name = 'E:' + sname + Math.random();
			}
//console.log('['+sname+'.normalize]', aName, '=>', name);
			return name;
		}
		
		
	}

	define('module', [], {
		load: function (name, req, onload, config) {
			name = (name.split('|'))[0];
			if(name === ''){
				throw 'no name';
			}
			var moduleName, toLoad;
			
			if(isNoCacheName(name)){
				moduleName = getModuleName(req);
//console.log('[module!.load]',name, '=>', moduleName);
				onload(moduleName); // devuelve el nombre del modulo
				return;
			}else{
				moduleName = name;
			}

			name = name ? moduleName : name;
			toLoad = config.paths.modules + moduleName + '/models/' + name + 'Model.js';

			req([toLoad], function (value) {
				onload(value);
			});
		}, 
		normalize: getNormalize('module!')
	});

	
	define('view', [], {
		load: function (name, req, onload, config) {
			name = (name.split('|'))[0];
			
			var moduleName = getModuleName(req),
				toLoad
			;
			name = isNoCacheName(name) ? moduleName : name;
			toLoad = config.paths.modules + moduleName + '/views/' + name + 'View.js';

			req([toLoad], function (value) {
				onload(value);
			});
		},
		normalize: getNormalize('view!')
	});

	define('template', [], {
		load: function (name, req, onload, config) {
			name = (name.split('|'))[0];
			
			var moduleName = getModuleName(req),
				toLoad
			;
			name = isNoCacheName(name) ? moduleName : name;
			toLoad = config.paths.modules + moduleName + '/templates/' + name + '.html';

			getTemplate(toLoad, function(html){
				onload(html);
			});
		},
		normalize: getNormalize('template!')
	});

	define('helper', [], {
		load: function (name, req, onload, config) {
			name = (name.split('|'))[0];
			
			var moduleName, toLoad;
			moduleName = getModuleName(req);

			if(isNoCacheName(name)){
				throw 'Para cargar un helper debe especificar nombre o ruta en el module';
			}

			toLoad = config.paths.modules + moduleName + '/helpers/' + name + '.js';

			req([toLoad], function (value) {
				onload(value);
			});
		},
		normalize: getNormalize('helper!')
	});

	define('mcss', [], {
		load: function (name, req, onload, config) {
			name = (name.split('|'))[0];
			
			var moduleName = getModuleName(req),
				toLoad,
				cssNode
			;
			name = isNoCacheName(name) ? moduleName : name;
			toLoad = config.paths.modules + moduleName + '/css/' + name + '.css';

			$('head').append(
				cssNode = $('<link>')
					.attr('href', toLoad)
					.attr('media', 'all')
					.attr('rel', 'stylesheet')
					.attr('type', 'text/css')
			);
			onload(cssNode);

		},
		normalize: getNormalize('mcss!')
	});

});
