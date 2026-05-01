/**
 * @fileoverview Entry file
 * 
 * @description This is entry file for logger utility
 * 
 * 
 * @module LiteLogger
 * @author Pramod Jain
 * @since 1.0.0
 * @license MIT
 */

/*
 * eventJS JavaScript Pub-Sub Library v@VERSION
 *
 * Copyright Pramod Jain
 * Released under the MIT license
 *
 */
"use strict";

import { LoggerCore } from "./core/LoggerCore.js";

class LiteLogger extends LoggerCore {};

globalThis.$logger = new LoggerCore();
globalThis.LiteLogger = LiteLogger;


export { LiteLogger }
// globalThis.events = globalThis.EventJs