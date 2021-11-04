var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  if (queueMethods.enqueue === undefined) {
    queueMethods.enqueue = enq;
    queueMethods.dequeue = deq;
    queueMethods.size = sized;
  }

  var temp = Object.create(queueMethods);
  temp.storage = {};
  return temp;
};

var enq = function(value) {
  if (this.storage.first === undefined) {
    this.storage.first = 1;
  }
  if (this.storage.end === undefined) {
    this.storage.end = 0;
  }
  this.storage[this.storage.end + 1] = value;
  this.storage.end = this.storage.end + 1;
};

var deq = function() {
  if (this.storage.first > this.storage.end) {
    return undefined;
  }
  var holder = this.storage[this.storage.first];
  this.storage.first = this.storage.first + 1;
  return holder;
};

var sized = function() {
  if (this.storage.end === undefined) {
    this.storage.end = 0;
  }
  if (this.storage.first > 0 && this.storage.end > 0) {
    return this.storage.end - this.storage.first + 1;
  }
  return 0;
};

var queueMethods = {};


