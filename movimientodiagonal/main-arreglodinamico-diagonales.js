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

////////////////////////////////////////// IMPLEMENTACION OPENSET CON ARREGLO DINAMICO //////////////////////////////////////////

function OpenSetDA(){
    this.count = 0;
    this.position;
    this.capacity = 16;
    this.larray = new Array(this.capacity);

    this.isEmpty = function () {
        return this.count <= 0;
    }

    this.peek = function () {
        return this.larray[0];
    }

    this.delete = function (item) {
        var deleted = false;
        if (!this.isEmpty()) {
            if (this.includes(item)) {
                for (var i = this.position; i < this.count - 1; i++) {
                    this.larray[i] = this.larray[i + 1];
                }
                this.count--;
                deleted = true;
            }
            else {
                console.log("Cola vacia");
            }
        }
        return deleted;
    }

    this.enqueue = function (spot) {
        var inserted = false;
        if (!this.includes(spot)) {
            if (this.capacity == this.count) {
                var cap = this.capacity * 2;
                var aux = void 0;
                aux = new Array(cap);
                for (var i = 0; i < this.capacity; i++) {
                    aux[i] = this.larray[i];
                }
                this.larray = aux;
                this.capacity = cap;
            }
            for (var i = this.count; i > this.position; i--) {
                this.larray[i] = this.larray[i - 1];
            }
            this.larray[this.position] = spot;
            this.count++;
            inserted = true;
        }
        return inserted;
    }
    
    this.dequeue = function () {
        if (this.isEmpty()) {
            throw new Error("Cola vacia");
        }
        else {
            var dqelement = this.larray[0];
            for (var i = 0; i < this.count; i++) {
                this.larray[i] = this.larray[i + 1];
            }
            this.count--;
            return dqelement;
        }
    }

    this.includes = function (spot) {
        var found = false;
        var stop = false;
        this.position = 0;
        while (this.position < this.count && !stop) {
            if ((this.larray[this.position]).f >= spot.f) {
                stop = true;
                if (this.larray[this.position].i == spot.i && this.larray[this.position].j == spot.j) {
                    found = true;
                }
            }
            else {
                this.position++;
            }
        }
        return found;
    }

    this.getSize = function () {
        return this.count;
    }
}

////////////////////////////////////////// IMPLEMENTACION OPENSET CON ARREGLO DINAMICO //////////////////////////////////////////

function removeFromArray(arr, elt) {
    for (var i = arr.length-1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
}

var t = 0.05; // Parámetro modificable para comparar rendimientos. [0.04 - 0.09]
var cols = Math.floor(screen.width*t); 
var rows = Math.floor(screen.height*t);

var openSet = new OpenSetDA();
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
            fill(49, 201, 0);
            noStroke();
            ellipse(this.i*w + w/2, this.j*h + h/2, w, h);
        }
        else if (this.i == cols-1 && this.j == rows-1) {
            fill(208, 54, 54);
            noStroke();
            ellipse(this.i*w + w/2, this.j*h + h/2, w, h);
        }
    }

    // CON MOVIMIENTO DIAGONAL
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
    // CON MOVIMIENTO DIAGONAL
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
        var current = openSet.peek();
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

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(20, 20, 20);
    strokeWeight(w/6);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].i*w + w/2, path[i].j*h + h/2);
    }
    endShape();

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
}