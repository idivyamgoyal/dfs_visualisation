import React from 'react';

class Node {
    constructor(value) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.root = null;
        this.idx = 0;
    }

    createTree = (values) => {
        if(values[this.idx] == -1 || this.idx == values.length) {
            this.idx++;
            return null;
        }
        const node = new Node(values[this.idx++]);
        node.leftChild = this.createTree(values);
        node.rightChild = this.createTree(values);
        return node;
    }

    displayTree = (root) => {
        if(!root) {
            return;
        }
        if(root.leftChild) {
            console.log(root.leftChild.value + " <- " + root.value);
        }
        if(root.rightChild) {
            console.log(root.value + " -> " + root.rightChild.value);
        }
        this.displayTree(root.leftChild);
        this.displayTree(root.rightChild);
    }

    tree = () => {
        let values = [10, 20, 30, 40, -1, -1, 50, -1, -1, 60, 70, -1, 80, -1, -1, -1, 90, 100, -1, 120, -1, -1, 110, 130, -1, -1, -1];
        this.root = this.createTree(values);
        this.displayTree(this.root);
    }

    componentDidMount() {
        this.tree();
    }

    render() {
        return(
            <div>
                hi
            </div>
        )
    }
};