// CRONOMETRO //

window.onload = function() {
    empezar();
    reloj = document.getElementById("reloj");
    var marcha = 0;
    var cro = 0;
}

function empezar() {
    emp=new Date() 
    elcrono=setInterval(tiempo,10);
    marcha=1 
}
        
function tiempo() { 
    actual=new Date();
    cro=actual-emp;
    cr=new Date();
    cr.setTime(cro); 
    cs=cr.getMilliseconds();
    cs=cs/10;
    cs=Math.round(cs);
    sg=cr.getSeconds();
    mn=cr.getMinutes();
    ho=cr.getHours()-1; 	 
    if (cs<10) {cs="0"+cs;} 
    if (sg<10) {sg="0"+sg;} 
    if (mn<10) {mn="0"+mn;} 

    reloj.innerHTML=mn+"m "+sg+"s "+cs+"ms"; 
}

function parar() { 
    clearInterval(elcrono);
    marcha=0;
}

// CRONOMETRO //

////////////////////////////////////////// IMPLEMENTACION HEAP CON LISTA POR REFERENCIAS //////////////////////////////////////////

function NodeGeneric(spot) {
    this.data = spot;
    this.next = null;
}

function LinkedListGeneric() {
    this.head = null;

    this.size = function() {
        if (this.head == null) {
            return 0;
        }
        let count = 1;
        let curr = this.head;
        while (curr.next != null) {
            count += 1;
            curr = curr.next;
        }
        return count;
    }

    this.peek = function(){
        return this.head;
    }

    this.remove = function(index){
        let curr = this.head;

        if (index == 0) {
            this.head = this.head.next;
            return curr;
        }
        
        let c = 0;
        while (curr.next != null) {
            if (index == c+1) {
                let temp = curr.next;
                curr.next = curr.next.next;
                return temp;
            }
            curr = curr.next;
            c += 1;
        }

        return;
    }

    this.add = function(spot){
        let nodeToInsert = new NodeGeneric(spot);
        if (this.head == null) {
            this.head = nodeToInsert;
            return;
        }

        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }

        curr.next = nodeToInsert;
        return;

    }

    this.get = function(index) {
        if (index == 0) {
            return this.head;
        }

        let curr = this.head;
        let count = 1;
        while (curr.next != null) {
            if (count == index) {
                return curr.next;
            }
            curr = curr.next;
            count += 1;
        }
    }

    this.set = function(index, node) {
        if (index == 0) {
            this.head = node;
            return;
        }

        let curr = this.head;
        let count = 1;
        while (curr.next != null) {
            if (count == index) {
                curr.next = node;
                return;
            }
            curr = curr.next;
            count += 1;
        }
    }

    this.isEmpty = function(){
        return this.head == null;
    }
}

function MinHeap() {
	
    this.heap = new LinkedListGeneric();
    this.size = 0;
    this.position;

    this.includes = function(spot){
        let curr = this.heap.head;
        let count = 0;
      
        while(curr.next != null) {
            if (spot.data.i == curr.data.i && spot.data.j == curr.data.j) {
                this.position = count;
                return true;
            }
            curr = curr.next;
            count++;
        }

        return false;
    }

    this.getSize = function(){
      return this.size;
    }

    this.peek = function(){
      return this.heap.head;
    }

    this.isEmpty = function(){
        return this.size <= 0;
    }


    this.moveup = function(index){
        var parentIdx=Math.floor((index-1)/2);
        var temp = this.heap.get(index)
        this.heap.set(index, this.heap.get(parentIdx));
        this.heap.set(parentIdx, temp);
        this.position = parentIdX;
    }

    this.movedown=function(index){

            if (this.heap.get(Math.floor(2*index+1)).data.f < this.heap.get(Math.floor(2*index+2)).data.f){
                var childIdx = Math.floor(2*index+1);
            }
            else{
                var childIdx = Math.floor(2*index+2);
            }
            var temp=this.heap.get(index);
            this.heap.set(index, this.heap.get(childIdx));
            this.heap.set(childIdx, temp);
            this.position=childIdx;
    }

    this.enqueue = function(spot){
        var inserted = false;
        this.heap.add(spot);
        if (this.isEmpty()){
            inserted=true;
        }
        else{
            this.position = this.size;
            while (this.position > 0 && spotdata.data.f < this.heap.get(Math.floor((this.position-1)/2)).data.f){
                this.moveup(this.position);
            }
        }

        this.size++;
        return inserted;
    }

    this.dequeue = function(){
        if (!this.isEmpty()){
            var temp = this.heap.get(0);
            this.heap.set(0, this.heap.get(this.size-1));
            this.heap.set(this.size-1, temp);
            dqelement = this.heap.pop();
            this.size--;
            this.position=0;
            while ((this.position*2)+2 < this.size && (this.heap.get(this.position).data.f > this.heap.get(Math.floor((this.position*2)+1)).data.f || this.heap.get(this.position).data.f > this.heap.get(Math.floor((this.position*2)+2)).data.f)){
              this.movedown(this.position);
            }
            return dqelement;
          }
          else{
            throw new Error("Cola vacia");
          }
    }

    this.delete = function(item){
      if(!this.isEmpty()){
        var deleted = false;
        if (this.includes(item)){
          var temp = this.heap.get(this.position);
          this.heap.set(this.position, this.heap.get(this.size-1));
          this.heap.set(this.size-1, temp);
          this.heap.pop();
          this.size--;
          while ((this.position*2)+2 < this.size && (this.heap.get(this.position).data.f > this.heap.get(Math.floor((this.position*2)+1)).data.f || this.heap.get(this.position).data.f > this.heap.get(Math.floor((this.position*2)+2)).data.f)){
            this.movedown(this.position);
          }
          deleted=true;
        }
        return deleted;
      }
      else{
        throw new Error("Cola vacia");
      }
    }

};

////////////////////////////////////////// IMPLEMENTACION HEAP CON LISTA POR REFERENCIAS //////////////////////////////////////////

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
}

var t = 0.05; // Parámetro modificable para comparar rendimientos. [0.04 - 0.09]
var cols = Math.floor(screen.width*t); 
var rows = Math.floor(screen.height*t);

var openSet = new MinHeap();
var closedSet = []
var start;
var end;
var w, h;
var path = [];
var grid = new Array(cols);

function Spot(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.start = false;
    this.end = false;
    this.neighbors = []
    this.previous = undefined;
    this.wall = false;

    if (random(1) < 0.2) {
        this.wall = true;
    }

    this.show = function() {
        if (this.wall) {
            fill(14, 14, 14);
            noStroke();
            ellipse(this.i*w + w/2, this.j*h + h/2, w/2, h/2);
        }
        if (this.i == 0 && this.j == 0) {
            fill(244, 0, 4);
            noStroke();
            ellipse(this.i*w + w/2, this.j*h + h/2, w, h);
        }
        else if (this.i == cols-1 && this.j == rows-1) {
            fill(142,68,173);
            noStroke();
            ellipse(this.i*w + w/2, this.j*h + h/2, w, h);
        }
    }

    this.addNeighbors = function(grid) {
        var i = this.i;
        var j = this.j;
        if (i < cols-1) {
            this.neighbors.push(grid[i+1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i-1][j]);
        }
        if (j < rows-1) {
            this.neighbors.push(grid[i][j+1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j-1]);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i-1][j-1]);
        }
        if (i < cols-1 && j > 0) {
            this.neighbors.push(grid[i+1][j-1]);
        }
        if (i > 0 && j < rows-1) {
            this.neighbors.push(grid[i-1][j+1]);
        }
        if (i < cols-1 && j < rows-1) {
            this.neighbors.push(grid[i+1][j+1]);
        }
    }
}

function setup() {
    createCanvas(screen.width*.7, screen.height*.7);

    w = width / cols;
    h = height / rows;

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols-1][rows-1];
    start.wall = false;
    end.wall = false;
    openSet.enqueue(start);
}

function draw() {
    background(255);
    if (openSet.getSize() > 0) {
        var current = openSet.peek().data;
        if (current == end) {
            noLoop();
            console.log("Camino encontrado, trazando ruta...");
            parar();
        }
        openSet.dequeue();
        closedSet.push(current);

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + 1;
                var newPath = false;

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }
                else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.enqueue(neighbor);
                }

                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    openSet.delete(neighbor);
                    openSet.enqueue(neighbor);
                    neighbor.previous = current;
                }

            }
        }
    }
    else {
        console.log("No es posible trazar una ruta.");
        noLoop();
        return;
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(244, 0, 4);
    strokeWeight(w/5);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].i*w + w/2, path[i].j*h + h/2);
    }
    endShape();
}
