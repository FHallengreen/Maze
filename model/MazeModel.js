import { Stack } from "../Stack.js";
import { displayMaze } from '../view/MazeView.js';

/////// SOLVE MAZE ///////

let mazeData;

/**
 * Load the maze data from the maze.json file
 * Display the maze on the web page
 */
function fetchMaze() {
    return fetch('maze.json')
        .then(response => response.json())
        .then(data => {
            mazeData = data;
            return mazeData;
        })
        .catch(error => console.error('Error loading maze:', error));
}

/**
 * Solve the maze
 * @param {*} maze - the maze data
 * @param {*} start - the start cell
 * @param {*} goal - the goal cell
 */
async function solveMaze(maze, start, goal) {
    const route = new Stack();
    await visitCell(maze, maze[start.row][start.col], route, goal);
}

let stepCounter = 0;

/**
 * Visit a cell in the maze
 * Mark the cell as visited
 * Add the cell to the route
 * If the cell is the goal, return true
 * If the cell is not the goal, visit its neighbors
 * If the neighbors do not lead to the goal, backtrack
 * Algorithm is depth-first search (DFS)
 * @param {*} maze 
 * @param {*} cell 
 * @param {*} route 
 * @param {*} goal 
 * @returns true if the goal is reached, false otherwise
 */
async function visitCell(maze, cell, route, goal) {
    cell.visited = true;

    const cellElement = document.getElementById(`cell-${cell.row}-${cell.col}`);

    route.push(cell);

    console.log(`Visiting cell at row: ${cell.row}, col: ${cell.col}`);

    if (cell.row === goal.row && cell.col === goal.col) {
        console.log("Goal reached!");
        cellElement.style.backgroundColor = 'yellow';
        return true;
    }

    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    for (let [dRow, dCol] of directions) {
        const newRow = cell.row + dRow;
        const newCol = cell.col + dCol;

        if (newRow >= 0 && newRow < maze.length && newCol >= 0 && newCol < maze[0].length && maze[newRow][newCol]
            && !maze[newRow][newCol].visited && moveWithinWalls(cell, maze[newRow][newCol])) {
            if (cellElement) {
                cellElement.style.backgroundColor = '#add8e6';
            }
            await new Promise(resolve => setTimeout(resolve, 50));

            if (await visitCell(maze, maze[newRow][newCol], route, goal)) {

                return true;
            }
        }
        console.log(`Current cell walls: North: ${cell.north}, East: ${cell.east}, South: ${cell.south}, West: ${cell.west}`);
        console.log(`${stepCounter} newRow: ${newRow}, newCol: ${newCol}`)
        stepCounter++;

    }

    if (cellElement) {
        cellElement.style.backgroundColor = '';
    }
    route.pop();
    console.log("Backtracking from", cell.row, cell.col);
    return false;
}

/**
 * Check if the move is within the walls of the maze
 * @param {*} fromCell 
 * @param {*} toCell 
 * @returns true if the move is within the walls of the maze, false otherwise
 */
function moveWithinWalls(fromCell, toCell) {
    if (fromCell.row < toCell.row) {
        return !fromCell.south && !toCell.north;
    } else if (fromCell.row > toCell.row) {
        return !fromCell.north && !toCell.south;
    } else if (fromCell.col < toCell.col) {
        return !fromCell.east && !toCell.west;
    } else if (fromCell.col > toCell.col) {
        return !fromCell.west && !toCell.east;
    }
    return false;
}


///// GENERATE MAZE //////


/**
 *  Generating a maze using Prim's algorithm
 * @param {*} grid - the maze grid
 */
function primsAlgorithm(grid) {
    let startCell = grid[5][8];
    startCell.visited = true;

    let walls = getCellWalls(grid, startCell);

    while (walls.length > 0) {
        let randomIndex = Math.floor(Math.random() * walls.length);
        let wall = walls[randomIndex];
        walls.splice(randomIndex, 1);

        let cell1 = grid[wall.cell1.row][wall.cell1.col];
        let cell2 = grid[wall.cell2.row][wall.cell2.col];

        if (cell1.visited !== cell2.visited) {
            removeWall(cell1, cell2);
            let nextCell = cell1.visited ? cell2 : cell1;
            nextCell.visited = true;

            walls = walls.concat(getCellWalls(grid, nextCell));
        }
    }
}

/**
 *  Get the walls of a cell
 * @param {*} grid - the maze grid
 * @param {*} cell - the cell
 * @returns 
 */
function getCellWalls(grid, cell) {
    let walls = [];
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // Left, Down, Right, Up

    for (let [dRow, dCol] of directions) {
        let newRow = cell.row + dRow;
        let newCol = cell.col + dCol;

        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[newRow].length) {
            let neighbor = grid[newRow][newCol];
            walls.push({
                cell1: cell,
                cell2: neighbor
            });
        }
    }

    return walls;
}

/**
 * Remove the wall between two cells

 * @param {*} cell1  - the first cell
 * @param {*} cell2  - the second cell
 */
function removeWall(cell1, cell2) {
    let x = cell1.col - cell2.col;
    let y = cell1.row - cell2.row;

    if (x === 1) {
        cell1.west = false;
        cell2.east = false;
    } else if (x === -1) {
        cell1.east = false;
        cell2.west = false;
    }

    if (y === 1) {
        cell1.north = false;
        cell2.south = false;
    } else if (y === -1) {
        cell1.south = false;
        cell2.north = false;
    }
}


/**
 * Generate a new maze
 * @param {*} grid 
 */
function generateMaze(grid) {
    primsAlgorithm(grid.maze);
    displayMaze(grid);
}

export { fetchMaze, solveMaze, mazeData, generateMaze };