var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  // your code here
  newTree.children = [];
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  // create new node
  // add node to children of this(called node)
  var node = new Tree(value);
  node.parent = this;
  this.children.push(node);
};

treeMethods.contains = function(target) {

  var found = false;
  var containsRec = function (currentNode) {
    if (currentNode.value === target) {
      found = true;
    } else {
      for (var i = 0; i < currentNode.children.length; ++i) {
        containsRec(currentNode.children[i]);
      }
    }
  };

  containsRec(this);
  return found;

};

treeMethods.removeFromParent = function () {
  for (var i = 0; i < this.parent.children.length; ++i) {
    if (this.parent.children[i].value === this.value) {
      this.parent.children.splice(i, i + 1);
    }
  }
  this.parent = null;
};

treeMethods.traverse = function (func) {
  func(this.value);
  for (var i = 0; i < this.children.length; ++i) {
    this.children[i].traverse(func);
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

// addChild O(1)
// contains O(n)