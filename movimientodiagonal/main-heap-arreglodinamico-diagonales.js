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

function MinHeap(){
    this.heap=[];
    this.size=0;
    this.position;

    this.includes = function(node){
      var found=false;
      for(var idx=0;idx<this.heap.length;idx++){
        if(node.i==this.heap[idx].i && node.j==this.heap[idx].j){
          this.position=idx;
          found=true;
          break;
        }
      }
      return found;
    }

    this.getSize = function(){
      return this.size;
    }

    this.peek = function(){
      return this.heap[0];
    }

    this.isEmpty = function(){
      return this.size<=0;
    }

    this.moveup=function(index){
      var parentIdx=Math.floor((index-1)/2);
      var temp=this.heap[index];
      this.heap[index]=this.heap[parentIdx];
      this.heap[parentIdx]=temp;
      this.position=parentIdx;
    }

    this.movedown=function(index){
      if (this.heap[Math.floor(2*index+1)].f < this.heap[Math.floor(2*index+2)].f){
        var childIdx=Math.floor(2*index+1);
      }
      else{
        var childIdx=Math.floor(2*index+2);
      }
      var temp=this.heap[index];
      this.heap[index]=this.heap[childIdx];
      this.heap[childIdx]=temp;
      this.position=childIdx;
    }

    this.enqueue = function(item){
      var inserted = false;
      this.heap.push(item);
      if (this.isEmpty()){
        inserted=true;
      }
      else{
        this.position=this.size;
        while (this.position>0 && item.f < this.heap[Math.floor((this.position-1)/2)].f){
          this.moveup(this.position);
        }
      }
      this.size++;
      return inserted;
    }

    this.dequeue = function(){
      if (!this.isEmpty()){
        var temp=this.heap[0];
        this.heap[0]=this.heap[this.size-1];
        this.heap[this.size-1]=temp;
        dqelement=this.heap.pop();
        this.size--;
        this.position=0;
        while ((this.position*2)+2<this.size && (this.heap[this.position].f > this.heap[Math.floor((this.position*2)+1)].f || this.heap[this.position].f > this.heap[Math.floor((this.position*2)+2)].f)){
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
        var deleted=false;
        if (this.includes(item)){
          var temp=this.heap[this.position];
          this.heap[this.position]=this.heap[this.size-1];
          this.heap[this.size-1]=temp;
          this.heap.pop();
          this.size--;
          while ((this.position*2)+2<this.size && (this.heap[this.position].f > this.heap[Math.floor((this.position*2)+1)].f || this.heap[this.position].f > this.heap[Math.floor((this.position*2)+2)].f)){
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
}

////////////////////////////////////////// IMPLEMENTACION HEAP CON LISTA POR REFERENCIAS //////////////////////////////////////////

function heuristic(a, b) {
    var d = abs(a.i - b.i) + abs(a.j - b.j);
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