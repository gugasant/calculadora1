const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    // adiciona digito a tela da calculadora
    addDigit(digit) {
        
        this.currentOperation = digit
        this.updateScreen()
    }
    // muda valores da tela da calculadora
    updateScreen(){
        // 29:19
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            console.log("op: " + value)
        }
    })
})