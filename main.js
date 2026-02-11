import Tree from "./tree.js";

function getRandomArray(size, max = 100) {
  const array = [];

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  
  return array;
}

const tree = new Tree(getRandomArray(15));
console.log("Tree is balanced: ", tree.isBalanced());

let levelOrder = [];
let preOrder = [];
let postOrder = [];
let inOrder = [];

tree.levelOrderForEach(e => levelOrder.push(e));
tree.preOrderForEach(e => preOrder.push(e));
tree.postOrderForEach(e => postOrder.push(e));
tree.inOrderForEach(e => inOrder.push(e));

console.log("Level order: ", ...levelOrder);
console.log("Pre order: ", ...preOrder);
console.log("Post order: ", ...postOrder);
console.log("In order: ", ...inOrder);

console.log("Inserting high values...");
tree.insert(123);
tree.insert(256);
tree.insert(101);
tree.insert(312);
tree.insert(198);

console.log("Tree is balanced: ", tree.isBalanced());
console.log("Rebalancing...");
tree.rebalance();
console.log("Tree is balanced: ", tree.isBalanced());

levelOrder = [];
preOrder = [];
postOrder = [];
inOrder = [];

tree.levelOrderForEach(e => levelOrder.push(e));
tree.preOrderForEach(e => preOrder.push(e));
tree.postOrderForEach(e => postOrder.push(e));
tree.inOrderForEach(e => inOrder.push(e));

console.log("Level order: ", ...levelOrder);
console.log("Pre order: ", ...preOrder);
console.log("Post order: ", ...postOrder);
console.log("In order: ", ...inOrder);
