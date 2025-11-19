/**
 * Controller
 * ----------
 * Coordinates interactions between the `Model` and the `View`.
 * The controller reacts to view events (user input), calls the model to
 * update state, and then updates the view. All controller operations are
 * asynchronous to match the model's Promise-based API.
 */
import View from "./view.js";
import Model from "./model.js";

export default class Controller {
  /**
   * @param {Model} model The application model instance
   * @param {View} view The application view instance
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind view events to controller handlers so the view remains passive.
    view.bindAppendNumber((number) => this.appendNumber(number));
    view.bindAppendOperator((operator) => this.chooseOperator(operator));
    view.bindCompute((operator) => this.compute(operator));
    view.bindReset((operator) => this.clear(operator));
  }

  /**
   * Clear all calculator state via the model and update the view.
   * @param {string} operator Textual label from the view (not used by model)
   */
  async clear(operator) {
    console.log(`Control: ${operator} please Reset!`);
    const { currentOperand, previousOperand } = await this.model.clear();
    console.log(`Control: the view must be updated with ${currentOperand}`);
    this.view.updateCurrentOperand(currentOperand);
    this.view.updatePreviousOperand(previousOperand);
  }

  /**
   * Ask the model to compute the result and update the view. Handles model
   * rejections (invalid input, division by zero) by logging the error.
   * @param {string} operator Textual label from the view (not used by model)
   */
  async compute(operator) {
    console.log(`Control: ${operator} please compute!`);
    try {
      const { currentOperand, previousOperand } = await this.model.compute();
      console.log(`Control: the view must be updated with ${currentOperand}`);
      this.view.updateCurrentOperand(currentOperand);
      this.view.updatePreviousOperand(previousOperand);
    } catch (error) {
      // In a real app, surface this to the user (toast, message) instead.
      console.error(error);
    }
  }

  /**
   * Handle operator selection: instruct the model to store the chosen
   * operator and update the view accordingly.
   * @param {string} operator Operator string like '+' or '-'
   */
  async chooseOperator(operator) {
    console.log(`Control: ${operator} must be added`);
    try {
      const { currentOperand, previousOperand } =
        await this.model.chooseOperator(operator);
      console.log(
        `Control: the view must be updated with ${currentOperand} ${previousOperand}`
      );
      this.view.updateCurrentOperand(currentOperand);
      this.view.updatePreviousOperand(previousOperand);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Append a number (or dot) to the current operand via the model and
   * update the view display.
   * @param {string|number} number Digit or '.' to append
   */
  async appendNumber(number) {
    console.log(`Control: ${number} must be added`);
    const currentOperand = await this.model.appendNumber(number);
    console.log(`Control: the view must be updated with ${currentOperand}`);
    this.view.updateCurrentOperand(currentOperand);
  }
}
