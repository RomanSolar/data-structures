var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  if (stackMethods.push === undefined) {
    stackMethods.push = pusher;
    stackMethods.pop = popper;
    stackMethods.size = sizer;
  }
  var temp = Object.create(stackMethods);
  temp.storage = {};
  return temp;

};

var pusher = function(value) {
  if (this.storage.top === undefined) {
    this.storage.top = 0;
  }
  this.storage.top = this.storage.top + 1;
  this.storage[this.storage.top] = value;
};
var popper = function() {
  if (this.storage.top > 0) {
    var holder = this.storage[this.storage.top];
    this.storage.top = this.storage.top - 1;
    return holder;
  }
};
var sizer = function() {
  if (this.storage.top === undefined) {
    this.storage.top = 0;
  }
  return this.storage.top;
};
var stackMethods = {};


