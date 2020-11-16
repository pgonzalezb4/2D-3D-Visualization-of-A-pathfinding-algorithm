class NodeGeneric<T> 
    {
        public data: T;
        public next: NodeGeneric<T>;
        constructor(data: T) 
        {
            this.data = data;
            this.next = null;
        }
    }

class OrderedLinkedListGeneric<T> {
    private head: NodeGeneric<T> = new NodeGeneric<T>(null);
    constructor() {
        this.head = null;
    }
    
    public enqueue(item : T) : boolean {
        let inserted : boolean = false;
        let curr : NodeGeneric<T> = this.head;
        let prev : NodeGeneric<T> = null;

        while (curr != null && curr.data < item) {
            prev = curr;
            curr = curr.next;
        }

        if (curr == null || curr.data != item) {
            inserted = true;
            let newNode : NodeGeneric<T> = new NodeGeneric<T>(item);
            newNode.next = curr;
            if (prev == null) {
                this.head = newNode;
            }
            else {
                prev.next = newNode;
            }

            return inserted;
        }
    }

    public dequeue() : T {
        if (this.head == null) {
            throw new Error("Cola vacia");
        }

        let temp : NodeGeneric<T> = new NodeGeneric<T>(this.head.data);
        this.head = this.head.next;
        return temp.data;

    }

    public getSize() : number {
        if (this.head == null) {
            return 0;
        }

        let count : number = 1;
        let temp = this.head;
        while (temp.next != null) {
            count += 1;
            temp = temp.next;
        }

        return count;
    }

    public includes(data : T) : boolean {
        if (this.head == null) {
            return false;
        }

        if (this.head.data == data) {
            return true;
        }

        let temp = this.head;
        while (temp.next != null) {
            if (temp.next.data == data) {
                return true;
            }
            temp = temp.next;
        }

        return false;
    }

    public delete(item : T) : boolean {
        let deleted : boolean = false;
        let curr : NodeGeneric<T> = this.head;
        let prev : NodeGeneric<T> = null;

        if (curr != null && curr.data == item) {
            this.head = curr.next;
            deleted = true;
            return deleted;
        }

        while (curr != null && curr.data != item) {
            prev = curr;
            curr = curr.next;
        } 

        if (curr == null) {
            return deleted;
        }

        prev.next = curr.next;
    }

    public isEmpty() : boolean {
        if (this.head == null) {
            return true;
        }
        return false;
    }
}