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

/**
 * @description Class of UITrasnport as default logging on browser
 */


export class UITransport extends BaseTransport {
  /** @type {HTMLDivElement|null} */
  #containerElement;
  /** @type {HTMLDivElement|null} */
  #logBufferElement;
  /** @type {DateFormater} */
  #dateFormater;

  /**
   * 
   */
  constructor() {
    super("UITransport");

    this.#containerElement = null;
    this.#logBufferElement = null;
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

    this.#logBufferElement = document.createElement("div");
    this.#logBufferElement.className = "log-entry-list";

    container.appendChild(this.#logBufferElement);
    this.#containerElement.appendChild(tabElement);
    this.#containerElement.appendChild(titleElement);
    this.#containerElement.appendChild(container);

    tabElement.addEventListener("click", () => {
      this.#containerElement?.classList.toggle("hide");
    });

    document.body.appendChild(this.#containerElement);

    return this;
  }

  #scrollToBottom() {
    if (this.#logBufferElement)
      this.#logBufferElement.scrollTop = this.#logBufferElement.scrollHeight;

    // this.#logBufferElement.style['margin-top'] = (buf.parentNode.clientHeight < buf.clientHeight) ?
    //   (buf.parentNode.clientHeight - buf.clientHeight) + "px" :
    //   "0";
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
   * @param {import("../core/Logger.js").LogEntry} logEntry 
   * @returns {void}
   * @throws {Error}
   */
  log(logEntry) {
    const entryElement = document.createElement("div");
    entryElement.className = `log-entry log-${LogLevelString[logEntry.level]}`;

    const timeElement = document.createElement("span");
    timeElement.className = "log-time";
    timeElement.innerText = this.#dateFormater.getTime(logEntry.timestamp);

    const msgElement = document.createElement("span");
    msgElement.className = "log-text";
    msgElement.innerText = logEntry.message;

    entryElement.appendChild(timeElement);
    entryElement.appendChild(msgElement);

    this.#logBufferElement?.appendChild(entryElement);

    this.#scrollToBottom();
  }

  /**
   * @return {void} - No return as after this function, there is no chaining 
   * @throws {Error} - if any issue occures
   */
  destory() {
    // throw new Error("Not implemented");
  }
}