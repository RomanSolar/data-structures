var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = []; // fix me
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  // takes any string and adds it to the set
  this._storage.push(item);
};

setPrototype.contains = function(item) {
  // takes any string and returns a boolean reflecting whether it can be found in the set
  // if (this._storage.indexOf(item) >= 0) {
  //   return true;
  // }
  // return false;
  for (var i = 0; i < this._storage.length; i++) {
    if (typeof item === 'number' || typeof item === 'boolean' || typeof item === 'string') {
      if (item === this._storage[i]) {
        return true;
      }
    } else if (typeof item === 'object') {
      if (_.isEqual(item, this._storage[i])) {
        return true;
      }
    } else if (typeof item === 'function') {
      if (item.toString() === this._storage[i].toString()) {
        return true;
      }
    }
  }
  return false;

};

setPrototype.remove = function(item) {
  // takes any string and removes it from the set, if present
  var index = this._storage.indexOf(item);
  if (index >= 0) {
    this._storage.splice(index, index + 1);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// contains O(n)
// remove O(n)
// add O(1)