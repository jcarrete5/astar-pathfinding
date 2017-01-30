var gridSize; // Num of rows and cols
var cellSize; // Size in 'px' of each cell
var wallPct; // Percentage of walls
var grid;
var path;

function setup() {
    var appWrapper = document.getElementById('app-wrapper');
    appWrapper.style.height = appWrapper.offsetWidth + 'px';
    var cnv = createCanvas(appWrapper.offsetHeight, appWrapper.offsetHeight);
    cnv.parent('app-wrapper');
    
    reRun();
}

function draw() {
    background(255);
    
    for(var r = 0; r < gridSize; r++) {
        for(var c = 0; c < gridSize; c++) {
            grid[r][c].render();
        }
    }
    
    path.update();
    path.render();
}

function reRun() {
    grid = [];
    gridSize = document.getElementById('gridSize').value;
    if(gridSize < 10) {
        alert("Grid size must be at least 10!");
        return;
    }
    wallPct = document.getElementById('wallPct').value / 100;
    cellSize = floor(width / gridSize);
    
    // Setup grid
    for(var r = 0; r < gridSize; r++) {
        grid[r] = [];
        for(var c = 0; c < gridSize; c++) {
            grid[r][c] = new Cell(r, c);
        }
    }
    
    path = new ASTAR_Path(grid[0][0], grid[gridSize-1][gridSize-1]);
    path.start.wall = false;
    path.goal.wall = false;
}