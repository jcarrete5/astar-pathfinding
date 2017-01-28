function Cell(row, col) {
    this.row = row;
    this.col = col;
    this.wall = false;
    
    this.render = function() {
        strokeWeight(1);
        stroke(0);
        if(this.wall) {
            fill(0);
        } else {
            noFill();
        }
        rect(col * cellSize, row * cellSize, cellSize-1, cellSize-1);
    };
}
