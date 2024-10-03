import View from "./view.js";
import Model from "./model.js";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.bindAppendNumber((number) => this.appendNumber(number));
    view.bindAppendOperator((operator) => this.chooseOperator(operator));
    view.bindCompute((operator) => this.compute(operator));
    view.bindReset((operator) => this.clear(operator));
  }

  async clear(operator) {
    console.log(`Control: ${operator} please Reset!`);
    const { currentOperand, previousOperand } = await this.model.clear();
    console.log(`Control: the view must be updated with ${currentOperand}`);
    this.view.updateCurrentOperand(currentOperand);
    this.view.updatePreviousOperand(previousOperand);
  }

  async compute(operator) {
    console.log(`Control: ${operator} please compute!`);
    try {
      const { currentOperand, previousOperand } = await this.model.compute();
      console.log(`Control: the view must be updated with ${currentOperand}`);
      this.view.updateCurrentOperand(currentOperand);
      this.view.updatePreviousOperand(previousOperand);
    } catch (error) {
      console.error(error);
    }
  }

  async chooseOperator(operator) {
    console.log(`Control: ${operator} must be added`);
    try {
      const { currentOperand, previousOperand } = await this.model.chooseOperator(operator);
      console.log(`Control: the view must be updated with ${currentOperand} ${previousOperand}`);
      this.view.updateCurrentOperand(currentOperand);
      this.view.updatePreviousOperand(previousOperand);
    } catch (error) {
      console.error(error);
    }
  }

  async appendNumber(number) {
    console.log(`Control: ${number} must be added`);
    const currentOperand = await this.model.appendNumber(number);
    console.log(`Control: the view must be updated with ${currentOperand}`);
    this.view.updateCurrentOperand(currentOperand);
  }
}