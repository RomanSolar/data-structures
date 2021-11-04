var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    //tailNode.next = null
    //newNode with value
    //tailNode.next = newNode //newNode = tailNode
    //if head is null = newNode
    var newNode = new Node(value);
    newNode.previous = list.tail;
    if (list.tail !== null) {
      list.tail.next = newNode;
    }
    list.tail = newNode;
    if (list.head === null) {
      list.head = newNode;
    }
  };

  list.addToHead = function(value) {
    var newNode = new Node(value);
    list.head.previous = newNode;
    list.head = newNode;
  };

  list.removeHead = function() {
    //headNode.next = headNode
    //storeNode = headNode
    //remove head
    //return OG
    var store = list.head;
    if (store !== null) {
      list.head = list.head.next;
      if (list.head !== null) {
        list.head.previous = null;
      }
      return store.value;
    }
    return undefined;
  };

  list.removeTail = function() {
    var store = list.tail.value;
    list.tail = list.tail.previous;
    list.tail.next = null;
    return store;
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
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// addToTail O(1)
// removeHead O(1)
// contains O(n)