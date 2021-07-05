import Node from './Node';
export default class BinaryTree {
    constructor(props) {
        this.root = null;
        // const gap in x-axis
        this.constXGap = 50;
        // const gap in y-axis
        this.constYGap = 25;
        this.context = props.context;
        // staring position of root
        this.startPosition = {x: 350, y: 15};
        this.radius = props.radius;
    }
    // accessing position values of parent and updating child position values according to it
    getPosition = ({x, y}, isLeft = false) => {
        return {x: isLeft? x - this.constXGap : x + this.constXGap, y: y + this.constYGap};
    }
    // adding node wrt data-value
    addNode = (data) => {
        const node = new Node({data});
        if(this.root === null) {
            node.setPosition(this.startPosition);
            this.root = node;
        }
        else {
            let current = this.root;
            while(current) {
                if(current.data === data) {
                    alert("Error: duplicate data, insert unique data.");
                    return false;
                }
                if(+data > +current.data) {
                    if(current.rightChild == null) {
                        node.setPosition(this.getPosition(current.position));
                        current.rightChild = node;
                        break;
                    }
                    current = current.rightChild;
                }
                else {
                    if(current.leftChild == null) {
                        node.setPosition(this.getPosition(current.position, true));
                        current.leftChild = node;
                        break;
                    }
                    current = current.leftChild;
                }
            }
        }
        return true;
    }
    // making connection to child
    connectNode = (x, y, node) => {
        const {x: x1, y: y1} = node.position;
        this.context.beginPath();
        // stroking line from parent's circle-bottom to child's circle-top
        this.context.moveTo(x, y + this.radius);
        this.context.lineTo(x1, y1 - this.radius);
        this.context.strokeStyle = "black";
        this.context.stroke();
    }
    // displaying tree using bfs logic
    displayTree = () => {
        const queue = [];
        queue.push(this.root);
        while(queue.length !== 0) {
            const node = queue.shift();
            const {x, y} = node.position;
            this.context.beginPath();
            this.context.strokeStyle = "black";
            this.context.arc(x, y, this.radius, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.strokeText(node.data, x - 5, y + 5);
            if(node.leftChild) {
                queue.push(node.leftChild);
                this.connectNode(x, y, node.leftChild);
            }
            if(node.rightChild) {
                queue.push(node.rightChild);
                this.connectNode(x, y, node.rightChild);
            }        
        }
    }
    // coloring node while traversing
    colorNode = (node, isFound = false, reset = false) => {
        this.context.beginPath();
        const {x, y} = node.position;
        this.context.strokeStyle = isFound ? "red" : "blue";
        this.context.arc(x, y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
    }
    // de-colouring node to original color while making node-unvisited
    resetColorNode = (node) => {
        this.context.beginPath();
        const {x, y} = node.position;
        this.context.strokeStyle = "black";
        this.context.arc(x, y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
    }
    // searching for node - appying dfs - not using bst logic
    searchForNode = (nodeData, path, node = this.root) => {
        if(node.data === nodeData) {
            path.unshift(node.data);
            this.colorNode(node, true);
            return true;
        }
        this.colorNode(node);
        let result;
        if(node.leftChild) {
            result = this.searchForNode(nodeData, path, node.leftChild);
        }
        if(!result && node.rightChild) {
            result = this.searchForNode(nodeData, path, node.rightChild);
        }
        if(!result) {
            this.resetColorNode(node);
            return result;
        }
        path.unshift(node.data);
        return result;
    }
};