/**
 * Model
 * -------
 * Responsible for storing the calculator state and performing calculations.
 * The implementation uses Promises to keep the public API asynchronous so
 * controllers and views can `await` model operations uniformly. This also
 * makes it easier to replace local computations with remote calls in the
 * future without changing callers.
 */
export default class Model {
  /**
   * Create a new Model instance.
   * - `currentOperand` holds the currently entered number (as string or number).
   * - `previousOperand` holds the previous value and operator when one is chosen.
   * - `operation` stores the selected operator (e.g. '+', '-', '*', '/').
   */
  constructor() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  /**
   * Append a digit (or dot) to the current operand.
   * Returns a Promise that resolves to the updated current operand.
   * Keeping this method asynchronous allows the controller to `await`
   * and treat all model operations consistently.
   *
   * @param {string|number} number Digit or character to append
   * @returns {Promise<string|number>} Promise resolving to currentOperand
   */
  appendNumber(number) {
    return new Promise((resolve) => {
      console.log(`Model: ${number} appended to currentOperand`);
      this.currentOperand = this.currentOperand.toString() + number.toString();
      console.log(
        `Model: CurrentOperand is updated with ${this.currentOperand}`
      );
      resolve(this.currentOperand);
    });
  }

  /**
   * Choose an operator. Moves the current operand into the previous slot
   * together with the operator and clears the current operand so the next
   * number can be entered.
   *
   * This method rejects when an operator cannot be chosen (e.g. no current
   * operand or a pending previous operand exists).
   *
   * @param {string} operator The operator to set ("+", "-", "*", "/")
   * @returns {Promise<{currentOperand: string, previousOperand: string}>}
   */
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
      resolve({
        currentOperand: this.currentOperand,
        previousOperand: this.previousOperand,
      });
    });
  }

  /**
   * Reset all operands and the selected operator.
   * @returns {Promise<{currentOperand: string, previousOperand: string}>}
   */
  clear() {
    return new Promise((resolve) => {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = undefined;

      console.log(`Model: Operands are reset`);
      resolve({
        currentOperand: this.currentOperand,
        previousOperand: this.previousOperand,
      });
    });
  }

  /**
   * Compute the result using `previousOperand` (which includes the operator)
   * and `currentOperand`. The operands are parsed to floats before
   * computation. The Promise resolves with the updated operands or rejects on
   * invalid input (NaN, unsupported operator, division by zero).
   *
   * @returns {Promise<{currentOperand: number|string, previousOperand: string}>}
   */
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

      // Store the result as the current operand and clear the previous
      // operand and operator so further input starts a new operation.
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = "";

      console.log(
        `Model: Operands are updated with ${this.currentOperand}, ${this.previousOperand}`
      );
      resolve({
        currentOperand: this.currentOperand,
        previousOperand: this.previousOperand,
      });
    });
  }
}
