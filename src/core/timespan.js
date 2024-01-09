window.TimeSpan = class TimeSpan {
  /**
   * @param {Number|Decimal} value
   * @returns {TimeSpan}
   */
  static fromYears(value) {
    return new TimeSpan(new Decimal(value).times(31536e6));
  }

  /**
   * @param {Number|Decimal} value
   * @returns {TimeSpan}
   */
  static fromDays(value) {
    return new TimeSpan(new Decimal(value).times(864e5));
  }

  /**
   * @param {Number|Decimal} value
   * @returns {TimeSpan}
   */
  static fromHours(value) {
    return new TimeSpan(new Decimal(value).times(36e5));
  }

  /**
   * @param {Number|Decimal} value
   * @returns {TimeSpan}
   */
  static fromMinutes(value) {
    return new TimeSpan(new Decimal(value).times(6e4));
  }

  /**
   * @param {Number|Decimal} value
   * @returns {TimeSpan}
   */
  static fromSeconds(value) {
    return new TimeSpan(new Decimal(value).times(1e3));
  }

  /**
   * @param {Number|Decimal} value
   * @returns {TimeSpan}
   */
  static fromMilliseconds(value) {
    return new TimeSpan(new Decimal(value));
  }

  /**
   * @param {Number|Decimal} ms
   */
  constructor(ms) {
    Guard.isNumber(ms, "Value 'ms' must be a number or Decimal");
    this._ms = ms;
  }

  /**
   * @param {TimeSpan} other
   */
  copyFrom(other) {
    Guard.isTimeSpan(other);
    this._ms = other._ms;
  }

  /**
   * @param {Number|Decimal} ms
   */
  setFrom(ms) {
    Guard.isNumber(ms);
    this._ms = ms;
  }

  /**
   * @returns {Decimal}
   */
  get years() {
    return Decimal.floor(this.totalYears);
  }

  /**
   * @returns {Decimal}
   */
  get days() {
    return Decimal.floor(this.totalDays.div(365).sub(this.totalDays.div(365).floor()).times(365));
  }

  /**
   * @returns {Decimal}
   */
  get hours() {
    return Decimal.floor(this.totalHours.div(24).sub(this.totalHours.div(24).floor()).times(24));
  }

  /**
   * @returns {Decimal}
   */
  get minutes() {
    return Decimal.floor(this.totalMinutes.div(60).sub(this.totalMinutes.div(60).floor()).times(60));
  }

  /**
   * @returns {Decimal}
   */
  get seconds() {
    return Decimal.floor(this.totalSeconds.div(60).sub(this.totalSeconds.div(60).floor()).times(60));
  }

  /**
   * @returns {Decimal}
   */
  get milliseconds() {
    return Decimal.floor(this.totalMilliseconds.div(1e3).sub(this.totalMilliseconds.div(1e3).floor()).times(1e3));
  }

  /**
   * @returns {Decimal}
   */
  get totalYears() {
    return new Decimal(this._ms).div(31536e6);
  }

  /**
   * @returns {Decimal}
   */
  get totalDays() {
    return new Decimal(this._ms).div(864e5);
  }

  /**
   * @returns {Decimal}
   */
  get totalHours() {
    return new Decimal(this._ms).div(36e5);
  }

  /**
   * @returns {Decimal}
   */
  get totalMinutes() {
    return new Decimal(this._ms).div(6e4);
  }

  /**
   * @returns {Decimal}
   */
  get totalSeconds() {
    return new Decimal(this._ms).div(1e3);
  }

  /**
   * @returns {Decimal}
   */
  get totalMilliseconds() {
    return new Decimal(this._ms);
  }

  /**
   * @param {TimeSpan} other
   * @returns {TimeSpan}
   */
  plus(other) {
    Guard.isTimeSpan(other);
    return new TimeSpan(this._ms .add(other._ms));
  }

  /**
   * @param {TimeSpan} other
   * @returns {TimeSpan}
   */
  minus(other) {
    Guard.isTimeSpan(other);
    return new TimeSpan(this._ms.sub(other._ms));
  }

  /**
   * @param {Number} other
   * @returns {TimeSpan}
   */
  times(other) {
    Guard.isNumber(other);
    return new TimeSpan(this._ms.times(other));
  }

  /**
   * @param {Number} other
   * @returns {TimeSpan}
   */
  dividedBy(other) {
    Guard.isNumber(other);
    return new TimeSpan(this._ms.div(other));
  }

  /**
   * @returns {String}
   */
  toString() {
    if (this.years.gt(1e6)) {
      return `${format(this.totalYears, 3, 0)} years`;
    }
    if (this.totalSeconds.lte(10)) {
      return this.toStringNoDecimals();
    }
    return this.toStringShort();
  }

  /**
   * @returns {String}
   */
  toStringNoDecimals() {
    const parts = [];
    function addCheckedComponent(value, name) {
      if (value.eq(0)) {
        return;
      }
      addComponent(value, name);
    }
    function addComponent(value, name) {
      parts.push(value.eq(1) ? `${formatInt(value)} ${name}` : `${formatInt(value)} ${name}s`);
    }
    addCheckedComponent(this.years, "year");
    addCheckedComponent(this.days, "day");
    addCheckedComponent(this.hours, "hour");
    addCheckedComponent(this.minutes, "minute");
    addCheckedComponent(this.seconds, "second");
    // Join with commas and 'and' in the end.
    if (parts.length == 0) return `${formatInt(0)} seconds`;
    return [parts.slice(0, -1).join(", "), parts.slice(-1)[0]].join(parts.length < 2 ? "" : " and ");
  }

  /**
   * Note: For speedruns, we give 3 digits of hours on HMS formatting, a decimal point on seconds, and
   *  suppress END formatting on the speedrun record tabs
   * @param {boolean} useHMS If true, will display times as HH:MM:SS in between a minute and 100 hours.
   * @returns {String}
   */
  toStringShort(useHMS = true, isSpeedrun = false) {
    // Probably not worth the trouble of importing the isEND function from formatting since this accomplishes the same
    // thing; we do however need this to prevent strings like "02:32" from showing up though
    if (format(0) === "END" && !isSpeedrun) return "END";

    const totalSeconds = this.totalSeconds;
    if (totalSeconds.gt(5e-7) && totalSeconds.lt(1e-3)) {
      // This conditional happens when when the time is less than 1 millisecond
      // but big enough not to round to 0 with 3 decimal places (so showing decimal places
      // won't just show 0 and waste space).
      return `${format(totalSeconds.times(1000), 0, 3)} ms`;
    }
    if (totalSeconds.lt(1)) {
      // This catches all the cases when totalSeconds is less than 1 but not
      // between 5e-7 and 1e-3. This includes two types of cases:
      // (1) those less than or equal to 5e-7, which most notations will format as 0
      // (the most notable case of this kind is 0 itself).
      // (2) those greater than or equal to 1e-3, which will be formatted with default settings
      // (for most notations, rounding to the nearest integer number of milliseconds)
      return `${format(totalSeconds.times(1000))} ms`;
    }
    if (totalSeconds.lt(10)) {
      return `${format(totalSeconds, 0, 3)} seconds`;
    }
    if (totalSeconds.lt(60)) {
      return `${format(totalSeconds, 0, 2)} seconds`;
    }
    if (this.totalHours.lt(100) || (isSpeedrun && this.totalHours.lt(1000))) {
      if (useHMS && !Notations.current.isPainful) {
        const sec = seconds(this.seconds, this.milliseconds);
        if (Decimal.floor(this.totalHours).eq(0)) return `${formatHMS(this.minutes)}:${sec}`;
        return `${formatHMS(Decimal.floor(this.totalHours))}:${formatHMS(this.minutes)}:${sec}`;
      }
      if (this.totalMinutes.lt(60)) {
        return `${format(this.totalMinutes, 0, 2)} minutes`;
      }
      if (this.totalHours.lt(24)) {
        return `${format(this.totalHours, 0, 2)} hours`;
      }
    }
    if (this.totalDays.lt(500)) {
      return `${isSpeedrun ? this.totalDays.toFixed(2) : format(this.totalDays, 0, 2)} days`;
    }
    return `${isSpeedrun ? this.totalYears.toFixed(3) : format(this.totalYears, 3, 2)} years`;

    function formatHMS(value) {
      const s = value.toString();
      return s.length === 1 ? `0${s}` : s;
    }

    function seconds(s, ms) {
      const sec = formatHMS(s);
      return isSpeedrun ? `${sec}.${Decimal.floor(ms.div(100))}` : sec;
    }
  }

  toTimeEstimate() {
    const seconds = this.totalSeconds;
    if (seconds.lt(1)) return `< ${formatInt(1)} second`;
    if (seconds.gt(86400 * 365.25)) return `> ${formatInt(1)} year`;
    return this.toStringShort();
  }

  static get zero() {
    return new TimeSpan(new Decimal(0));
  }

  static get maxValue() {
    return new TimeSpan(new Decimal("9.999999999999998e999999999999999900000"));
  }

  static get minValue() {
    return new TimeSpan(Decimal.pow10(Number.MIN_VALUE));
  }
};

const Guard = {
  isDefined(value, message) {
    if (value !== undefined) return;
    if (message) throw message;
    throw "Value is defined";
  },
  isNumber(value, message) {
    if (typeof value === "number") return;
    if (value instanceof Decimal) return;
    if (message) throw message;
    throw "Value is not a number";
  },
  isTimeSpan(value, message) {
    if (value instanceof TimeSpan) return;
    if (message) throw message;
    throw "Value is not a TimeSpan";
  }
};
