var domready = require('domready');
var MainView = require('./main-view');
var loadImages = require('./image-loader');

window.app = {
	init: function() {
		var self = this;
		domready(function() {
			loadImages(function() {
				self.view = new MainView({
					el: document.body
				});
			});
		});
	}
};

window.app.init();
