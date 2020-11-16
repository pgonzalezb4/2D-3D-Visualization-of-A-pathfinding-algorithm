var SpotL = /** @class */ (function () {
    function SpotL(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.start = false;
        this.end = false;
        this.previous = undefined;
        this.wall = false;
    }
    return SpotL;
}());
var NodeGeneric = /** @class */ (function () {
    function NodeGeneric(spot) {
        this.data = spot;
        this.next = null;
    }
    return NodeGeneric;
}());
var OpenSetLL = /** @class */ (function () {
    function OpenSetLL() {
        this.head = null;
    }
    OpenSetLL.prototype.enqueue = function (spot) {
        var inserted = false;
        var curr = this.head;
        var prev = null;
        while (curr != null && curr.data.f < spot.f) {
            prev = curr;
            curr = curr.next;
        }
        if (curr == null || curr.data.f != spot.f) {
            inserted = true;
            var newNode = new NodeGeneric(spot);
            newNode.next = curr;
            if (prev == null) {
                this.head = newNode;
            }
            else {
                prev.next = newNode;
            }
            return inserted;
        }
    };
    OpenSetLL.prototype.dequeue = function () {
        if (this.head == null) {
            throw new Error("Cola vacia");
        }
        var temp = this.head;
        this.head = this.head.next;
        return temp;
    };
    OpenSetLL.prototype.getSize = function () {
        if (this.head == null) {
            return 0;
        }
        var count = 1;
        var temp = this.head;
        while (temp.next != null) {
            count += 1;
            temp = temp.next;
        }
        return count;
    };
    OpenSetLL.prototype.peek = function () {
        var temp = this.head;
        return temp;
    };
    OpenSetLL.prototype.includes = function (item) {
        if (this.head == null) {
            return false;
        }
        if (this.head.data.f == item.data.f) {
            return true;
        }
        var temp = this.head;
        while (temp.next != null) {
            if (temp.next.data.f == item.data.f) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    };
    OpenSetLL.prototype["delete"] = function (item) {
        var deleted = false;
        var curr = this.head;
        var prev = null;
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
    };
    OpenSetLL.prototype.isEmpty = function () {
        if (this.head == null) {
            return true;
        }
        return false;
    };
    return OpenSetLL;
}());
