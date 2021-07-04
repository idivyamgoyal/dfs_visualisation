import React from 'react';
import BinaryTree from './BinaryTree'

var canvas, context, binaryTree = null, radius = 10;
export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.root = null;
        this.idx = 0;
        this.dfsCanvas_ref = React.createRef();
        this.state = {
            nodeData: '',
        }
    }
    makeBinaryTree = (nodeData) => {
        if(binaryTree == null) {
            binaryTree = new BinaryTree({context, radius});
        }
        binaryTree.addNode(nodeData);
    }
    callCanvas = () => {
        canvas = this.dfsCanvas_ref.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // canvas.scale(canvas.width, canvas.height);
        context = canvas.getContext('2d');
        context.scale(2, 2);
        context.fillStyle = '#000000';
    }
    changeInNodeData = (event) => {
        this.setState({
            nodeData: event.target.value,
        })
    }
    nodeInsertion = () => {
        const nodeData = this.state.nodeData;
        this.setState({
            nodeData: '',
        });
        this.makeBinaryTree(nodeData);
    }
    displayTree = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        binaryTree.displayTree();
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
                    <button onClick={this.nodeInsertion} >Insert</button>
                    <button onClick={this.displayTree} >Visualise</button>
                </div>
                <canvas id="dfsCanvas" ref={this.dfsCanvas_ref}>Canavs Not Supported!</canvas>
            </div>
        )
    }
};