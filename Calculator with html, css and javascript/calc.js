const numberBtns = document.querySelectorAll("[data-num]")
const operatorBtns = document.querySelectorAll("[data-operation]")
const equalsBtn = document.querySelector("[data-equals]")
const allClearBtn = document.querySelector("[data-all-clear]")
const delBtn = document.querySelector("[data-del]")
const previousOperandEl = document.querySelector("[data-previous-operand]")
const currentOperandEl = document.querySelector("[data-current-operand]")

class Calculator {
    constructor (previousOperandEl, currentOperandEl) {
        this.previousOperandEl = previousOperandEl
        this.currentOperandEl = currentOperandEl
        this.clear()
    }

    clear() {
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNum(num) {
        if(num == "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + num.toString()
    }
    chooseOperation(opration) {
        if(this.opration === "") return
        if(this.previousOperand !== "") {
            this.compute()
        }
        this.operation = opration
        this.previousOperand = this.currentOperand
        this.currentOperand = ""

    }
    compute() {
        let computation
        const previousNum = Number(this.previousOperand)
        const currentNum = Number(this.currentOperand)
        if (isNaN(previousNum) || isNaN(currentNum)) return
        switch(this.operation) {
            case "+":
                computation = previousNum + currentNum
                break
            case "-":
                computation = previousNum - currentNum
                break
            case "x":
                computation = previousNum * currentNum
                break
            case "÷":
                computation = previousNum / currentNum
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined
    }
    getDisplayNum(num) {
        const stringNum = num.toString()
        const numDigit = Number(stringNum.split(".")[0])
        const decimalDigit = stringNum.split(".")[1]
        let numDisplay
        if (isNaN(numDigit)) {
            numDisplay = ""
        } else {
            numDisplay = numDigit.toLocaleString("en", {
                maximumFractionDigits: 0 })
        }
        if (decimalDigit != null) {
            return `${numDisplay}.${decimalDigit}`
        } else {
            return numDisplay
        }

    }
    updateDisplay() {
        this.currentOperandEl.innerText = this.getDisplayNum(this.currentOperand)
        if (this.operation != null){
            this.previousOperandEl.innerText =
            `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandEl.innerText = ""
        }

    }
}

const calculator = new Calculator(previousOperandEl, currentOperandEl)
for (let btn of numberBtns) {
    btn.addEventListener("click", () => {
        calculator.appendNum(btn.innerText)
        calculator.updateDisplay()
    })
}
for (let btn of operatorBtns) {
    btn.addEventListener("click", (e) => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
}
equalsBtn.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearBtn.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})
delBtn.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})
document.addEventListener("keyup", (e) => {
    console.log(e)
    console.log(e.key)
    if (Number(e.key) >= 0 || Number(e.key) <= 0 || e.key == "."){
        calculator.appendNum(e.key)
        calculator.updateDisplay()
    } else if (e.key == "Backspace"){
        calculator.delete()
        calculator.updateDisplay()
    } else if (e.key == "+" || e.key == "-") {
        calculator.chooseOperation(e.key)
        calculator.updateDisplay()
    } else if (e.key == "*") {
        calculator.chooseOperation("x")
        calculator.updateDisplay()
    } else if (e.key == "/") {
        calculator.chooseOperation("÷")
        calculator.updateDisplay()
    } else if (e.key == "Enter") {
        calculator.compute()
        calculator.updateDisplay()
    } else if (e.key == "Escape") {
        calculator.clear()
        calculator.updateDisplay()
    }
})
