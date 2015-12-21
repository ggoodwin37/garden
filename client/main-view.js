var $ = require('jquery');
var View = require('ampersand-view');
var templates = require('./templates');
var Game = require('./game');

module.exports = View.extend({
	template: templates.body,
	autoRender: true,
	render: function () {
		this.renderWithTemplate();

		// TODO: resize handler
		var $canvasContainer = $('.canvas-container');
		var $bgCanvas = $('[role="bg-canvas"]');
		var $fgCanvas = $('[role="fg-canvas"]');
		// canvas is funky and wants width/height attributes on the el rather than css.
		[$bgCanvas, $fgCanvas].forEach(function($canvas) {
			$canvas.attr('width', $canvasContainer.width()).attr('height', $canvasContainer.height());
		});
		window.app.canvasSize = {width: $bgCanvas.width(), height: $bgCanvas.height()};
		console.log('canvas size is ' + window.app.canvasSize.width + ' x ' + window.app.canvasSize.height);

		var canvasMap = {
			$bgCanvas: $bgCanvas,
			$fgCanvas: $fgCanvas
		};
		var game = new Game(canvasMap);
		game.start();

		return this;
	}
});
