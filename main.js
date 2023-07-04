const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('#equalsBtn');
const resultBar = document.querySelector('#display-result');
const equationBar = document.querySelector('#display-equation');
const allClearbtn = document.querySelector(`#allClearbtn`);
const clearBtn = document.querySelector(`#clearBtn`);
const decimalBtn = document.querySelector('#decimalBtn');


let operand1 = "";
let operand2 = "";
let lastResult = "";
let operation = "";


function appendNumber(e){
        if (operation === "") {
            if (e.target.value === '.' && operand1.includes('.')) return
            operand1 += e.target.value;
            updateEquationdisplay();
        }
        else {
            if (e.target.value === '.' && operand2.includes('.')) return
            operand2 += e.target.value;
            updateEquationdisplay();
        }
};

function updateCurrentoperation(e){
    operation = e.target.value
    updateEquationdisplay();
};

function compute(){
    if (operand2 === "" && operation === null){
        equationBar.textContent = operand1;
        
    }
    else {
       operate(operand1,operand2,operation);
    }
};

function operate(a,b,operator) {
    a = Number(a);
    b = Number(b);
    switch (operator){
    case "+": 
        add(a,b);
    break;
    case "-": 
        subtract(a,b);
    break;
   
    case "x": 
        multiply(a,b);
    break;
    case "÷": 
        if (b === 0) updateResultdisplay("Error")
        else  divide(a,b);
    break;
    case "%": 
        if (b === 0) updateResultdisplay("Error")
        else  modulo(a,b);
    break;
}};


function add(a, b) {
    lastResult = a + b; 
    setEquationdisplay();
};
  
function subtract(a, b) {
    lastResult = a - b;
    setEquationdisplay();
};
  
function multiply(a, b) {
    lastResult = a * b;
    setEquationdisplay();
};
  
function divide(a, b) {
    lastResult = a / b;
    setEquationdisplay();
};
  

function modulo(a,b) {
    lastResult = a % b;
    setEquationdisplay();
};


function updateResultdisplay(result) {
    if (result.length > 5){
        resultBar.textContent = result.slice(0,6) + "...";
    } else {
        resultBar.textContent = result;
    }
};

function updateEquationdisplay(){
    if (operand2 ==="" && operation ===""){
        equationBar.textContent = operand1;
    } else {
        equationBar.textContent = `${operand1} ${operation} ${operand2}`;
}};

function setEquationdisplay() {
    operand1 = lastResult;
    operand2 = "";
    operation = "";
    equationBar.textContent = "";
    updateResultdisplay(lastResult.toString());
};

function allClear() {
    operand1 = "";
    operand2 = "";
    operation = "";
    updateEquationdisplay();
    updateResultdisplay(0);
};

function deleteNumber(){
    equationBar.textContent = equationBar.textContent.slice(0,-1)
    operand1 = equationBar.textContent
};


resultBar.appendChild(document.createTextNode("0"));
equationBar.appendChild(document.createTextNode(""));

operators.forEach(operator => operator.addEventListener('click', updateCurrentoperation));
numbers.forEach(number => number.addEventListener('click', appendNumber));
equalsBtn.addEventListener('click', compute);
allClearbtn.addEventListener('click', allClear);
clearBtn.addEventListener('click', deleteNumber);
decimalBtn.addEventListener('click', appendNumber);
