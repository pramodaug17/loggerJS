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

export * from "./index.js"

import { LiteLogger } from "./index.js";
import { UITransport } from "./transport/UITransport.js";


/**
 * Factory: creates a browser logger with UI transport attached.
 * @returns {LiteLogger}
 */
function createBrowserLogger() {
  return new LiteLogger().addTransport(new UITransport());
}


globalThis.$logger = createBrowserLogger();
globalThis.LiteLogger = LiteLogger;
