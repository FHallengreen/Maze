const cellSize = "50px"
/**
 * Display the maze on the web page
 * Loop through the maze data and create a div element for each cell
 * Set the div's border based on the cell's walls
 * 
 * @param {*} mazeData 
 */
function displayMaze(mazeData) {
    const gridContainer = document.getElementById('grid');
    gridContainer.style.gridTemplateColumns = `repeat(${mazeData.cols}, ${cellSize})`;

    mazeData.maze.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.id = `cell-${rowIndex}-${colIndex}`;
            cellElement.style.width = cellSize;
            cellElement.style.height = cellSize;
            cellElement.style.borderTop = cell.north ? '1px solid black' : 'none';
            cellElement.style.borderRight = cell.east ? '1px solid black' : 'none';
            cellElement.style.borderBottom = cell.south ? '1px solid black' : 'none';
            cellElement.style.borderLeft = cell.west ? '1px solid black' : 'none';

            gridContainer.appendChild(cellElement);
        });
    });
}

export { displayMaze };