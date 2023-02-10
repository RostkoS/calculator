
//getting buttons from html
const numberBtn = document.querySelectorAll('[number]');
const operationBtn = document.querySelectorAll('[operation]');
const equalsBtn = document.querySelector('[equals]');
const deleteBtn = document.querySelector('[delete]');
const allClearBtn = document.querySelector('[all-clear]');
//setting up previous and current operands
const previousOp = document.querySelector('[previous-operand]');
const currentOp = document.querySelector('[current-operand]');


class Calculator {
    constructor(previousOperand, currentOperand) {
        this.currentOperandTextElement = currentOperand;
        this.previousOperandTextElement = previousOperand;
        this.clear();
    }
    //clearing data 
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    //deleting last char of current poerand
    delete() {
        this.currentOperand = (this.currentOperand.toString()).slice(0, -1);
    }
    //appending the number
    getNumber(number) {
        if (number === '.') {
            if (this.currentOperand.includes('.')) return;
            else if (this.currentOperand.slice(-1) === '') {
                this.currentOperand = '0';
            }
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    //processing input of operations 
    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    //calculating the result
    compute() {
        let computation='';
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '/': {
                computation = prev / current;
                break;
            }
            case '*':
                {
                    computation = prev * current;
                    break;
                }
            case '+': {
                computation = prev + current;
                break;
            }
            case '-': {
                computation = prev - current;
                break;
            }
            default:
                return;
        }
        //saving result
        this.currentOperand = computation;
        //clearing already used data
        this.operation = undefined;
        this.previousOperand = '';
    }
    //displaying number depending on if its integer or float
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay='';
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    // displaying reaction to input
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}
//initializing object calc of class Calculator
const calc = new Calculator(previousOp, currentOp);


// --Event listeners for buttons
//processing number-buttons
numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calc.getNumber(button.innerText);
        calc.updateDisplay();
    })
})
//processing operation-buttons
operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    })
})
//processing delete-button
deleteBtn.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
})
//processing all-clear-button
allClearBtn.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
})
//processing equals-button
equalsBtn.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
})

//setting up responses for the keyboard
document.addEventListener('keyup', (event) => {
    if (Number(event.key) || ".".indexOf(event.key)>=0 ) {
        calc.getNumber(event.key);
    } else if ("/*-+".indexOf(event.key) >= 0) {
        calc.chooseOperation(event.key);
    } else if ("=".indexOf(event.key) === 0 || event.key === "Enter") {
        calc.compute();
    } else if (event.key === "Backspace") {
        calc.delete();
    } else if (event.key === "Escape") {
        calc.clear();
    }
    calc.updateDisplay();
})

