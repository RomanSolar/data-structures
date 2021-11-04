var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    //tailNode.next = null
    //newNode with value
    //tailNode.next = newNode //newNode = tailNode
    //if head is null = newNode
    var newNode = new Node(value);
    if (list.tail !== null) {
      list.tail.next = newNode;
    }
    list.tail = newNode;
    if (list.head === null) {
      list.head = newNode;
    }
  };

  list.removeHead = function() {
    //headNode.next = headNode
    //storeNode = headNode
    //remove head
    //return OG
    if (list.head !== null) {
      var store = list.head;
      list.head = list.head.next;
      return store.value;
    }
    return undefined;
  };

  list.contains = function(target) {
    //headNode
    //while (.next !== null)
    //  if (value = target) {return true}
    //  increment
    //return false
    var currentNode = list.head;
    while (currentNode.next !== null || currentNode === list.tail) { //tail.next = null
      if (currentNode.value === target) {
        return true;
      }
      if (currentNode === list.tail) {
        return false;
      }
      currentNode = currentNode.next;
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// addToTail O(1)
// removeHead O(1)
// contains O(n)