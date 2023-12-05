// Listener of mouse
let mouseDown = false;
window.addEventListener("mousedown", () => {
    mouseDown = true;
});
window.addEventListener("mouseup", () => {
    mouseDown = false;
});

let rainbow = false;
let eraser = false;
let darken = false;

let toggleButtons = document.querySelectorAll(".toggle");
toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let clickedButton = this;
        console.log(this);
        switch (this.innerHTML) {
            case "Rainbow":
                if (rainbow) {
                    rainbow = false;
                    this.style.backgroundColor = "var(--idle-btn-color)";
                } else {
                    rainbow = true;
                    this.style.backgroundColor = "var(--pushed-btn-color)";
                    darken = false;
                    eraser = false;
                    toggleButtons.forEach(function (otherButton) {
                        if (otherButton != clickedButton) {
                            otherButton.style.backgroundColor =
                                "var(--idle-btn-color)";
                        }
                    });
                }
                break;
            case "Eraser":
                if (eraser) {
                    eraser = false;
                    this.style.backgroundColor = "var(--idle-btn-color)";
                } else {
                    eraser = true;
                    this.style.backgroundColor = "var(--pushed-btn-color)";
                    rainbow = false;
                    darken = false;
                    toggleButtons.forEach(function (otherButton) {
                        if (otherButton != clickedButton) {
                            otherButton.style.backgroundColor =
                                "var(--idle-btn-color)";
                        }
                    });
                }
                break;
            case "Darken":
                if (darken) {
                    darken = false;
                    this.style.backgroundColor = "var(--idle-btn-color)";
                } else {
                    darken = true;
                    this.style.backgroundColor = "var(--pushed-btn-color)";
                    rainbow = false;
                    eraser = false;
                    toggleButtons.forEach(function (otherButton) {
                        if (otherButton != clickedButton) {
                            otherButton.style.backgroundColor =
                                "var(--idle-btn-color)";
                        }
                    });
                }
                break;
            default:
                alert("Button error");
                break;
        }
        // if (this.getAttribute("data-active") === "true") {
        //     this.setAttribute("data-active", "false");
        //     this.style.backgroundColor = "var(--idle-btn-color)";
        // } else {
        //     this.setAttribute("data-active", "true");
        //     this.style.backgroundColor = "var(--pushed-btn-color)";
        //     toggleButtons.forEach(function (otherButton) {
        //         if (otherButton != clickedButton) {
        //             otherButton.setAttribute("data-active", "false");
        //             otherButton.style.backgroundColor = "var(--idle-btn-color)";
        //         }
        //     });
        // }
    });
});

// let rainbow = false;
// let rainbowButton = document.querySelector(".rainbow");
// rainbowButton.addEventListener("click", function () {
//     if (rainbow) {
//         rainbow = false;
//     } else {
//         rainbow = true;
//     }
// });

// let eraser = false;
// let eraserButton = document.querySelector(".eraser");
// eraserButton.addEventListener("click", function () {
//     if (eraser) {
//         eraser = false;
//     } else {
//         eraser = true;
//     }
// });

// let darken = false;
// let darkenButton = document.querySelector(".darken");
// darkenButton.addEventListener("click", function () {
//     if (darken) {
//         darken = false;
//     } else {
//         darken = true;
//     }
// });

let tempo = document.querySelector(".tempo");
let grid = document.querySelector(".grid");
let gridSize = 16;
createGrid(gridSize);

let colorPicker = document.querySelector(".color-picker");
colorPicker.addEventListener("input", function (event) {
    color = event.target.value;
    console.log(color);
});

let color = colorPicker.value;

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", function () {
    createGrid(gridSize);
});

let slider = document.querySelector("#size-slider");
slider.addEventListener("input", function () {
    gridSize = this.value;
    tempo.innerHTML = gridSize;
    createGrid(gridSize);
});

function changeColor(event) {
    if (mouseDown || event.type === "mousedown") {
        if (eraser) {
            this.style.backgroundColor = "rgb(255, 255, 255)";
        } else if (darken) {
            this.style.backgroundColor = darkenColor(
                this.style.backgroundColor
            );
        } else if (rainbow) {
            this.style.backgroundColor = createRandomColor();
        } else {
            this.style.backgroundColor = color;
        }
    }
}

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
            cell.style.backgroundColor = "rgb(255, 255, 255)";
            cell.addEventListener("mousedown", changeColor);
            cell.addEventListener("mouseenter", changeColor);
            line.appendChild(cell);
        }
        grid.appendChild(line);
    }
}

function createRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function darkenColor(rgbValue) {
    let rgbArray = rgbValue.match(/\d+/g).map(Number);
    for (let i = 0; i < rgbArray.length; i++) {
        rgbArray[i] = Math.floor(rgbArray[i] * 0.9);
    }
    return `rgb(${rgbArray.join(", ")})`;
}
