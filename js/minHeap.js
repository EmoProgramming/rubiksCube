// copied from chatGPT, its specifically for objects which contains f:value

export class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(node) {
        this.heap.push(node);
        this.#bubbleUp();
    }

    pop() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];

        this.heap[0] = this.heap.pop();
        this.#bubbleDown();

        return min;
    }

    #bubbleUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[parentIndex].f <= this.heap[index].f) {
                break;
            }

            [this.heap[parentIndex], this.heap[index]] =
                [this.heap[index], this.heap[parentIndex]];

            index = parentIndex;
        }
    }

    #bubbleDown() {
        let index = 0;

        while (true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;

            let smallest = index;

            if (
                left < this.heap.length &&
                this.heap[left].f < this.heap[smallest].f
            ) {
                smallest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right].f < this.heap[smallest].f
            ) {
                smallest = right;
            }

            if (smallest === index) {
                break;
            }

            [this.heap[index], this.heap[smallest]] =
                [this.heap[smallest], this.heap[index]];

            index = smallest;
        }
    }

    get size() {
        return this.heap.length;
    }
}