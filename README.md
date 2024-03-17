# Maze Solver Project

## Live Demonstration
You can see the maze generator and solver in action at the following link: [Maze Generator/Solver Demo](https://maze.fhallengreen.com/). Please note, the demonstration uses a predefined maze structure, and users do not have the option to upload custom maze configurations.

## Generator

### Algorithm
The maze generator is based on **Prim's Algorithm**, which is a minimum spanning tree algorithm that can also be applied to maze generation. Prim's Algorithm starts with a grid full of walls and a single initial cell. It then iteratively adds one of the neighboring cells to the growing maze by knocking down the wall between it and the maze. The selection of neighboring cells is randomized, which ensures the uniqueness and complexity of the generated maze.

### Resources
The implementation of Prim's Algorithm for maze generation was inspired by following websites:
- [Wikipedia: Prim's Algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm)
- [Maze Generation: Prim's Algorithm](http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm)

## Solver

### Algorithm
The maze-solving functionality employs the **Depth-First Search (DFS) with backtracking** algorithm. This method explores possible paths from the start point deeply into the maze, backtracking upon reaching dead ends or cells that have already been visited.

### Implementation Details
- **Recursion and Stack**: The solver's core is a recursive function `visitCell`, which explores the maze. A Stack data structure tracks the current path, pushing cells onto the stack as they're visited and popping them during backtracking.
  
- **Route Calculation**: The solver computes the route in one continuous process, animated to visually represent the exploration of the maze, including its dead ends and backtracks.

- **Backtracking Visualization**: Backtracking is visually represented, differentiating between cells that are part of the solution path and those that were visited but ultimately not included in the final route.

- **Animation**: The maze-solving process is animated, providing a visual insight into how the algorithm navigates and solves the maze.

### Additional Information
The solver's animation offers a step-by-step visual guide to the algorithm's decision-making process, highlighting the exploration and backtracking phases, which can be particularly educational for those interested in maze-solving algorithms.
Also the console log describes each step of the solving algorithm, which can be helpful for understanding the process in more detail.
