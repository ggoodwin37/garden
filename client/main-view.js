var $ = require('jquery');
var View = require('ampersand-view');
var templates = require('./templates');
var Ship = require('./ship');

module.exports = View.extend({
	template: templates.body,
	autoRender: true,
	render: function () {
		this.renderWithTemplate();

		// TODO: resize handler
		var $canvasContainer = $('.canvas-container');
		var $canvas = $('[role="main-canvas"]');
		// canvas is funky and wants width/height attributes on the el rather than css.
		$canvas.attr('width', $canvasContainer.width()).attr('height', $canvasContainer.height());
		console.log('canvas size is ' + $canvas.width() + ' x ' + $canvas.height());

		var context = $canvas.get(0).getContext('2d');

		var ship = new Ship();
		ship.x = $canvas.width() / 2;
		ship.y = $canvas.height() / 2;
		ship.thetaDeg = 245;
		ship.r = 30;
		ship.thrustersActive = true;
		ship.draw(context);

		return this;
	}
});
