var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) {
    if (storage.first === undefined) {
      storage.first = 1;
    }
    if (storage.end === undefined) {
      storage.end = 0;
    }
    storage[storage.end + 1] = value;
    storage.end = storage.end + 1;
  };

  someInstance.dequeue = function() {
    if (storage.first > storage.end) {
      return undefined;
    }
    var temp = storage[storage.first];
    storage.first = storage.first + 1;
    return temp;
  };

  someInstance.size = function() {
    if (storage.end === undefined) {
      storage.end = 0;
    }
    if (storage.first > 0 && storage.end > 0) {
      return storage.end - storage.first + 1;
    }
    return 0;
  };

  return someInstance;
};
