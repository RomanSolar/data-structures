

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._filled = 0;
};

HashTable.prototype.insert = function(k, v) {
  // get hash of key
  // insert at hash
  var index = getIndexBelowMaxForKey(k, this._limit);
  var check = this._storage.get(index);
  this._filled += 1;
  if (check === undefined) {
    this._storage.set(index, [[k, v]]); //this._storage.set(index, [[k, v]]) //[[k,v],[k,v]]
  } else {
    for (var i = 0; i < check.length; ++i) {
      if (check[i][0] === k) {
        check[i][1] = v;
        return;
      }
    }
    check.push([k, v]);
  }
  //func to test if 75% capacity
  //if true then we do func double size and rehash everything
  this.checkDouble();
};

HashTable.prototype.retrieve = function(k) {
  var arr = this._storage.get(getIndexBelowMaxForKey(k, this._limit));

  if (arr === undefined) {
    return undefined;
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] === k) {
        return arr[i][1];
      }
    }
  }

};

HashTable.prototype.remove = function(k) {
  var arr = this._storage.get(getIndexBelowMaxForKey(k, this._limit)); //[u, v, u, u,] //[u, u, u, u]
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i][0] === k) {
      arr.splice(i, i + 1);
      this._filled += -1;
    }
    if (arr.length === 0) {
      this._storage.set(getIndexBelowMaxForKey(k, this._limit), undefined);
    }
  }
  this.checkHalve();
};

HashTable.prototype.checkDouble = function() {
  // if over 75% call double
  if (this._filled / this._limit >= .75 ) {
    this.double();
  }
};

HashTable.prototype.checkHalve = function () {
  // if below 25% call halve
  if (this._filled / this._limit < .25 ) {
    this.halve();
  }
};

HashTable.prototype.halve = function() {
  var store = [];
  for (var i = 0; i < this._limit; ++i) {
    if (this._storage.storage[i] !== undefined) {
      for (var n = 0; n < this._storage.storage[i].length; ++n) {
        store.push(this._storage.storage[i][n]);
      }
    }
  }
  this._filled = 0;
  this._limit = this._limit / 2;
  this._storage = LimitedArray(this._limit);
  for (var j = 0; j < store.length; ++j) {
    // this.insert(store[j]);
    this.insert(store[j][0], store[j][1]);
  }
};

HashTable.prototype.double = function() {
  var store = [];
  for (var i = 0; i < this._limit; ++i) {
    if (this._storage.storage[i] !== undefined) {
      for (var n = 0; n < this._storage.storage[i].length; ++n) {
        store.push(this._storage.storage[i][n]);
      }
    }
  }
  this._filled = 0;
  this._limit = this._limit * 2;
  this._storage = LimitedArray(this._limit);
  for (var j = 0; j < store.length; ++j) {
    this.insert(store[j][0], store[j][1]);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// insert 0(1)
// retrieve 0(1)
// remove 0(1)

