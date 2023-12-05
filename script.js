let mouseDown = false;
window.addEventListener("mousedown", () => {mouseDown = true;})
window.addEventListener("mouseup", () => {mouseDown = false;})

let grid = document.querySelector(".grid");
let gridSize = 16;
createGrid(gridSize);

let tempo = document.querySelector(".tempo");

let colorPicker = document.querySelector(".color-picker");
colorPicker.addEventListener("input", function(event) {
    color = event.target.value;
    console.log(color);
});
let color = colorPicker.value;

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", function () {
    createGrid(gridSize);
});

let slider = document.querySelector("#size-slider");
slider.addEventListener("input", function() {
    gridSize = this.value;
    tempo.innerHTML = gridSize;
    createGrid(gridSize);
});

function createGrid(gridSize) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    for (let i = 0; i < gridSize; i++) {
        let line = document.createElement("div");
        line.className = "line";
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.addEventListener("mouseenter", function() {
                if (mouseDown) {
                    this.style.backgroundColor = color;
                }
            })
            cell.addEventListener("mousedown", function() {
                this.style.backgroundColor = color;
            })
            line.appendChild(cell);
        }
        grid.appendChild(line);
    }
}