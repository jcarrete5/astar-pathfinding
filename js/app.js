var gridSize = 10; //num of rows and cols
var cellSize; //size in 'px' of each cell
var grid = [];

function setup() {
    var appWrapper = document.getElementById('app-wrapper');
    appWrapper.style.height = appWrapper.offsetWidth + 'px';
    var cnv = createCanvas(appWrapper.offsetHeight, appWrapper.offsetHeight);
    cnv.parent('app-wrapper');
    
    cellSize = floor(width / gridSize);
    
    // Setup grid
    for(var r = 0; r < gridSize; r++) {
        grid[r] = [];
        for(var c = 0; c < gridSize; c++) {
            grid[r][c] = new Cell(r, c);
        }
    }
}

function draw() {
    background(255);
    
    for(var r = 0; r < gridSize; r++) {
        for(var c = 0; c < gridSize; c++) {
            grid[r][c].render();
        }
    }
}
