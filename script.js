
let grid = document.querySelector(".grid");

const GRID_SIZE = 16;

for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
        let cell = document.createElement("div");
        cell.innerText = `${i}${j}`;
        grid.appendChild(cell);
    }
}