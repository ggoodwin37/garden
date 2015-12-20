// a little helper that runs a list of synchronous tasks in chunks.
var ChunkyTaskList = window.Class.extend({
	init: function(chunkSize) {
		this.chunkSize = chunkSize;
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
			for (i = 0; i < self.chunkSize; ++i) {
				if (self.taskList.length === 0) {
					break;
				}
				taskList.push(self.taskList.shift());
				console.log('pushed a task, ' + self.taskList.length + ' remaining');
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
