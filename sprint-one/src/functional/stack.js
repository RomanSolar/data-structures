var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function(value) {
    if (storage.top === undefined) {
      storage.top = 0;
    }
    storage.top = storage.top + 1;
    storage[storage.top] = value;
  };

  someInstance.pop = function() {
    if (storage.top > 0) {
      temp = storage[storage.top];
      storage.top = storage.top - 1;
      return temp;
    }
  };

  someInstance.size = function() {
    if (storage.top === undefined) {
      storage.top = 0;
    }
    return storage.top;
  };

  return someInstance;
};
