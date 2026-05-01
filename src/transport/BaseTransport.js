/**
 * @fileoverview Base Class for Transport layer
 * 
 * @description 
 * BaseTransport method which will be uniform and have no impact on component which are using
 * 
 * 
 * @module BaseTransport
 * @author Pramod Jain
 * @since 1.0.0
 * @license MIT
 */

////----------------------------------  IMPORTS --------------------------------


////----------------------------  TYPES(JSDocs) ONLY ---------------------------


////----------------------------------------------------------------------------
/**
 * @description It is base class for Transport layer. This class is being referred by LoggerCore to call
 * log function.
 */
export class BaseTransport {
  /** @type {string} */
  #transportName
  /**
   * 
   * @param {string} transportName - name of the transport being used
   */
  constructor (transportName) {
    this.#transportName = transportName;
  }

  /**
   * @return {this} - Returns object in which context this method is called
   * @throws {Error} - if any issue occures
   */
  init() { throw new Error("Not implemented"); }
  /**
   * 
   * @param {import("../core/Logger.js").LogEntry} logEntry 
   * @return {void} - No return as after this function, there is no chaining 
   * @throws {Error} - if any issue occures
   */
  log(logEntry) {
    throw new Error("Not implemented");
  }

  /**
   * @return {void} - No return as after this function, there is no chaining 
   * @throws {Error} - if any issue occures
   */
  destory() {
    throw new Error("Not implemented");
  }

}
