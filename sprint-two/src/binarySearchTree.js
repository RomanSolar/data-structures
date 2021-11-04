var BinarySearchTree = function(value) {
  //creates obj = {}

  //returns obj;
  return new tree(value);
};

var tree = function(value) {
  this.left = undefined;
  this.right = undefined;
  this.value = value;
};

tree.prototype.insert = function(insValue, rebalance) {
  //if ins < value we assign to the left
  //if this.left exsist. call insert to this.left

  // check max depth (insValue)
  // check min depth (insValue)
  // if (min * 2 > max)
  //  rebalance(insValue)
  // else
  var depth = 0;
  var minD = this.minDepth();
  var top = this;
  if (this.left === undefined && this.right === undefined) {
    rebalance = true;
  }

  var recursiveInsert = function(node) {

    if (insValue > node.value) {
      if (node.right !== undefined) {
        recursiveInsert(node.right);
      } else if (depth > 2 * minD) {
        if (rebalance !== true) {
          top.rebalance(insValue);
        }

      } else {
        var newRight = new BinarySearchTree(insValue);
        node.right = newRight;
      }
    } else {
      if (node.left !== undefined) {
        recursiveInsert(node.left);
      } else if (depth > 2 * minD) {
        if (rebalance !== true) {
          top.rebalance(insValue);
        }
      } else {
        var newLeft = new BinarySearchTree(insValue);
        node.left = newLeft;
      }
    }
    depth++;
  };

  recursiveInsert(this);
};

tree.prototype.contains = function (searchValue) {
  //extra test if searchValue === this.value; return true;
  if (searchValue === this.value) {
    return true;
  } else if (searchValue > this.value) {
    if (this.right === undefined) {
      return false;
    } else {
      return this.right.contains(searchValue);
    }
  } else {
    if (this.left === undefined) {
      return false;
    } else {
      return this.left.contains(searchValue);
    }
  }
};

tree.prototype.depthFirstLog = function (func) {
  //traverse through tree and execute func on value
  func(this.value);
  if (this.left !== undefined) {
    this.left.depthFirstLog(func);
  }
  if (this.right !== undefined) {
    this.right.depthFirstLog(func);
  }
};

tree.prototype.breadthFirstLog = function () {
  var test = function (val) {
    console.log(val);
  };
  this.depthFirstLog(test);
};

//depth finding (node.right / node.left) {}
//test if one is twice length as the other
//store all values in an array
//middle of array splice it out. sort through the array

// iterate over tree, 2 vars, min and max depth
// recursive sub-function on left and right
//


tree.prototype.minDepth = function() {
  //traverse through tree; you jsut compare min max;
  var min = 0;
  if (this.left === undefined || this.right === undefined) {
    return 0;
  }
  var recursiveMinDepth = function(node, depth) {
    var dleft, dright;
    if (node.left === undefined && node.right === undefined) {
      return depth;
    }
    if (node.left !== undefined) {
      dleft = recursiveMinDepth(node.left, depth + 1);
    }
    if (node.right !== undefined) {
      dright = recursiveMinDepth(node.right, depth + 1);
    }
    if (dright !== undefined) {
      if (dleft === undefined) {
        return dright;
      }
      return (dright < dleft) ? dright : dleft;
    }
    return dleft;
  };
  return recursiveMinDepth(this, min);
};

tree.prototype.maxDepth = function() {
  //traverse through tree; you jsut compare min max;
  var min = 0;
  var recursiveMaxDepth = function(node, depth) {
    var dleft, dright;
    if (node.left === undefined && node.right === undefined) {
      return depth;
    }
    if (node.left !== undefined) {
      dleft = recursiveMaxDepth(node.left, depth + 1);
    }
    if (node.right !== undefined) {
      dright = recursiveMaxDepth(node.right, depth + 1);
    }
    if (dright !== undefined) {
      if (dleft === undefined) {
        return dright;
      }
      return (dright > dleft) ? dright : dleft;
    }
    return dleft;
  };
  return recursiveMaxDepth(this, min);
};

tree.prototype.rebalance = function (insVal) {
  // if would be unbalanced?
  // assign head to the inserting node
  // insert old head to tree
  // old head was less, check right for highest value
  // if value higher than current head, set to head and readd old head to tree
  // if less do opposite
  //
  //
  var storeLeft = this.left; //8 - [3, 1, 6, 4]
  var storeRight = this.right; //8 - [10 ,14]
  var storeVal = this.value; //8
  this.value = insVal; //5 5.left - [3,1,6,4] 5.right - [10, 14]
  if (insVal > storeVal) {
    this.insert(storeVal, true); //5 5.left-[3,1,6,4,7] 5.right-[10,8,4]
    if (storeRight !== undefined) {
      var val = storeRight.minParent(); // node 6
      // val.right.value = max value
      if (val !== undefined) {
        var minVal = val.left.value; //6.right = 7
        storeVal = this.value; //5
        this.value = minVal; // 5 - 7
        this.insert(storeVal); //7 is head and insert 5
      }
    }
  } else { //5 < 8
    this.insert(storeVal); //5 5.left-[3,1,6,4,7] 5.right-[10,8,4]
    if (storeLeft !== undefined) {
      var val = storeLeft.maxParent(); // node 6
      // val.right.value = max value
      if (val !== undefined) {
        var maxVal = val.right.value; //6.right = 7
        storeVal = this.value; //5
        this.value = maxVal; // 5 - 7
        this.insert(storeVal, true); //7 is head and insert 5
      }
    }

  }
};

tree.prototype.maxParent = function() {
  if (this.right === undefined) {
    return undefined;
  }
  var maxParentRecursive = function(node, rChild) {
    if (rChild.right === undefined) {
      return node;
    } else {
      return maxParentRecursive(rChild, rChild.right);
    }
  };
  maxParentRecursive(this, this.right);
};

tree.prototype.minParent = function() {
  if (this.left === undefined) {
    return undefined;
  }
  var minParentRecursive = function(node, lChild) {
    if (lChild.left === undefined) {
      return node;
    } else {
      return minParentRecursive(lChild, lChild.left);
    }
  };
  minParentRecursive(this, this.left);
};

//[1, 3, 4, 6, 7, 8, 10, 13, 14]

/*
 * Complexity: What is the time complexity of the above functions?
 */



// insert 0(log(n))
// contains 0(log(n))
// depthFirstLog 0(n)
