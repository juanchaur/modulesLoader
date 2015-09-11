Modules Loader
=============

Require JS Plugin, for do hMVC

#Usage

The idea of this component is to do hMVC (Hierarchical Model View Controller) pattern with some additions.
Principally thinked for use with knockout and/or backbone, but now is adapted for Durandal. But can be used
alone.


Directory Structure
-------------------

The directory structure that you need to follow is the following:

	{baseUrl}/modules
	|
	├── moduleName
	|   |
	|   ├── controllers
	|   |   |
	|   |   ├── moduleName.js: This is the principal file that will be loaded when you require the module
	|   |
	|   ├── models: this is optional
	|   |   |
	|   |   ├── modelName.js: you can access theses files by requiring them: model!modelName
	|   |
	|   └── views: this is optional
	|   |   |
	|   |   ├── viewName.js: you can access theses files by requiring them: view!viewName
 	|   |
	|   └── templates: this is optional
	|   |   |
	|   |   ├── moduleName.html you can access theses files by requiring them: template!viewName
	|   |
	|   |
	|   ├── widget: this is optional
	|   |   |
	|   |   ├── widgetName.js: you can access theses files by requiring them: widget!widgetName
	|   |   ├── widgetName.html: you can access theses files by requiring them: widget!widgetName.html
	|   |
	|   |
	|   └── helpers: this is optional
	|       |
	|       ├── fileName.js: you can access theses files by requiring them: helper!fileName



The basic structure
-------------------
- Module (Hierarchical)
	- Controllers
	- Views			(Classes or Objects)
	- Models
	- Helpers
	- Templates		(html's)
	- Widgets		(Like Angular's directives)

### Important
Everything is private by design. The idea is to think that our webapp is composed of little applications communicated by APIs, defined on the Controllers

- Private things
  - models
  - views
  - helpers
  - templates
  - widgets

## Examples

You can find better examples on the unit tests
/tests/mocks/modules

```javascript

define(['module!Employees'], function(Employees){

	// ...

	Employees.getItems();

});

// **${baseUrl}**/modules/Employees/controllers/Employees.js

define(['model!employees', 'model!companies'], function(employeesModel, companiesModel){

	return {

		getItems: function(){
			var items = employeesModel.getAll(),
				companies = companiesModel.getAll(),
				i
			;
			for(i = 0; i ${ items.length; i++){
				// put companies inside items
			}

			return items;
		}
	}

});

// The models are Privates elements, only can be reached by the module Employees
// **${baseUrl}**/modules/Employees/models/employees.js
// **${baseUrl}**/modules/Employees/models/companies.js
```

# How to run the tests

To run the tests you need npm in your system (part of nodejs).

- ```git clone https://github.com/danyg/modulesLoader.git```
- ```cd modulesLoader```
- ```npm install```
- ```npm test```

in this moment a nodewebkit application appears with jasmine for run the tests.

The tests specs are defined on /tests/specs/

Every file that is contained on that folder will be loaded as a spec definition. (May be you need to restart the application to see the additon).

[![Analytics](https://ga-beacon.appspot.com/UA-47717226-1/modulesLoader/home)](https://github.com/igrigorik/ga-beacon)
