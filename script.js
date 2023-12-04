let mouseDown = false;
window.addEventListener("mousedown", () => {mouseDown = true;})
window.addEventListener("mouseup", () => {mouseDown = false;})

let grid = document.querySelector(".grid");
const GRID_SIZE = 16;

for (let i = 0; i < GRID_SIZE; i++) {
    let line = document.createElement("div");
    line.className = "line";
    for (let j = 0; j < GRID_SIZE; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.addEventListener("mouseenter", function() {
            if (mouseDown) {
                this.style.backgroundColor = "red";
            }
        })
        cell.addEventListener("mousedown", function() {
            this.style.backgroundColor = "black";
        })
        line.appendChild(cell);
    }
    grid.appendChild(line);
}