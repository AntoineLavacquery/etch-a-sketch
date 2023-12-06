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

// Retrieving elements

let toggleButtons = document.querySelectorAll(".toggle");
let tempo = document.querySelector(".tempo");
let grid = document.querySelector(".grid");
let colorPicker = document.querySelector(".color-picker");
let color = colorPicker.value;
let clearButton = document.querySelector(".clear");
let slider = document.querySelector("#size-slider");

// Functions

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
    console.log(rgbValue);
    let rgbArray = rgbValue.match(/\d+/g).map(Number);
    for (let i = 0; i < rgbArray.length; i++) {
        rgbArray[i] = Math.floor(rgbArray[i] * 0.9);
    }
    return `rgb(${rgbArray.join(", ")})`;
}

function updateButtonState({button, backgroundColor, fontColor}) {
    console.log(button.style.color);
    button.style.backgroundColor = backgroundColor;
    button.style.color = fontColor;
    toggleButtons.forEach(function (otherButton) {
        if (otherButton != button) {
            otherButton.style.backgroundColor = "var(--background-color)";
            otherButton.style.color = "var(--font-color)";
            console.log(button.style.color);
        }
    });
}

let gridSize = 16;
createGrid(gridSize);

toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let clickedButton = this;
        let activateArgs = {
            button: clickedButton,
            backgroundColor: "var(--font-color)",
            fontColor: "var(--background-color)"
        };
        let desactivateArgs = {
            button: clickedButton,
            backgroundColor: "var(--background-color)",
            fontColor: "var(--font-color)"
        };
        switch (this.id) {
            case "rainbow":
                if (rainbow) {
                    updateButtonState(desactivateArgs);
                    rainbow = false;
                } else {
                    updateButtonState(activateArgs);
                    rainbow = true;
                    darken = false;
                    eraser = false;
                }
                break;
            case "eraser":
                if (eraser) {
                    updateButtonState(desactivateArgs);
                    eraser = false;
                } else {
                    updateButtonState(activateArgs);
                    eraser = true;
                    rainbow = false;
                    darken = false;
                }
                break;
            case "darken":
                if (darken) {
                    updateButtonState(desactivateArgs);
                    darken = false;
                } else {
                    updateButtonState(activateArgs);
                    darken = true;
                    rainbow = false;
                    eraser = false;
                }
                break;
            default:
                alert("Button error");
                break;
        }
    });
});

colorPicker.addEventListener("input", function (event) {
    color = event.target.value;
});

clearButton.addEventListener("click", function () {
    createGrid(gridSize);
});

slider.addEventListener("input", function () {
    gridSize = this.value;
    // tempo.innerHTML = gridSize;
    createGrid(gridSize);
});