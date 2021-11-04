var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  this.storage = {};

};


Stack.prototype.push = function(value) {
  if (this.storage.top === undefined) {
    this.storage.top = 0;
  }
  this.storage.top = this.storage.top + 1;
  this.storage[this.storage.top] = value;
};
Stack.prototype.pop = function() {
  if (this.storage.top > 0) {
    var holder = this.storage[this.storage.top];
    this.storage.top = this.storage.top - 1;
    return holder;
  }
};
Stack.prototype.size = function() {
  if (this.storage.top === undefined) {
    this.storage.top = 0;
  }
  return this.storage.top;
};
