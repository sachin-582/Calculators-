let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.getAttribute("data-value");
        handleInput(value);
    });
});

function handleInput(value) {

    if (value === "C") {
        currentInput = "";
    }

    else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
    }

    else if (value === "=") {
        try {
            currentInput = eval(currentInput).toString();
        } catch {
            currentInput = "Error";
        }
    }

    else {

        // Prevent double operators
        if (isOperator(value) && isOperator(currentInput.slice(-1))) {
            return;
        }

        // Prevent multiple decimals in one number
        if (value === "." && currentInput.split(/[\+\-\*\/%]/).pop().includes(".")) {
            return;
        }

        currentInput += value;
    }

    display.value = currentInput;
}

function isOperator(value) {
    return ["+", "-", "*", "/", "%"].includes(value);
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
    if ((e.key >= 0 && e.key <= 9) || ["+", "-", "*", "/", "%", "."].includes(e.key)) {
        handleInput(e.key);
    }
    else if (e.key === "Enter") {
        handleInput("=");
    }
    else if (e.key === "Backspace") {
        handleInput("DEL");
    }
    else if (e.key === "Escape") {
        handleInput("C");
    }
});