Queue() {
	this.storage = [];
	this.front = 0;
	this.back = 0;
};

Queue.prototype.enqueue = function(songId) {
	this.storage[this.back] = songId;
	this.back++;
};

Queue.prototype.dequeue = function() {
	if (this.size() > 0) {
		var leaving = this.storage[this.front];
		delete this.storage[this.front];
		this.front++;
		return leaving;
	}
	return null;
};

Queue.prototype.size = function() {
		return this.back - this.front;
};