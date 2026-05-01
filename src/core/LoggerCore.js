/**
 * @fileoverview This is javascripts logger engine
 *
 * @description
 * LoggerCore is core engine of the logging in webpage
 * 
 * TODO:
 * - extent to server application as well.
 *
 *
 * @module LoggerCore
 * @author Pramod Jain
 * @license MIT
 * @since 1.0.0
 * @version 1.0.0
 *
 */

////----------------------------------  IMPORTS --------------------------------
import { LogLevel } from "./Logger.js";
import { BaseTransport } from "../transport/BaseTransport.js";
import { UITransport } from "../transport/UITransport.js";


////----------------------------  TYPES(JSDocs) ONLY ---------------------------
/**
 * @typedef {Object} LoggerConfiguration
 * @property {boolean} [isEnabled] - this will tell if logger is enabled
 * @property {LogLevel} [logLevel] - it is minimum level of log to be display 
 */


/**
 * @typedef {BaseTransport} BaseTransportLike
 * @description BaseTransport or any subclass of it
 */


////----------------------------------------------------------------------------
/**
 * @description LoggerCore
 */
export class LoggerCore {
  /** @type {boolean} */
  #isEnabled;
  /** @type {LogLevel} */
  #logLevel;
  /** @type {BaseTransportLike[]} */
  #transportList;
  /** @type {boolean} */
  #isInitialized;
  /** @type {import("./Logger.js").LogEntry[]} */
  #logBufferBefore;

  /**
   * 
   * @param {LoggerConfiguration} config - configuration of logger
   */
  constructor (config = {}) {
    this.#isEnabled = config.isEnabled ?? true;
    this.#logLevel = config.logLevel ?? LogLevel.DEBUG;
    this.#transportList = [];
    this.#isInitialized = false;
    this.#logBufferBefore = [];
  }

  /**
   * 
   * @param {LogLevel} level - level of log which to be logged
   * @param {string} message - log message
   * @returns {import("./Logger.js").LogEntry}
   */
  #createLogEntry (level, message) {
    return ({
      timestamp: new Date(),
      level,
      message
    });
  }

  /**
   * 
   * @param {LogLevel} level - level of log which is to be logged
   * @param {string} message - log message in LogEntry Object
   * @returns {void}
   */
  #log (level, message) {
    if (!this.#isEnabled || level > this.#logLevel) return;

    const logEntry = this.#createLogEntry(level, message);
    if (!this.#isInitialized) {
      this.#logBufferBefore.push(logEntry);
    } else {
      this.#dispatch(logEntry);
    }
  }

  /**
   * 
   * @param {import("./Logger.js").LogEntry} logEntry - level of log which is to be logged
   * @returns {this}
   */
  #dispatch (logEntry) {
    this.#transportList.forEach(transport => {
      try {
        transport.log(logEntry);
      } catch (error) {
        console.error(error);
      }
    });

    return this;
  }

  ////----------  APIs ---------------------------------------------------------
  /**
   * 
   * @param {BaseTransportLike} transportInstance - instance of base transport UI 
   * @returns {this}
   */
  addTransport (transportInstance) {
    this.#transportList.push(transportInstance);
    return this;
  }

  /**
   * 
   * @returns {this}
   */
  initialize() {
    if (this.#transportList.length === 0) {
      this.addTransport(new UITransport());
    }

    this.#transportList.forEach(transport => {
      transport.init();
    });

    this.#isInitialized = true;

    this.#logBufferBefore.forEach(logEntry => {
      this.#dispatch(logEntry);
    });

    this.#logBufferBefore = [];

    return this;
  }


  /** 
   * @param {string} message - Log message
   */
  error (message) { this.#log(LogLevel.ERROR, message); }

  /** 
   * @param {string} message - Log message
   */
  warn (message) { this.#log(LogLevel.WARN, message); }
  
  /** 
   * @param {string} message - Log message
   */
  info (message) { this.#log(LogLevel.INFO, message); }

  /** 
   * @param {string} message - Log message
   */
  debug (message) { this.#log(LogLevel.DEBUG, message); }

  /** 
   * @param {string} message - Log message
   */
  verbose (message) { this.#log(LogLevel.VERBOSE, message); }

  /**
   * 
   * @returns {this}
   */
  enable () { this.#isEnabled = true; return this; }
  /**
   * 
   * @returns {this}
   */
  disable () { this.#isEnabled = false; return this; }

  /**
   * @param {number} newLevel - Level of log ERROR=0, WARN=1, INFO=2, DEBUG=3(default), VERBOSE=4
   * @returns {this}
   */
  setLogLevel (newLevel) {
    this.#logLevel = newLevel;
    return this;
  }

}
