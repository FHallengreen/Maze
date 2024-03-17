import { fetchMaze, solveMaze, mazeData } from '../model/SolverModel.js';
import { displayMaze } from '../view/SolverView.js';

document.getElementById("solve").addEventListener("click", async () => {
    if (mazeData) {
        await solveMaze(mazeData.maze, mazeData.start, mazeData.goal);
    } else {
        console.error("Maze data is not loaded yet.");
    }
});

fetchMaze().then(mazeData => {
    if (mazeData) {
        displayMaze(mazeData);
    }
});