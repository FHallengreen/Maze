import { LinkedList } from './LinkedList.js'

export class Stack {
    constructor() {
        this.linkedList = new LinkedList();
    }

    push(payload) {
        this.linkedList.addFirst(payload);
    }

    pop() {
        const topElement = this.linkedList.first();
        this.linkedList.removeFirst();
        return topElement;
    }
    peek() {
        return this.linkedList.first();
    }
    traverse(action) {
        let currentNode = this.linkedList.head;
        while (currentNode !== null) {
          action(currentNode.payload);
          currentNode = currentNode.next;
        }
      }
}
