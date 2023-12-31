let first_operand = 0;
let second_operand = undefined;
let operator = "";
let state = true;
let decimalState = false;
let decimalPower = 1;
let mem = 0;
let newResultState = false;
let sqrtState = false;
let factorialState = false;

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const dotButton = document.querySelector(".dot");
const clearButton = document.querySelector(".delete");
const addMem = document.querySelector(".Mplus");
const subMem = document.querySelector(".Mminus");
const clearMem = document.querySelector(".MRC");
const factorialButton = document.querySelector(".factorial");
const sqrtButton = document.querySelector(".sqrt");

function factorial(n) {
    if (n - Math.floor(n) !== 0) {
        return "ERROR";
    } else {
        return (n === 0 || n === 1) ? n : n * factorial(n - 1);
    }
}
  
function apply_operator(first_operand, second_operand, operator) {
    if (operator === "+") {
        return first_operand + second_operand;
    } else if (operator === "-") {
        return first_operand - second_operand;
    } else if (operator === "x") {
        return first_operand * second_operand;
    } else if (operator === "%") {
        return first_operand % second_operand;
    } else if (sqrtState) {
        return Math.sqrt(first_operand);
    } else if (factorialState) { //factorialState
        return factorial(first_operand);
    } else {
        return second_operand !== 0 ? (first_operand / second_operand): "ERROR";
    }
}

function displayNums() {
    if (sqrtState) {
        display.innerHTML = '&#8730;' + "(" + first_operand + ")";
    } else if (factorialState) {
        display.textContent = "(" + first_operand + ")!";
    } else if (operator === "") {
        display.textContent = first_operand;
    } else if (second_operand === undefined) {
        display.textContent = first_operand + operator;
    } else {
        display.textContent = first_operand + operator + second_operand;
    }
}

function evalNum(e) {
    const num = parseInt(e.target.textContent, 10);
    if (state === true) {
        if (newResultState) {
            first_operand = 0;
            newResultState = false;
        }
        if (!decimalState) {
            first_operand = first_operand * 10 + num
        } else {
            first_operand = first_operand + num / Math.pow(10, decimalPower);
            decimalPower++;
        }
    } else {
        if (!decimalState) {
            second_operand = second_operand !== undefined ? second_operand * 10 + num : num;
        } else {
            second_operand = second_operand !== undefined ? second_operand + num / Math.pow(10, decimalPower): num;
            decimalPower++;
        }
    }
    displayNums();
}

function evalOp(e) {
    if (sqrtState || factorialState || first_operand === "ERROR") {
        
    } else if (state && operator === "") {
        operator = e.target.textContent;
        state = false;
        resetDecimal();
        displayNums();
        newResultState = false;
    } else {

    }
}

function decimal(e) {
    if (!decimalState) {
        decimalState = true; 
    }
}

function resetDecimal() {
    decimalState = false;
    decimalPower = 1;
}

function equal(e) {
    if (operator === "" && !sqrtState && !factorialState) {
        displayNums();
        resetDecimal();
        newResultState = true;
    } else if (second_operand === undefined && !sqrtState && !factorialState) {
    } else {
        let result = apply_operator(first_operand, second_operand, operator).toString();
        first_operand = result === "ERROR" ? result: result.length >= 14 ? parseFloat(result.substr(0, 14)) : parseFloat(result); 
        operator = "";
        second_operand = undefined;
        sqrtState = false;
        factorialState = false;
        displayNums();
        state = true;
        resetDecimal();
        newResultState = true;        
    }
}

function clear(e) {
    first_operand = 0;
    second_operand = undefined;
    operator = "";
    state = true;
    sqrtState = false;
    resetDecimal();
    displayNums();
}

function memAdd(e) {
    if (newResultState) {
        mem += first_operand;
        first_operand = mem;
        displayNums();
    }
}
function memSub(e) {
    if (newResultState) {
        mem -= first_operand;
        first_operand = mem;
        displayNums();
    }
}

function memClear(e) {
    mem = 0;
    first_operand = mem;
}

function sqrt() {
    sqrtState = true; 
    displayNums(); 
}

function fact() {
    factorialState = true;
    displayNums();
}

numButtons.forEach(button => {
    button.addEventListener('click', evalNum);
});
opButtons.forEach(button => {
    button.addEventListener('click', evalOp);
});
equalButton.addEventListener('click', equal);
dotButton.addEventListener('click', decimal);
clearButton.addEventListener('click', clear);
addMem.addEventListener('click', memAdd);
subMem.addEventListener('click', memSub);
clearMem.addEventListener('click', memClear);
sqrtButton.addEventListener('click', sqrt);
factorialButton.addEventListener('click', fact);

