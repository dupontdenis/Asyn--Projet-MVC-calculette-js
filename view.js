import { qs, qsa, $delegate, $on } from "./helpers.js";

export default class View {
  constructor() {
    this.$calculatorGrid = qs("[data-grid-contener]");
    this.currentOperandTextElement = qs("[data-current-operand]");
    this.previousOperandTextElement = qs("[data-previous-operand]");
    this.equalsButton = qs("[data-equals]");
    this.allClearButton = qs("[data-all-clear]");
  }

  bindAppendNumber(handler) {
    $delegate(
      this.$calculatorGrid,
      "[data-number]",
      "click",
      async ({ target }) => {
        const number = target.dataset.number;
        console.log(`View: ${number} clicked`);
        if (number) {
          await handler(number);
        }
      }
    );
  }

  bindAppendOperator(handler) {
    $delegate(
      this.$calculatorGrid,
      "[data-operator]",
      "click",
      async ({ target }) => {
        const operator = target.dataset.operator;
        console.log(`View: ${operator} clicked`);
        if (operator) {
          await handler(operator);
        }
      }
    );
  }

  bindCompute(handler) {
    $on(
      this.equalsButton,
      "click",
      async ({ target }) => {
        const operator = target.dataset.equals;
        console.log(`View: ${operator} clicked`);
        if (operator) {
          await handler(operator);
        }
      },
      true
    );
  }

  bindReset(handler) {
    $on(
      this.allClearButton,
      "click",
      async ({ target }) => {
        const operator = target.innerText;
        console.log(`View: ${operator} clicked`);
        if (operator) {
          await handler(operator);
        }
      },
      true
    );
  }

  updateCurrentOperand(number) {
    console.log(`View: CurrentOperand is updated to ${number}`);
    this.currentOperandTextElement.innerText = number;
  }

  updatePreviousOperand(number) {
    console.log(`View: PreviousOperand is updated to ${number}`);
    this.previousOperandTextElement.innerText = number;
  }
}
