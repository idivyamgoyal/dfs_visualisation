import Node from './Node';
export default class BinaryTree {
    constructor(props) {
        this.root = null;
        this.axisX = 50;
        this.axisY = 25;
        this.context = props.context;
        this.startPosition = {x: 275, y: 10};
        this.radius = props.radius;
    }
    getPosition = ({x, y}, isLeft = false) => {
        return {x: isLeft? x - this.axisX + this.axisY : x + this.axisX + 10, y: y + this.axisY};
    }
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
                    break;
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
    }
    connectNode = (x, y, node) => {
        const {x: x1, y: y1} = node.position;
        this.context.beginPath();
        this.context.moveTo(x, y + this.radius);
        this.context.lineTo(x1, y1 - this.radius);
        this.context.stroke();
    }
    displayTree = () => {
        const queue = [];
        queue.push(this.root);
        while(queue.length !== 0) {
            const node = queue.shift();
            const {x, y} = node.position;
            this.context.beginPath();
            this.context.fill();
            this.context.stroke();
            this.context.strokeText(node.data, x, y);
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
}