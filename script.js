let firstOperand = "0";
let operator = "";
let secondOperand= "";
let result = "0";

const upperDisplay = document.querySelector(".upper-display");
const lowerDisplay = document.querySelector(".lower-display");

lowerDisplay.textContent = firstOperand;

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", handleButton));

window.addEventListener("keydown", handleKeyboardInput);

function clear() {
    firstOperand = "0";
    operator = "";
    secondOperand = "";
    result = "";
}

function handleKeyboardInput(e) {
    const button = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (button === null) {
        return;
    }
    button.dispatchEvent(new Event("click"));
}

function handleButton(e) {
    if (e.target.classList.contains("control")) {
        handleControlButton(e);
    }

    else if (e.target.classList.contains("operator")) {
        handleOperatorButton(e);
    }

    else if (e.target.classList.contains("equals")) {
        handleEqualsButton(e);
    }

    else if (e.target.classList.contains("dot")) {
        handleDotButton(e);
    }

    else {
        handleDigitButton(e);
    }
}

function handleDigitButton(e) {
    if (operator !== "") {
        secondOperand += e.target.textContent;
    }

    else if (firstOperand === "0") {
        firstOperand = e.target.textContent;
    }

    else {
        firstOperand += e.target.textContent;
    }

    updateDisplays();
}

function handleOperatorButton(e) {
    if (operator !== "" && secondOperand === "") {
        operator = e.target.textContent;
    }

    else if (operator === "") {
        operator = e.target.textContent;
    }

    else  {
        firstOperand = (+operate(operator, +firstOperand, +secondOperand).toFixed(6)).toString();
        if (firstOperand === "Infinity" || firstOperand === "-Infinity") {
            alert("Math Error: You can't divide by zero");
            handleClearButton();
            return;
        }
        operator = e.target.textContent;
        secondOperand = "";
    }

    updateDisplays();
}

function handleEqualsButton(e) {
    if (secondOperand === "") {
        return;
    }
    else {
        result = (+operate(operator, +firstOperand, +secondOperand).toFixed(6)).toString();
        if (result === "Infinity" || result === "-Infinity") {
            alert("Math Error: You can't divide by zero");
            handleClearButton();
            return;
        }
        updateDisplays();
        firstOperand = result;
        operator = "";
        secondOperand = "";
        result = "";
    }
}

function handleDotButton(e) {
    if (operator === "" && firstOperand.includes(".") || operator !== "" && secondOperand.includes(".")) {
        return;
    }

    else if (operator === "" && firstOperand === "") {
        firstOperand += "0.";
    }

    else if (operator == "") {
        firstOperand += ".";
    }

    else if (secondOperand === "") {
        secondOperand += "0.";
    }

    else {
        secondOperand += ".";
    }

    updateDisplays();
}

function handleControlButton(e) {
    if (e.target.textContent === "CLEAR") {
        handleClearButton(e);
    }

    else {
        handleDeleteButton(e);
    }
}

function handleClearButton(e) {
    clear();
    updateDisplays();

}

function handleDeleteButton(e) {
    if (secondOperand != "") {
        secondOperand = secondOperand.slice(0, -1);
    }

    else if (firstOperand != "" && operator === "") {
        firstOperand = firstOperand.slice(0, -1);
    }

    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
}

function updateDisplays() {
    if (result !== "") {
        upperDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} = `;
        lowerDisplay.textContent = result;
    }

    else if (operator === "") {
        upperDisplay.textContent = "";
        lowerDisplay.textContent = firstOperand;
    }

    else if (secondOperand === "") {
        upperDisplay.textContent = `${firstOperand} ${operator}`;
        lowerDisplay.textContent = firstOperand;
    }

    else {
        upperDisplay.textContent = `${firstOperand} ${operator}`;
        lowerDisplay.textContent = secondOperand;
    }
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "×":
            return multiply(firstNum, secondNum);
        case "÷":
            return divide(firstNum, secondNum);
        default:
            console.error("ERROR: INVALID OPERATOR");
    }
}

function add(firstNum, secondNum) {
    return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
    return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
    return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
    return firstNum / secondNum;
}