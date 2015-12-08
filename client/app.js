require('./class')();

var domready = require('domready');
var MainView = require('./main-view');
var loadImages = require('./image-loader').imageLoader;

window.app = {
	init: function() {
		var self = this;
		domready(function() {
			// TODO: need some loading UI in here. Right now we have a purple flash because our test background shows up
			//   briefly before the image is loaded.
			loadImages(function() {
				self.view = new MainView({
					el: document.body
				});
			});
		});
	}
};

window.app.init();
