import { Stack } from "../Stack.js";

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

export { fetchMaze, solveMaze, mazeData };