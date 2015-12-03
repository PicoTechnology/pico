const expect = require('expect');

const Queue = function(initialStorage) {
  this.storage = initialStorage || [];
  this.viewStorage = function() {
    return this.storage;
  }
  this.enqueue = function(val) {
    this.storage.push(val);
    return this.storage;
  }
  this.dequeue = function() {
    if (this.storage.length === 0) {
      return null;
    }
    return this.storage.pop();
  }
};

// Enqueue
testEnqueue = function() {
  let q = new Queue([1,2,3]);
  
  expect(q.enqueue(4)).toEqual([1,2,3,4]);
  expect(q.enqueue(5)).toEqual([1,2,3,4,5]);
  expect(q.enqueue(6)).toEqual([1,2,3,4,5,6]);
};
testEnqueue();
console.log('enqueue works');

// Dequeue
testDequeue = function() {
  let q = new Queue([1,2,3]);
  q.dequeue();
  expect(q.viewStorage()).toEqual([1,2]);
  q.dequeue();
  expect(q.viewStorage()).toEqual([1]);
  q.dequeue();
  expect(q.viewStorage()).toEqual([]);
  // edge case
  expect(q.dequeue()).toEqual(null);
};
testDequeue();
console.log('dequeue works');

// All tests pass
console.log('All tests pass!');