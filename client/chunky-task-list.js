// a little helper that runs a list of synchronous tasks in chunks.
var CHUNK_SIZE = 100;

var ChunkyTaskList = window.Class.extend({
	init: function() {
		this.taskList = [];
	},
	add: function(step) {
		this.taskList.push(step);
	},
	execute: function(doneCb, progressCb) {
		var self = this;
		var totalTasks = this.taskList.length;
		var completedTasks = 0;
		function next() {
			var i;
			var taskList = [];
			for (i = 0; i < CHUNK_SIZE; ++i) {
				if (self.taskList.length === 0) {
					break;
				}
				taskList.push(self.taskList.shift());
			}
			window.setTimeout(function() {
				taskList.forEach(function(task) {
					task();
					completedTasks++;
				});
				progressCb && progressCb(completedTasks, totalTasks);
				if (completedTasks === totalTasks) {
					doneCb();
				} else {
					next();
				}
			}, 0);
		}
		next();
	}
});

module.exports = ChunkyTaskList;
