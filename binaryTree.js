class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.root = null;
		this.buildTree(array);
	}

	buildTree(array) {
		for (let i = 0; i < array.length; i++) {
			this.insert(array[i]);
		}
		return 
	}

	insert(data) {
		let newNode = new Node(data);
		if (this.root === null) {
			this.root = newNode;
			console.log("Initialising Binary Tree with new root");
		} else {
			let currentNode = this.root;
			let nodeAdded = false;
			while (!nodeAdded) {
				if (newNode.data < currentNode.data) {
					if (currentNode.left == null){
						currentNode.left = newNode;
						nodeAdded = true;
					}
					else {
						currentNode = currentNode.left;
					}
				}else if (newNode.data > currentNode.data) {
					if (currentNode.right == null){
						currentNode.right = newNode;
						nodeAdded = true;
					}
					else {
						currentNode = currentNode.right;
					}
				} else if (newNode.data === currentNode.data) {
					// If tha value already exists, don't add it into the three
					nodeAdded = true;
				}
			}
		}
	};

	delete(data) {
		if (this.root === null) {
			console.log("Nothing to delete");
			return false;
		}
		else {
			let previousNode = null;
			let currentNode = this.root;
			let nodeDeleted = false;

			while (!nodeDeleted) {
				if (data < currentNode.data) {
					previousNode = currentNode;
					currentNode = currentNode.left;
					
				}
				else if (data > currentNode.data) {
					previousNode = currentNode;
					currentNode = currentNode.right;
				} 
				else if (data === currentNode.data) {
					// If the data to delete is a leaf
					if(currentNode.left == null && currentNode.right == null){
						console.log(data, " is a leaf node.")
						console.log("Current node is : ", currentNode);

						if(previousNode === null){
							this.root = null;
						}
						else if(data < previousNode.data){
							previousNode.left = null;
						}
						else if(data > previousNode.data){
							previousNode.right = null;
						}
						nodeDeleted = true;
					}
					// If the data to delete has only one child
					else if((currentNode.left !== null && currentNode.right == null) || (currentNode.left == null && currentNode.right !== null)){
						let nextChild = currentNode.left !== null ? currentNode.left : currentNode.right;
						console.log(data, " has only one child, nextChild is : ", nextChild.data)
						if(data < previousNode.data){
							previousNode.left = nextChild;
						}
						else if(data > previousNode.data){
							previousNode.right = nextChild;
						}
						nodeDeleted = true;
					}
					// If the node to delete has two childs
					else if(currentNode.left !== null && currentNode.right !== null){
						console.log(data, " has two children : ", currentNode.left.data, " and ", currentNode.right.data);
						// Get in order successor in right part of the array
						let {previousSuccessor, orderedSuccessor} = this.inOrderSuccessor(currentNode);


						previousSuccessor.left = null;
						orderedSuccessor.left = currentNode.left;
						orderedSuccessor.right = currentNode.right;

						if(previousNode === null){
							this.root = orderedSuccessor;
						}
						else if(data < previousNode.data){
							previousNode.left = orderedSuccessor;
						}
						else if(data > previousNode.data){
							previousNode.right = orderedSuccessor;
						}
						currentNode = null;
						nodeDeleted = true;
					}
				}
			}
		}
	};

	inOrderSuccessor(root = this.root){
		let initialValue = root.data;

		// Get the right branch from the root
		let rootRightBranch = root.right;

		// Get the leftmost node from the right branch
		let leftMostNode = rootRightBranch;
		let previousNode = null;
		while (leftMostNode.left !== null) {
			// Keep track of previous node
			previousNode = leftMostNode;
			leftMostNode = leftMostNode.left;
		}

		return {previousSuccessor: previousNode, orderedSuccessor: leftMostNode};
	}

	prettyPrint(node = this.root, prefix = "", isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	};
}

let binaryTree = new Tree([1,4,7,2,120,6,3,7,7,0,9,10,-1]);
binaryTree.prettyPrint();

binaryTree.insert(3.5)
binaryTree.prettyPrint();

binaryTree.delete(0);
binaryTree.delete(6);
binaryTree.delete(2);
binaryTree.prettyPrint();

binaryTree.insert(8);
binaryTree.prettyPrint();

binaryTree.delete(7);
binaryTree.prettyPrint();
binaryTree.delete(8);
binaryTree.prettyPrint();
binaryTree.delete(4);
binaryTree.prettyPrint();
binaryTree.delete(1);
binaryTree.prettyPrint();


binaryTree.delete(-1);
binaryTree.prettyPrint();
binaryTree.delete(120);
binaryTree.prettyPrint();

