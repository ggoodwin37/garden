var View = require('ampersand-view');
var templates = require('./templates');

module.exports = View.extend({
	template: templates.body,
	autoRender: true,
	intialize: function() {
		window.alert('hello');
	}
});
