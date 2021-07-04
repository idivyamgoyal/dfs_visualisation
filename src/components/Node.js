export default class Node {
    constructor(props) {
        this.data = props.data;
        this.leftChild = null;
        this.rightChild = null;
        this.position = {x: 0, y: 0};
    }
    // setting positon of child-node wrt parent-node
    setPosition = (position) => {
        this.position = position;
    }
};