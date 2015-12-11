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
			delete this.storage[this.front];
			this.front++;
			return leaving;
		}
		return null;
	}
	size() {
		return this.back - this.front;
	}
};

module.exports = Queue;