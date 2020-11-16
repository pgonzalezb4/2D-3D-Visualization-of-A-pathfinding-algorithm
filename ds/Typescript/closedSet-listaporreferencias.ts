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

class LinkedListGeneric<T> {
    private head: NodeGeneric<T> = new NodeGeneric<T>(null);

    public contains(value : T) : boolean {
        let current = this.head;

        while (current != null) {
            if (current.data == value)
                return true;
            current = current.next;
        }

        return false;
    }

    public getSize() : Number { 
        let temp = this.head;
        let count = 0; 
        while (temp != null) 
        { 
            count++; 
            temp = temp.next; 
        } 
        return count; 
    } 
    
    public insert(data : T) : boolean {
        let newNode : NodeGeneric<T> = new NodeGeneric<T>(data);
  
        if (this.head.data == null) {
            this.head = newNode;
            return true;
        }

        let current = this.head;
        while (current.next != null) {
            current = current.next;
        }

        current.next = newNode;
        return true;
    }

    public delete(item : T) : boolean {
        if (this.head.data == item) {
            this.head = this.head.next;
            return true;
        } 

        let current = this.head;        
        while (current.next != null) {
            if (current.next.data == item) {
                current.next = current.next.next;
                return true;
            } 
            else {
                current = current.next;
            }
        }
        return false;
    }

    public isEmpty() : boolean {
        if (this.head == null) {
            return true;
        }
        return false;
    }
}

function main() {
    let closedSet : LinkedListGeneric<Number> = new LinkedListGeneric<Number>();
    closedSet.insert(6);
    closedSet.insert(10);
}