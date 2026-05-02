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

////----------------------------  TYPES(JSDocs) ONLY ---------------------------

/**
 * A single log record
 * @typedef {Object} LogEntry
 * @property {Date} timestamp
 * @property {LogLevel} level
 * @property {string} message 
 */




////----------------------------------------------------------------------------

/**
 * Numeric log levels.
 * Higher value = more verbose.
 * @readonly
 * @enum {number}
 */
export const LogLevel = Object.freeze({
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  VERBOSE: 4
});

/**
 * Reverse lookup from numeric level -> string label.
 * @readonly
 * @type {Readonly<Record<number, string>>}
 */
export const LogLevelString = Object.freeze(
  Object.fromEntries(
    Object.entries(LogLevel).map(([k, v]) => [v, k])
  )
);

