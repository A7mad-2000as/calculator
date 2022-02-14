let currentExpression = new Expression();

const upperDisplay = document.querySelector(".upper-display");
const lowerDisplay = document.querySelector(".lower-display");

lowerDisplay.textContent = currentExpression.firstOperand;

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", handleButton));

function Expression() {
    this.firstOperand = "0";
    this.operator = "";
    this.secondOperand = "";
    this.result = "";
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
    if (currentExpression.operator !== "") {
        currentExpression.secondOperand += e.target.textContent;
    }

    else if (currentExpression.firstOperand === "0") {
        currentExpression.firstOperand = e.target.textContent;
    }

    else {
        currentExpression.firstOperand += e.target.textContent;
    }

    updateDisplays();
}

function handleOperatorButton(e) {
    if (currentExpression.operator !== "" && currentExpression.secondOperand === "") {
        return;
    }

    else if (currentExpression.operator === "") {
        currentExpression.operator = e.target.textContent;
    }

    else  {
        currentExpression.firstOperand = (+operate(currentExpression.operator, +currentExpression.firstOperand, +currentExpression.secondOperand).toFixed(6)).toString();
        if (currentExpression.firstOperand === "Infinity" || currentExpression.firstOperand === "-Infinity") {
            alert("Math Error: You can't divide by zero");
            handleClearButton();
            return;
        }
        currentExpression.operator = e.target.textContent;
        currentExpression.secondOperand = "";
    }

    updateDisplays();
}

function handleEqualsButton(e) {
    if (currentExpression.secondOperand === "") {
        return;
    }
    else {
        currentExpression.result = (+operate(currentExpression.operator, +currentExpression.firstOperand, +currentExpression.secondOperand).toFixed(6)).toString();
        if (currentExpression.result === "Infinity" || currentExpression.result === "-Infinity") {
            alert("Math Error: You can't divide by zero");
            handleClearButton();
            return;
        }
        updateDisplays();
        currentExpression.firstOperand = currentExpression.result;
        currentExpression.operator = "";
        currentExpression.secondOperand = "";
        currentExpression.result = "";
    }
}

function handleDotButton(e) {
    if (currentExpression.operator === "" && currentExpression.firstOperand.includes(".") || currentExpression.operator !== "" && currentExpression.secondOperand.includes(".")) {
        return;
    }

    else if (currentExpression.operator === "" && currentExpression.firstOperand === "") {
        currentExpression.firstOperand += "0.";
    }

    else if (currentExpression.operator == "") {
        currentExpression.firstOperand += ".";
    }

    else if (currentExpression.secondOperand === "") {
        currentExpression.secondOperand += "0.";
    }

    else {
        currentExpression.secondOperand += ".";
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
    currentExpression = new Expression();
    updateDisplays();

}

function handleDeleteButton(e) {
    if (currentExpression.secondOperand != "") {
        currentExpression.secondOperand = currentExpression.secondOperand.slice(0, -1);
    }

    else if (currentExpression.firstOperand != "" && currentExpression.operator === "") {
        currentExpression.firstOperand = currentExpression.firstOperand.slice(0, -1);
    }

    lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
}

function updateDisplays() {
    if (currentExpression.result !== "") {
        upperDisplay.textContent = `${currentExpression.firstOperand} ${currentExpression.operator} ${currentExpression.secondOperand} = `;
        lowerDisplay.textContent = currentExpression.result;
    }

    else if (currentExpression.operator === "") {
        upperDisplay.textContent = "";
        lowerDisplay.textContent = currentExpression.firstOperand;
    }

    else if (currentExpression.secondOperand === "") {
        upperDisplay.textContent = `${currentExpression.firstOperand} ${currentExpression.operator}`;
        lowerDisplay.textContent = currentExpression.firstOperand;
    }

    else {
        upperDisplay.textContent = `${currentExpression.firstOperand} ${currentExpression.operator}`;
        lowerDisplay.textContent = currentExpression.secondOperand;
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