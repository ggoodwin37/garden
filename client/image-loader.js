var async = require('async');

var imageList = ['/img/ben-ship-on.png', '/img/ben-ship-off.png', '/img/ben-rock-lg.png',
				 '/img/ben-rock-med.png', '/img/ben-rock-sm.png', '/img/ben-laser.png'];

var imageMap = {};

function imageLoader(done) {
	var taskList = [];
	imageList.forEach(function(thisPath) {
		taskList.push(function(cb) {
			var thisImage = new Image();
			thisImage.onload = function() {
				imageMap[thisPath] = thisImage;
				cb();
			};
			thisImage.src = thisPath;
		});
		async.parallelLimit(taskList, 6, done);
	});
}

module.exports = {
	imageLoader: imageLoader,
	imageMap: imageMap
};
