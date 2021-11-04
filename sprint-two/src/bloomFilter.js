// implement a bloom filter with m=18 and k=3
// 18 slots and 3 hash functions
// test with 10,000 trials after adding stuff to set

// var hashes = [];
// const sha = createHash('sha256');

// hash.on('readable', () => {
//   // Only one element is going to be produced by the
//   // hash stream.
//   const data = hash.read();
//   if (data) {
//     console.log(data.toString('hex'));
//     // Prints:
//     //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
//   }
// });

// hash.write('some data to hash');
// hash.end();

var md5 = new Hashes.MD5;
var sha1 = new Hashes.SHA1;
var sha256 = new Hashes.SHA256;

var BloomFilter = function() {
  var bf = Object.create(bloomPrototype);
  bf._storage = []; // fix me
  bf.hashes = [];
  bf.limit = 18;
  bf.filter = [];
  bf.misses = 0;
  for (var i = 0; i < bf.limit; i++) {
    bf.filter[i] = 0;
  }
  // new MD5 instance
  bf.hashes.push(md5);
  // new SHA1 instance
  bf.hashes.push(sha1);
  // new SHA256 instance
  bf.hashes.push(sha256);
  // new SHA512 instace
  // var SHA512 = new Hashes.SHA512;
  // new RIPEMD160 instace
  // var RMD160 = new Hashes.RMD160;
  return bf;
};

var bloomPrototype = {};

bloomPrototype.add = function(item) {
  // takes any string and adds it to the set

  for (var i = 0; i < this.hashes.length; i++) {
    this.filter[this.getIntFromStrHash(this.hashes[i].b64(item.toString()))] = 1;
  }
  this._storage.push(item);

};

bloomPrototype.contains = function(item) {
  // takes any string and returns a boolean reflecting whether it can be found in the set
  // if (this._storage.indexOf(item) >= 0) {
  //   return true;
  // }
  // return false;
  if (!this.bloom(item)) {
    return false;
  }
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
  this.misses++;
  return false;

};

bloomPrototype.remove = function(item) {
  // takes any string and removes it from the set, if present
  var index = this._storage.indexOf(item);
  if (index >= 0) {
    this._storage.splice(index, index + 1);
  }
};

bloomPrototype.getIntFromStrHash = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % this.limit;
};

bloomPrototype.bloom = function(item) {
  for (var i = 0; i < this.hashes.length; i++) {
    var temp = this.getIntFromStrHash(this.hashes[i].b64(item.toString()));
    if (this.filter[temp] === 0) {
      return false;
    }
  }
  return true;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// contains O(n)
// remove O(n)
// add O(1)