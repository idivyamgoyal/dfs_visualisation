import React from 'react';
import BinaryTree from './BinaryTree'

var canvas, context, binaryTree = null, radius = 10;
export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        // creating ref for the canvas
        this.dfsCanvas_ref = React.createRef();
        this.state = {
            nodeData: '',
        }
    }
    // creating binary tree
    makeBinaryTree = (nodeData) => {
        if (binaryTree == null) {
            binaryTree = new BinaryTree({ context, radius });
        }
        return binaryTree.addNode(nodeData);
    }
    // initialising the canvas
    createCanvas = () => {
        canvas = this.dfsCanvas_ref.current;
        // assigning is done to make canvas pixels much smoother
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        context = canvas.getContext('2d');
        context.scale(2, 2);
        context.fillStyle = '#000000';
    }
    // handling the change of node-data
    handleNodeData = (event) => {
        this.setState({
            nodeData: event.target.value,
        })
    }
    // insertion of new node in tree
    handleNodeInsertion = () => {
        const nodeData = this.state.nodeData;
        this.setState({
            nodeData: '',
        });
        if (this.makeBinaryTree(nodeData)) {
            alert("Node inserted!")
        }
        this.displayTree();
    }
    // displaying binary tree on the canvas
    displayTree = () => {
        // used to clear the canvas for displaying the updated tree
        context.clearRect(0, 0, canvas.width, canvas.height);
        binaryTree.displayTree();
    }
    componentDidMount() {
        // initialise the canvas once the component in mounted
        this.createCanvas();
    }
    render() {
        return (
            <div className="fluid-container mainContainer">
                <h3><u>Insert Nodes</u></h3>
                <br />
                <div className="myForm form-group">
                    <input className="form-control" value={this.state.nodeData} onChange={this.handleNodeData} placeholder="enter node data" />
                    &ensp;
                    <div className="form-group">
                        {/* button type-submit is not possible bcoz once submitted, it will lost the "this" reference*/}
                        <button className="btn btn-success rounded-0 form-btn" onClick={this.handleNodeInsertion} >Insert</button> &ensp;
                    </div>
                </div>
                {/* canvas on the screen */}
                <canvas id="dfsCanvas" ref={this.dfsCanvas_ref}>Canavs Not Supported!</canvas>
            </div>
        )
    }
};