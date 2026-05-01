/**
 * @fileoverview DateFormater is utility for date formate
 * 
 * @description DateFormater
 * 
 * 
 * @module DateFormater
 * @author Pramod Jain
 * @since 1.0.0
 * @license MIT
 */

/**
 * @typedef {Object} DateFormaterOption
 * @property {string} [dateFormate]
 * @property {string} [timeFormate]
 */


/** @type {string[]}  */
const months = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

/** @type {string[]}  */
const days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

/**
 * @description DateFormater Class for having date and time is specific formate
 */
export class DateFormater {
  /** @type {string} */
  #dateFormate;
  /** @type {string} */
  #timeFormate;

  /** @param {DateFormaterOption} opts */
  constructor (opts = {}) {
    this.#dateFormate = opts?.dateFormate || "FULL_DATE";
    this.#timeFormate = opts?.timeFormate || "hh:mm:ss";
  }
  /**
   * getDate fn to provide the date in specific formate
   * @param {Date} [dt] specific date if not passed then current date will be return
   * @returns {string} date in '03 May, 2026' formate by default
   */
  getDate(dt) {
    dt = dt || new Date();
    let date = ("0" + dt.getDate()).slice(-2);

    return (months[dt.getMonth()] + " " + date + ", " + dt.getFullYear());
  }

  /**
   * getDate fn to provide the date in specific formate
   * @param {Date} [dt] specific day if not passed then current date will be return
   * @returns {string} date in 'Sunday' formate
   */
  getDay(dt) {
    dt = dt || new Date();
    return days[dt.getDay()]
  }

  /**
   * getDate fn to provide the date in specific formate
   * @param {Date} [dt] specific date if not passed then current date will be return
   * @returns {string} date and time in '03 May 2026, 13:04:44' formate
   */
  getDaynDate(dt) {
    dt = dt || new Date();
    return (days[dt.getDay()] + ", " + this.getDate(dt));
  }

  /**
   * getDate fn to provide the date in specific formate
   * @param {Date} [dt] specific date if not passed then current date will be return
   * @returns {string} time in '13:04:44' formate
   */
  getTime(dt) {
    dt = dt || new Date();
    let hr = ("0" + dt.getHours()).slice(-2);
    let min = ("0" + dt.getMinutes()).slice(-2);
    let sec = ("0" + dt.getSeconds()).slice(-2);

    return (hr + ":" + min + ":" + sec);
  }

}