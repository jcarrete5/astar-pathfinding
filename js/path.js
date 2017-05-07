function ASTAR_Path(start, goal) {
    function distance(c1, c2) {
        return sqrt(sq(c1.col - c2.col) + sq(c1.row - c2.row));
    }

    function heuristic(c1, c2) {
        return sqrt(sq(c1.col - c2.col) + sq(c1.row - c2.row));
    };

    this.foundPath = false;
    this.noPath = false;
    this.start = start;
    this.goal = goal;
    this.gScore = {}; // The cost of getting from the start node to each node
    this.fScore = {}; // gScore + hScore
    this.openSet = new Heap(function(child, parent) { // Closest child is always root
        return path.fScore[parent.id()] - path.fScore[child.id()];
    });
    this.openSet.insert(start);
    this.closedSet = {};
    this.cameFrom = {};
    this.current = null; // Current cell being evaluated

    var _size = sq(gridSize);
    while(_size--) {
        this.gScore[_size] = Infinity;
        this.fScore[_size] = Infinity;
    }

    this.gScore[this.start.id()] = 0;
    this.fScore[this.start.id()] = heuristic(this.start, this.goal);
    this.neighborOffset = [ [0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1] ];

    this.update = function() {
        if(this.foundPath || this.noPath) return;

        if(this.openSet.size() > 1) {
            this.current = this.openSet.extract();
            if(this.current.id() === this.goal.id()) {
                //Found path
                this.foundPath = true;
                return;
            }

            this.closedSet[this.current.id()] = this.current;
            this.current['open'] = false;
            for(var i = 0; i < 8; i++) {
                var row = this.neighborOffset[i][0] + this.current.row;
                var col = this.neighborOffset[i][1] + this.current.col;
                // var row = (i + 1) % 2 + this.current.row;
                // var col = (i % 2) + this.current.col;
                if(row < 0 || col < 0 || row >= gridSize || col >= gridSize) continue;
                var neighbor = grid[row][col];
                if(this.closedSet[neighbor.id()] !== undefined) continue;
                if(neighbor.wall === true) continue;

                var tentative_gScore = this.gScore[this.current.id()] + distance(this.current, neighbor);
                if(neighbor['open'] === undefined) {
                    neighbor['open'] = true;
                    this.openSet.insert(neighbor);
                } else if(neighbor['open'] === true && tentative_gScore >= this.gScore[neighbor.id()]) {
                    // Not a better path
                    continue;
                }

                this.cameFrom[neighbor.id()] = this.current;
                this.gScore[neighbor.id()] = tentative_gScore;
                this.fScore[neighbor.id()] = this.gScore[neighbor.id()] + heuristic(neighbor, this.goal);
            }
        } else {
            this.noPath = true;
        }
    };

    this.render = function() {
        // Render open set as Green
        for(var i = 1; i < this.openSet.size(); i++) {
            noStroke();
            fill('rgba(0, 255, 42, 0.25)');
            var cell = this.openSet.getData()[i];
            rect(cell.col * cellSize + 1, cell.row * cellSize + 1, cellSize - 1, cellSize - 1);
        }

        // Render closed set as Red
        for(var id in this.closedSet) {
            noStroke();
            fill('rgba(255, 0, 12, 0.25)');
            var cell = this.closedSet[id];
            rect(cell.col * cellSize + 1, cell.row * cellSize + 1, cellSize - 1, cellSize - 1);
        }

        // Render current best path
        noStroke();
        fill('blue');
        if(this.noPath) fill('red');
        if(this.foundPath) fill('purple');
        var curCell = this.current;
        rect(this.start.col * cellSize + 1, this.start.row * cellSize + 1, cellSize - 1, cellSize - 1);
        while(curCell.id() !== this.start.id()) {
            rect(curCell.col * cellSize + 1, curCell.row * cellSize + 1, cellSize - 1, cellSize - 1);
            curCell = this.cameFrom[curCell.id()];
        }
    };
}
