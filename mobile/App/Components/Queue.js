class Queue {
	constructor() {
		this.storage = [];
		this.front = 0;
		this.back = 0;
	}
	enqueue(songId) {
		this.storage[this.back] = songId;
		this.back++;
	}
	dequeue() {
		if (this.size() > 0) {
			var leaving = this.storage[this.front];
			this.storage = this.storage.slice(1);
			this.front++;
			return leaving;
		}
		return null;
	}
	isQueued(songId) {
		return this.storage.indexOf(songId) > -1
	}
	remove(songId) {
		var index = this.storage.indexOf(songId);
		this.storage = [...this.storage.slice(0, index),
										...this.storage.slice(index + 1)];
		return this.storage;
		}
	size() {
		return this.back - this.front;
	}
};

module.exports = Queue;
