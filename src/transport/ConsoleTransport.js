/**
 * @fileoverview Default UI based logger is supplied along with Logger
 * 
 * @description This is renders the logs in the browser UI
 * 
 * 
 * @module ConsoleTransport
 * @author Pramod Jain
 * @since 1.0.0
 * @license MIT
 */

import { BaseTransport } from "./BaseTransport.js";
import { DateFormater } from "../formatter/DateFormater.js";
import { LogLevel, LogLevelString } from "../core/Logger.js";


/** @typedef {import("../core/Logger.js").LogEntry} LogEntry */

/**
 * @description Class of UITrasnport as default logging on browser
 */
export class ConsoleTransport extends BaseTransport {
  /** @type {DateFormater} */
  #dateFormater;

  /**
   * 
   */
  constructor() {
    super("ConsoleTransport");
    this.#dateFormater = new DateFormater();
  }

  ////------------------------- Private Methods --------------------------------
  #createUI() {
    console.log(`=======| Lite Logger, started on ${this.#dateFormater.getDate() + " " + this.#dateFormater.getTime()}  |=======`);

    return this;
  }

  ////----------------- Overridden Methods / Public Methods --------------------
  /**
   * This fn initializes the Transport layer.
   * @returns {this} - Returnss object in which context method is called
   * @throws {Error} - throws Error if any issue happens
   */
  init() {
    this.#createUI();

    return this;
  }

  /**
   * 
   * @param {LogEntry} logEntry 
   * @returns {void}
   * @throws {Error}
   */
  log(logEntry) {

    const levelName = LogLevelString[logEntry.level] ?? String(logEntry.level);
    const time = this.#dateFormater.getTime(logEntry.timestamp);

    switch (logEntry.level) {
      case LogLevel.ERROR:
        console.error(`${levelName} ${logEntry.message}`);
        break;
      case LogLevel.WARN:
        console.warn(`${levelName} ${logEntry.message}`);
        break;
      case LogLevel.INFO:
        console.info(`${levelName} ${logEntry.message}`);
        break;
      case LogLevel.DEBUG:
        console.debug(`${levelName} ${logEntry.message}`);
        break;
      default:
        console.log(`${levelName} ${logEntry.message}`);
    }

  }

  /**
   * @returns {void} - No return as after this function, there is no chaining 
   * @throws {Error} - if any issue occures
   */
  destroy() {
    // Do nothing is Console case
  }
}