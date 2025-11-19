/**
 * app.js — application entry point
 * -------------------------------
 * Instantiate the MVC components and wire them together. The controller
 * binds the view events to model operations so the app starts responding to
 * user input immediately after this file runs.
 */
import Controller from "./controller.js";
import Model from "./model.js";
import View from "./view.js";

// Create model and view instances
const model = new Model();
const view = new View();

/**
 * Create the controller which will bind view events to model actions.
 * The `controller` variable is intentionally not used further in this file
 * — it only needs to exist so bindings remain active.
 * @type {Controller}
 */
const controller = new Controller(model, view);
