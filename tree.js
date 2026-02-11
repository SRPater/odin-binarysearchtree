import Node from "./node.js";

export default class Tree {
  constructor(array) {
    const sorted = [...new Set(array)].sort((a, b) => { return a - b });
    this.root = this.#buildTree(sorted);
  }

  #buildTree(array) {
    if (array.length < 1) return null;
    const middleIndex = Math.floor(array.length / 2);
    const node = new Node(array[middleIndex]);
    node.left = this.#buildTree(array.slice(0, middleIndex));
    node.right= this.#buildTree(array.slice(middleIndex + 1));

    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value === currentNode.data) {
        return true;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;
    
    while (currentNode !== null) {
      if (value === currentNode.data) {
        return;
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  deleteItem(value) {
    if (this.root === null) return;

    let parent = null;
    let currentNode = this.root;

    while (currentNode !== null && currentNode.data !== value) {
      parent = currentNode;

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (currentNode === null) return;

    if (currentNode.left === null && currentNode.right === null) {
      if (parent === null) {
        this.root = null;
      } else if (parent.left === currentNode) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (currentNode.left === null || currentNode.right === null) {
      let replacement = currentNode.left !== null
        ? currentNode.left
        : currentNode.right;
      
      if (parent === null) {
        this.root = replacement;
      } else if (parent.left === currentNode) {
        parent.left = replacement;
      } else {
        parent.right = replacement;
      }
    } else {
      let successorParent = currentNode;
      let successor = currentNode.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      currentNode.data = successor.data;

      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");
    if (this.root === null) return;
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      callback(currentNode.data);

      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");

    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };

    traverse(this.root);
  }

  height(value) {
    let currentNode = this.root;

    while (currentNode !== null && currentNode.data !== value) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (currentNode === null) return undefined;

    const calculateHeight = (node) => {
      if (node === null) return -1;
      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return calculateHeight(currentNode);
  }

  depth(value) {
    if (this.root === null) return undefined;

    let currentNode = this.root;
    let edges = 0;

    while (currentNode !== null) {
      if (value === currentNode.data) return edges;

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }

      edges++;
    }

    return undefined;
  }

  isBalanced() {
    if (this.root === null) return true;

    const checkHeight = (node) => {
      if (node === null) return -1;
      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);
      if (leftHeight === false || rightHeight === false) return false;
      const heightDiff = Math.abs(leftHeight - rightHeight);
      if (heightDiff > 1) return false;
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(this.root) !== false;
  }

  rebalance() {
    const sortedValues = [];

    this.inOrderForEach((value) => {
      sortedValues.push(value);
    });

    this.root = this.#buildTree(sortedValues);
  }
}
