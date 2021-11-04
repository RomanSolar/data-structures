var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  this.storage = {first: 1, end: 0};

};


Queue.prototype.enqueue = function(value) {
  this.storage[this.storage.end + 1] = value;
  this.storage.end = this.storage.end + 1;
};
Queue.prototype.dequeue = function() {
  if (this.storage.first > this.storage.end) {
    return undefined;
  }
  var temp = this.storage[this.storage.first];
  this.storage.first = this.storage.first + 1;
  return temp;
};
Queue.prototype.size = function() {
  if (this.storage.first > 0 && this.storage.end > 0) {
    return this.storage.end - this.storage.first + 1;
  }
  return 0;
};
