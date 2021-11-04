

// Instantiate a new graph
var Graph = function() {
  this.nodes = [];
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(nodeValue) {
  this.nodes.push({value: nodeValue, edges: []});
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(nodeValue) {
  for (var i = 0; i < this.nodes.length; ++i) {
    if (nodeValue === this.nodes[i].value) {
      return true;
    }
  }
  return false;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(nodeValue) {
  // remove node
  // remove all edge nodes
  var ind, inde;
  for (var j = 0; j < this.nodes.length; j++) {
    if (this.nodes[j].value === nodeValue) {
      ind = j;
    }
  }
  var eggs = this.nodes[ind].edges; //[4]
  for (var i = 0; i < eggs.length; i++) {
    for (var j = 0; j < this.nodes.length; j++) {
      if (this.nodes[j].value === eggs[i]) {
        inde = j;
      }
    }
    if (inde >= 0) {
      var edgi = this.nodes[inde].edges.indexOf(nodeValue);
      this.nodes[inde].edges.splice(edgi, edgi + 1);
    }
  }
  this.nodes.splice(ind, ind + 1);
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromValue, toValue) {
  // find fromValue value
  for (var n = 0; n < this.nodes.length; ++n) {
    if (this.nodes[n].value === fromValue) {
      if (this.nodes[n].edges.indexOf(toValue) >= 0) {
        return true;
      }
    }
  }
  return false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromValue, toValue) {
  // find fromNode(value) in nodes
  // add edge
  //fromNode.edges.push(toValue);
  for (var i = 0; i < this.nodes.length; ++i) {
    if (this.nodes[i].value === fromValue) {
      this.nodes[i].edges.push(toValue);
      break;
    }
  }
  for (var n = 0; n < this.nodes.length; ++n) {
    if (this.nodes[n].value === toValue) {
      this.nodes[n].edges.push(fromValue);
      break;
    }
  }
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromValue, toValue) { //a to b
  for (var i = 0; i < this.nodes.length; ++i) {
    if (this.nodes[i].value === fromValue) {
      var index = this.nodes[i].edges.indexOf(toValue);
      if (index >= 0) {
        this.nodes[i].edges.splice(index, index + 1);
        break;
      }
    }
  }
  for (var n = 0; n < this.nodes.length; ++n) {
    if (this.nodes[n].value === toValue) {
      var index = this.nodes[n].edges.indexOf(fromValue);
      if (index >= 0) {
        this.nodes[n].edges.splice(index, index + 1);
        break;
      }
    }
  }
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var i = 0; i < this.nodes.length; i++) {
    cb(this.nodes[i].value);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


// addnode O(1)
// contains O(n)
// removenode O(n^2)
// addEdge O(n)
// has edge O(n^2)
// remove edge O(n^2)
// forEachNode O(n)

