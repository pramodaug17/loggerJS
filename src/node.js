export * from "./index.js";
export { ConsoleTransport } from "./transport/ConsoleTransport.js";

import LiteLogger from "./index.js";
import { ConsoleTransport } from "./transport/ConsoleTransport.js";

/**
 * Factory: creates a node logger with console transport attached.
 * @returns {LiteLogger}
 */
export function createNodeLogger() {
  return new LiteLogger().addTransport(new ConsoleTransport()).initialize();
}
