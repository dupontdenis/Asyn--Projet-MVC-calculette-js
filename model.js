export default class Model {
  constructor() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  appendNumber(number) {
    return new Promise((resolve) => {
      console.log(`Model: ${number} appended to currentOperand`);
      this.currentOperand = this.currentOperand.toString() + number.toString();
      console.log(`Model: CurrentOperand is updated with ${this.currentOperand}`);
      resolve(this.currentOperand);
    });
  }

  chooseOperator(operator) {
    return new Promise((resolve, reject) => {
      if (this.currentOperand === "" || this.previousOperand !== "") {
        return reject("Invalid operation");
      }

      this.operation = operator;
      this.previousOperand = this.currentOperand + this.operation;
      this.currentOperand = "";

      console.log(
        `Model: Operands are updated with ${this.currentOperand}, ${this.previousOperand}`
      );
      resolve({ currentOperand: this.currentOperand, previousOperand: this.previousOperand });
    });
  }

  clear() {
    return new Promise((resolve) => {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = undefined;

      console.log(`Model: Operands are reset`);
      resolve({ currentOperand: this.currentOperand, previousOperand: this.previousOperand });
    });
  }

  compute() {
    return new Promise((resolve, reject) => {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      console.log(`Model: ${prev} ${this.operation} ${current}`);
      if (isNaN(prev) || isNaN(current)) {
        return reject("Invalid operands");
      }

      switch (this.operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "*":
          computation = prev * current;
          break;
        case "/":
          if (current === 0) {
            return reject("Division by zero is not allowed.");
          }
          computation = prev / current;
          break;
        default:
          return reject("Invalid operation.");
      }

      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = "";

      console.log(`Model: Operands are updated with ${this.currentOperand}, ${this.previousOperand}`);
      resolve({ currentOperand: this.currentOperand, previousOperand: this.previousOperand });
    });
  }
}