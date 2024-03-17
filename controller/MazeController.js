import { fetchMaze, solveMaze, mazeData, generateMaze } from '../model/MazeModel.js';
import { displayMaze, mazeDataGenerated } from '../view/MazeView.js';

document.getElementById("new-maze").addEventListener("click", async () => {
   await generateMaze(mazeDataGenerated);

    document.getElementById("new-solve").style.display = "block";
    document.getElementById("solve").style.display = "none";
    document.getElementById("new-maze").disabled = true;
});

document.getElementById("reset").addEventListener("click", async () => {
    window.location.reload();
});

document.getElementById("new-solve").addEventListener("click", async () => {
    if (mazeDataGenerated) {
        let startCell = mazeDataGenerated.maze[0][0]; // Start cell
        let goalCell = mazeDataGenerated.maze[mazeDataGenerated.rows - 1][mazeDataGenerated.cols - 1]; // Goal cell

        function resetVisitedFlags(maze) {
            for (let row of maze) {
                for (let cell of row) {
                    cell.visited = false;
                }
            }
        }
        document.getElementById("solve").disabled = true;
        
        document.getElementById("new-solve").disabled = true;
        resetVisitedFlags(mazeDataGenerated.maze);
        await solveMaze(mazeDataGenerated.maze, startCell, goalCell);

        document.getElementById("reset").style.display = "block";

  
    } else {
        console.error("Maze data is not loaded yet.");
    }
});




document.getElementById("solve").addEventListener("click", async () => {
    await fetchMaze().then(mazeData => {
        if (mazeData) {
            displayMaze(mazeData);
        }
    });
    if (mazeData) {
        document.getElementById("solve").disabled = true;
        await solveMaze(mazeData.maze, mazeData.start, mazeData.goal);
        document.getElementById("reset").style.display = "block";
    } else {
        console.error("Maze data is not loaded yet.");
    }
});

