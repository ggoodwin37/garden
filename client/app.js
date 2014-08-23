var domready = require('domready');
var MainView = require('./main-view');

window.app = {
	init: function() {
		var self = this;
		domready(function() {
			self.view = new MainView({
				el: document.body
			});
		});
	}
};

window.app.init();
