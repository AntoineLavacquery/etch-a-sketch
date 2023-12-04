
let grid = document.querySelector(".grid");

const GRID_SIZE = 16;

for (let i = 0; i < GRID_SIZE; i++) {
    let line = document.createElement("div");
    line.className = "line";
    for (let j = 0; j < GRID_SIZE; j++) {
        let cell = document.createElement("div");
        cell.className = "cell"
        cell.innerText = `${i}${j}`;
        line.appendChild(cell);
    }
    grid.appendChild(line);
}