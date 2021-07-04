export default class Node {
    constructor(props) {
        this.data = props.data;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        this.position = {x: 0, y: 0};
    }
    setPosition = (position) => {
        this.position = position;
    }
};