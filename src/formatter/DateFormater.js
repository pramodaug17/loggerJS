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
 * @property {string} [dateFormate="FULL_DATE"]
 * @property {string} [timeFormate="hh:mm:ss"]
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
    this.#dateFormate = opts.dateFormate ?? "FULL_DATE";
    this.#timeFormate = opts.timeFormate ?? "hh:mm:ss";
  }
  /**
   * getDate fn to provide the date in specific formate. Date in '03 May, 2026' formate by default
   * @param {Date} [dt=new Date()] specific date if not passed then current date will be return
   * @returns {string}
   */
  getDate(dt=new Date()) {
    let date = ("0" + dt.getDate()).slice(-2);

    return (`${months[dt.getMonth()]} ${date}, ${dt.getFullYear()}`);
  }

  /**
   * getDate fn to provide the date in specific formate. Day in 'Sunday' formate
   * @param {Date} [dt=new Date()] specific day if not passed then current date will be return
   * @returns {string}
   */
  getDay(dt=new Date()) {
    return days[dt.getDay()]
  }

  /**
   * getDate fn to provide the date in specific formate. day and Date in ' Sunday, 03 May 2026' formate
   * @param {Date} [dt=new Date()] specific date if not passed then current date will be return
   * @returns {string}
   */
  getDaynDate(dt=new Date()) {
    return (`${this.getDay(dt)}, ${this.getDate(dt)}`);
  }

  /**
   * getDate fn to provide the date in specific formate
   * @param {Date} [dt=new Date()] specific date if not passed then current date will be return
   * @returns {string} time in '13:04:44' formate
   */
  getTime(dt=new Date()) {
    dt = dt || new Date();
    let hr = String(dt.getHours()).padStart(2, "0");
    let min = String(dt.getMinutes()).padStart(2, "0");
    let sec = String(dt.getSeconds()).padStart(2, "0");

    return (`${hr}:${min}:${sec}`);
  }

}