var $ = require('jquery');
var View = require('ampersand-view');
var templates = require('./templates');

module.exports = View.extend({
	template: templates.body,
	autoRender: true,
	render: function () {
		this.renderWithTemplate();
		var $canvas = $('[role="main-canvas"]');
		console.log('canvas size is ' + $canvas.width() + ' x ' + $canvas.height());
		return this;
	}
});
