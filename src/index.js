/**
 * @fileoverview Entry file
 * 
 * @description This is entry file for logger utility
 * 
 * @module LiteLogger
 * @author Pramod Jain
 * @since 1.0.0
 * @license MIT
 */

import { LoggerCore } from "./core/LoggerCore.js";


/**
 * Public logger class (thin wrapper around LoggerCore).
 */
export class LiteLogger extends LoggerCore {}

export default LiteLogger;
