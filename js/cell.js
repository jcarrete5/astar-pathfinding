function Cell(row, col) {
    this.row = row;
    this.col = col;
    this.wall = false;
    if(random() < 0.33) {
        this.wall = true;
    }
    
    this.render = function() {
        strokeWeight(1);
        stroke(0);
        if(this.wall) {
            fill(0);
        } else {
            noFill();
        }
        rect(col * cellSize, row * cellSize, cellSize, cellSize);
    };
    
    this.id = function() {
        return this.row * gridSize + this.col;
    }
}
