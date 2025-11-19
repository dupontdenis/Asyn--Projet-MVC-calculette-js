/**
 * View
 * ----
 * Responsible for reading DOM events and updating the DOM. The view is
 * intentionally passive: it binds UI events to callbacks provided by the
 * controller and exposes methods for updating the display.
 */
import { qs, qsa, $delegate, $on } from "./helpers.js";

export default class View {
  /**
   * Cache DOM references used by the calculator UI.
   */
  constructor() {
    this.$calculatorGrid = qs("[data-grid-contener]");
    this.currentOperandTextElement = qs("[data-current-operand]");
    this.previousOperandTextElement = qs("[data-previous-operand]");
    this.equalsButton = qs("[data-equals]");
    this.allClearButton = qs("[data-all-clear]");
  }

  /**
   * Bind number buttons to the supplied handler. Uses event delegation so
   * buttons can be added/removed without rebinding listeners.
   *
   * @param {(number|string) => Promise<void>} handler Async handler called with the clicked number
   */
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

  /**
   * Bind operator buttons (e.g. +, -, *, /) to the supplied handler.
   * @param {(string) => Promise<void>} handler Async handler called with the operator
   */
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

  /**
   * Bind the equals button to trigger computation.
   * @param {(string) => Promise<void>} handler Async handler called when equals is pressed
   */
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

  /**
   * Bind the All Clear button to reset calculator state.
   * @param {(string) => Promise<void>} handler Async handler called when clear is pressed
   */
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

  /**
   * Update the visible current operand on the calculator display.
   * @param {string|number} number New value to show for the current operand
   */
  updateCurrentOperand(number) {
    console.log(`View: CurrentOperand is updated to ${number}`);
    this.currentOperandTextElement.innerText = number;
  }

  /**
   * Update the visible previous operand on the calculator display.
   * @param {string|number} number New value to show for the previous operand
   */
  updatePreviousOperand(number) {
    console.log(`View: PreviousOperand is updated to ${number}`);
    this.previousOperandTextElement.innerText = number;
  }
}
