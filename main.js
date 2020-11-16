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

var t = 0.06; // Parámetro modificable para comparar rendimientos. [0.03 - 0.06]
var cols = Math.floor(screen.width*t); 
var rows = Math.floor(screen.height*t);

var openSet = []
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

    if (random(1) < 7*t) {
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
            console.log("Pintando inicio...")
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

    openSet.push(start); // Cambio
}

function draw() {
    background(255);
    if (openSet.length > 0) {
        var lowestIndex = 0;
        for (var i = 0; i < openSet.length; i++) { // Cambiar este loop
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }

        }
        var current = openSet[lowestIndex]; // Cambio

        if (current == end) {
            noLoop();
            console.log("Camino encontrado, trazando ruta...");
        }

        removeFromArray(openSet, current); // Cambio
        closedSet.push(current); // Cambio

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (!closedSet.includes(neighbor) && !neighbor.wall) { //  Cambio
                var tempG = current.g + 1;

                var newPath = false;

                if (openSet.includes(neighbor)) { //  Cambio
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }
                else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor); // Cambio
                }

                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
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

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(22, 143, 0);
    strokeWeight(w/5);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].i*w + w/2, path[i].j*h + h/2);
    }
    endShape();
}