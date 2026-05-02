/**
 * @fileoverview Default UI based logger is supplied along with Logger
 * 
 * @description This is renders the logs in the browser UI
 * 
 * 
 * @module UITransport
 * @author Pramod Jain
 * @since 1.0.0
 * @license MIT
 */

import { BaseTransport } from "./BaseTransport.js";
import { DateFormater } from "../formatter/DateFormater.js";
import { LogLevelString } from "../core/Logger.js";


/** @typedef {import("../core/Logger.js").LogEntry} LogEntry */

/**
 * @description Class of UITrasnport as default logging on browser
 */
export class UITransport extends BaseTransport {
  /** @type {HTMLDivElement|null} */
  #containerElement = null;
  /** @type {HTMLDivElement|null} */
  #logBufferContainer = null;
  /** @type {HTMLDivElement|null} */
  #lastEntry = null;
  /** @type {DateFormater} */
  #dateFormater;

  /**
   * 
   */
  constructor() {
    super("UITransport");

    if (typeof document === "undefined") {
      throw new Error("UITransport requires a browser environment (document is undefined).");
    }

    this.#dateFormater = new DateFormater();
  }

  ////------------------------- Private Methods --------------------------------
  #createUI() {
    this.#containerElement = document.createElement("div");
    this.#containerElement.className = "log-window hide";

    const tabElement = document.createElement("div");
    tabElement.className = "log-tab";
    tabElement.innerText = "LOG";

    const titleElement = document.createElement("div");
    titleElement.className = "log-title";
    titleElement.innerText = `=======| Lite Logger, started on ${this.#dateFormater.getDate() + " " + this.#dateFormater.getTime()}  |=======`;

    const container = document.createElement("div");
    container.className = "log-container";

    const logBufferEntry = document.createElement("div");
    logBufferEntry.className = "log-entry-list";

    container.appendChild(logBufferEntry);
    this.#containerElement.appendChild(tabElement);
    this.#containerElement.appendChild(titleElement);
    this.#containerElement.appendChild(container);

    tabElement.addEventListener("click", () => {
      this.#containerElement?.classList.toggle("hide");
    });

    document.body.appendChild(this.#containerElement);

    this.#logBufferContainer = container;

    return this;
  }

  #scrollToBottom() {
    if (!this.#logBufferContainer)
      return;


    // Use rAF so scroll happens after DOM paint (important when many logs)
    requestAnimationFrame((() => {
      if (!this.#lastEntry) {
        console.log(`Log Buffer Element is present? : ${!!this.#lastEntry}`);
        return;
      }
      this.#lastEntry?.scrollIntoView({ block: "end" })
    }).bind(this));

    return this;
  }

  ////----------------- Overridden Methods / Public Methods --------------------
  /**
   * This fn initializes the Transport layer.
   * @returns {this} - Returnss object in which context method is called
   * @throws {Error} - throws Error if any issue happens
   */
  init() {
    if (!this.#containerElement || !this.#logBufferContainer) this.#createUI();

    return this;
  }

  /**
   * 
   * @param {import("../core/Logger.js").LogEntry} logEntry 
   * @returns {void}
   * @throws {Error}
   */
  log(logEntry) {

    if (!this.#containerElement || !this.#logBufferContainer) {
      this.init();
    }
    if (!this.#logBufferContainer) throw new Error("UITransport buffer not initialized.");


    const levelName = LogLevelString[logEntry.level] ?? String(logEntry.level);
    const time = this.#dateFormater.getTime(logEntry.timestamp);

    const entryElement = document.createElement("div");
    entryElement.className = `log-entry log-${levelName.toLocaleLowerCase()}`;

    const timeElement = document.createElement("span");
    timeElement.className = "log-time";
    timeElement.innerText = time;

    const msgElement = document.createElement("span");
    msgElement.className = "log-text";
    msgElement.innerText = `${levelName} ${logEntry.message}`;

    entryElement.appendChild(timeElement);
    entryElement.appendChild(msgElement);

    this.#lastEntry = entryElement;
    this.#logBufferContainer.appendChild(entryElement);

    this.#scrollToBottom();
  }

  /**
   * @returns {void} - No return as after this function, there is no chaining 
   * @throws {Error} - if any issue occures
   */
  destroy() {

    if (this.#containerElement?.parentElement) {
      this.#containerElement.parentElement.removeChild(this.#containerElement);
    }

    this.#containerElement = null;
    this.#logBufferContainer = null;

  }
}