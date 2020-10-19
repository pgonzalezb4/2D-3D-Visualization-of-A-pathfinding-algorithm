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

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
}

var t = 0.06; // Parámetro modificable para comparar rendimientos. [0.04 - 0.09]
var cols = Math.floor(screen.width*t); 
var rows = Math.floor(screen.height*t);

var openSet = new OpenSetLL();
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
var grid = new Array(cols);

function NodeGeneric(spot) {
    this.data = spot;
    this.next = null;
}

///////////////////////////////////////////////// OPENSET CON LISTA POR REFERENCIAS /////////////////////////////////////////////////

function OpenSetLL() {
    this.head = null;

    this.enqueue = function(spot) {
        let curr = this.head;
        let prev = null;
        while (curr != null && curr.data.f < spot.f) {
            prev = curr;
            curr = curr.next;
        }

        if (curr == null || curr.data.f != spot.f) {
            let newNode = new NodeGeneric(spot);
            newNode.next = curr;
            if (prev == null) {
                this.head = newNode;
            }
            else {
                prev.next = newNode;
            }
        }
    }

    this.dequeue = function() {
        if (this.head == null) {
            throw new Error("Cola vacia");
        }
        let temp = this.head;
        this.head = this.head.next;
        return temp;
    }

    this.peek = function() {
        return this.head;
    }

    this.getSize = function() {
        if (this.head == null) {
            return 0;
        }
        let count = 1;
        let temp = this.head;
        while (temp.next != null) {
            count += 1;
            temp = temp.next;
        }
        return count;
    }

    this.includes = function(spot) {
        if (this.head == null) {
            return false;
        }
        if (this.head.data.f == spot.f) {
            return true;
        }
        let temp = this.head;
        while (temp.next != null) {
            if (temp.next.data.f == spot.f) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    this.delete = function(spot) {
        let curr = this.head;
        let prev = null;
        if (curr != null && curr.data.f == spot.f) {
            this.head = curr.next;
            return;
        }
        while (curr != null && curr.data.f != spot.f) {
            prev = curr;
            curr = curr.next;
            return;
        }
        if (curr == null) {
            return true;
        }
        prev.next = curr.next;
    }

    this.isEmpty = function() {
        return this.head == null;
    }
}

///////////////////////////////////////////////// OPENSET CON LISTA POR REFERENCIAS /////////////////////////////////////////////////

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

    if (random(1) < 6*t) { // Cuando los obstaculos NO dependen de t: "if (random(1) < 0.2)", caso contrario: "if (random(1) < 6*t)"
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
