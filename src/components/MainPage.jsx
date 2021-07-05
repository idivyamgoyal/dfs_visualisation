import React from 'react';
import BinaryTree from './BinaryTree'

var canvas, context, binaryTree = null, radius = 11, path = [];
export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        // creating ref for the canvas
        this.dfsCanvas_ref = React.createRef();
        this.state = {
            nodeData: '',
            searchNodeData: '',
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
    handleSearchNodeData = (event) => {
        this.setState({
            searchNodeData: event.target.value,
        });
    }
    handleSearchNodeDataInsertion = () => {
        const nodeData = this.state.searchNodeData;
        this.setState({
            searchNodeData: '',
        });
        path = [];
        this.displayTree();
        if (binaryTree.searchForNode(nodeData, path)) {
            alert('Node Found!!!');
            // this.showPath(path);
            return;
        }
        alert('Node data not found!!!');
    }
    componentDidMount() {
        // initialise the canvas once the component in mounted
        this.createCanvas();
    }
    render() {
        return (
            <div className="mainContainer">
                <h3><u>Insert Nodes</u></h3>
                <br />
                <div className="myForm form-group">
                    <input className="form-control" value={this.state.nodeData} onChange={this.handleNodeData} placeholder="enter node data" />
                    &ensp;
                    <div className="form-group">
                        {/* button type-submit is not possible bcoz once submitted, it will lost the "this" reference*/}
                        <button className="btn btn-success rounded-0 formBtn" onClick={this.handleNodeInsertion} >Insert</button> &ensp;
                    </div>
                </div>
                <h3><u>Find Nodes</u></h3>
                < br/>
                <div className="myForm form-group">
                    <input className="form-control" value={this.state.searchNodeData} onChange={this.handleSearchNodeData} placeholder="enter node data to be searched" />
                    &ensp;
                    <div className="form-group">
                        <button className="btn btn-danger rounded-0 formBtn" onClick={this.handleSearchNodeDataInsertion} >Find Node</button> &ensp;
                    </div>
                </div>
                {path.length > 0 ? <h3>Path To Node</h3> : null}
                {path.length > 0 ? path.map((data, idx) => {
                    return <div key={idx} className="pathValue">{data} --{'>'} </div>;
                }) : null}
                {/* canvas on the screen */}
                <canvas id="dfsCanvas" ref={this.dfsCanvas_ref}>Canavs Not Supported!</canvas>
            </div>
        )
    }
};