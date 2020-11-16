class SpotL {
    public i: number;
    public j: number;
    public f: number;
    public g: number;
    public h: number;
    public start : boolean;
    public end : boolean;
    public neighbors : SpotL[];
    public previous : SpotL;
    public wall : boolean;

    constructor(i: number, j : number, neighbors : SpotL[]) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.start = false;
        this.end = false;
        this.previous = undefined;
        this.wall = false;
        this.neighbors = neighbors;
    }
}

class NodeGeneric<T> 
    {
        public data : SpotL;
        public next: NodeGeneric<T>;
        constructor(spot: SpotL) 
        {
            this.data = spot;
            this.next = null;
        }
    }

class OpenSetLL<T> {
    private head: NodeGeneric<T>;
    constructor() {
        this.head = null;
    }
    
    public enqueue(spot : SpotL) : boolean {
        let inserted : boolean = false;
        let curr : NodeGeneric<T> = this.head;
        let prev : NodeGeneric<T> = null;   

        while (curr != null && curr.data.f < spot.f) {
            prev = curr;
            curr = curr.next;
        }

        if (curr == null || curr.data.f != spot.f) {
            inserted = true;
            let newNode : NodeGeneric<T> = new NodeGeneric<T>(spot);
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

    public dequeue() : NodeGeneric<T> {
        if (this.head == null) {
            throw new Error("Cola vacia");
        }

        let temp = this.head;
        this.head = this.head.next;
        return temp;
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

    public peek() : NodeGeneric<T> {
        let temp = this.head;
        return temp;
    }

    public includes(item : NodeGeneric<T>) : boolean {
        if (this.head == null) {
            return false;
        }

        if (this.head.data.f == item.data.f) {
            return true;
        }

        let temp = this.head;
        while (temp.next != null) {
            if (temp.next.data.f == item.data.f) {
                return true;
            }
            temp = temp.next;
        }

        return false;
    }

    public delete(item : NodeGeneric<T>) : boolean {
        let deleted : boolean = false;
        let curr : NodeGeneric<T> = this.head;
        let prev : NodeGeneric<T> = null;

        if (curr != null && curr.data.f == item.data.f) {
            this.head = curr.next;
            deleted = true;
            return deleted;
        }

        while (curr != null && curr.data.f != item.data.f) {
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