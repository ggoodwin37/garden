var View = require('ampersand-view');
var templates = require('./templates');

module.exports = View.extend({
	template: templates.body,
	autoRender: true,
	initialize: function() {
		window.alert('main-view initialized');
	}
});
