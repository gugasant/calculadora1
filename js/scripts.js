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
        // checa se a operacao atual ja tem um ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // processa todas as operacoes da calculadora
    processOperation(operation) {
    // checa se o valor atual esta vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // mudanca de operacao
            if (this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return
        }

    // pegar valor atual e anterior
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator()
                break
            case "CE":
                this.processClearCurrentOperation()
                break
            case "C":
                this.processClearOperation()
                break
            case "=":
                this.processEqualsOperator()
                break
            default:
                return
        }
    }



    // muda valores da tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        }
        else {
            // checa se o valor e zero, se for adiciona o valor atual
            if (previous === 0) {
                operationValue = current
            }

            // adiciona o valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }
    // muda a operacao matematica
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }
    // deleta o ultimo digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // limpa a operacao atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = ""
    }

    // limpa todas as operacoes
    processClearOperation() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    // resultado da operacao
    processEqualsOperator() {
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})