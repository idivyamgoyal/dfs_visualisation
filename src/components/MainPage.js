import React from 'react';

var canvas, context;
const radius = 5;
class Node {
    constructor(params) {
        this.nodeData = params.nodeData;
        this.leftChild = null;
        this.rightChild = null;
        this.x = params.x;
        this.y = params.y;
    }
    // drawing node on the screen
    drawNode = () => {
        console.log("stroking")
        context.beginPath();
        context.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
        context.strokeText(this.nodeData, this.x, this.y);
        return;
    }
    // creating co-ordinates x, y
    leftChildCoordinate = () => {
        return ({
            cx: (this.x - (0.1 * this.x)),
            cy: (this.y + (0.1 * this.y))
        })
    }
    rightChildCoordinate = () => {
        return ({
            cx: (this.x + (0.1 * this.x)),
            cy: (this.y + (0.1 * this.y))
        })
    }
};
class ConnectNewNode {
    constructor(params) {
        console.log("connection object created");
    }
    newConnection = (x1, y1, x2, y2) => {
        context.beginPath();
        context.moveTo(x1, y1 + radius);
        context.lineTo(x2, y2 - radius);
        context.stroke();
    }
};
class BinaryTree {
    constructor(params) {
        this.root = null;
        this.idx = 0;
        this.nodeConnection = new ConnectNewNode();
    }
    addAndDisplayNode = ({x1, y1, nodeData}) => {
        if(nodeData[this.idx] === -1 || this.idx >= nodeData.length) {
            this.idx++;
            return null;
        }
        debugger;
        console.log(this.idx);
        const node = new Node({x: x1, y: y1, nodeData: nodeData[this.idx++]});
        node.drawNode();
        const lcx = node.leftChildCoordinate().cx, lcy = node.leftChildCoordinate().cy;
        const rcx = node.rightChildCoordinate().cx, rcy = node.rightChildCoordinate().cy;
        this.nodeConnection.newConnection(x1, y1, lcx, lcy);
        node.leftChild = this.addAndDisplayNode({x1: lcx, y1: lcy, nodeData});
        this.nodeConnection.newConnection(x1, y1, rcx, rcy);
        node.rightChild = this.addAndDisplayNode({x1: rcx, y1: rcy, nodeData});
        return node;
    }
    addNodes = (nodeData) => {
        this.root = this.addAndDisplayNode({x1: 150, y1: 10, nodeData});
    }
};

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.root = null;
        this.idx = 0;
        this.dfsCanvas_ref = React.createRef();
        this.state = {
            nodeData: [],
        }
    }
    // createTree = (values) => {
    //     if (values[this.idx] === -1 || this.idx === values.length) {
    //         this.idx++;
    //         return null;
    //     }
    //     const node = new Node(values[this.idx++]);
    //     node.leftChild = this.createTree(values);
    //     node.rightChild = this.createTree(values);
    //     return node;
    // }
    // displayTree = (root) => {
    //     if (!root) {
    //         return;
    //     }
    //     if (root.leftChild) {
    //         console.log(root.leftChild.value + " <- " + root.value);
    //     }
    //     if (root.rightChild) {
    //         console.log(root.value + " -> " + root.rightChild.value);
    //     }
    //     this.displayTree(root.leftChild);
    //     this.displayTree(root.rightChild);
    // }
    // tree = () => {
    //     let values = [10, 20, 30, 40, -1, -1, 50, -1, -1, 60, 70, -1, 80, -1, -1, -1, 90, 100, -1, 120, -1, -1, 110, 130, -1, -1, -1];
    //     this.root = this.createTree(values);
    //     this.displayTree(this.root);
    //     // document.getElementById('dfsCanvas').innerHTML = this.root;
    // }
    binaryTree = (nodeData) => {
        const binaryTree = new BinaryTree();
        binaryTree.addNodes(nodeData);
    }
    callCanvas = () => {
        canvas = this.dfsCanvas_ref.current;
        context = canvas.getContext('2d');
        context.fillStyle = '#000000';
    }
    changeInNodeData = (event) => {
        console.log(event.target.value);
        this.setState({
            nodeData: event.target.value,
        })
    }
    nodeInsertion = (event) => {
        const nodeData = this.state.nodeData;
        this.setState({
            nodeData: [],
        });
        // console.log(nodeData);
        this.binaryTree(nodeData);
    }
    componentDidMount() {
        this.callCanvas();
    }

    render() {
        return (
            <div className="fluid-container mainContainer">
                <div className="myForm">
                    <input value={this.state.nodeData} onChange={this.changeInNodeData} placeholder="enter node data" />
                    &ensp;
                    <button type="submit" onClick={this.nodeInsertion} >Insert</button>
                </div>
                <canvas id="dfsCanvas" ref={this.dfsCanvas_ref}>Canavs Not Supported!</canvas>
            </div>
        )
    }
};