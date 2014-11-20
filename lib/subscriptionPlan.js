var extend = require('util')._extend;

/**
 * model for subscription plan
 * @param {Object} [options] - the instance will be extended with options
 * @constructor
 */
function SubscriptionPlan(options) {
    extend(this, options);
}

/**
 * set the starting date for the recurring payment
 * @method
 * @param {Date | String} date - a javascript date or a string resulting to a valid Javascript Date when called with new Date()
 * @returns {SubscriptionPlan} - returns the instance
 */
SubscriptionPlan.prototype.withStartingDate = function withStartingDate(date) {
    this.startingDate = new Date(date);
    return this;
};

/**
 * set the number of payments to be done within the plan duration
 * @method
 * @param {String} count - the number of payments to be done within the plan duration
 * @returns {SubscriptionPlan} returns the instance
 */
SubscriptionPlan.prototype.withIterationCount = function withIterationCount(count) {
    this.iterationCount = +(count);
    return this;
};

/**
 * set the interval time unit
 * @method
 * @param {String} unit - interval unit ['month', 'day', 'week']
 * @returns {SubscriptionPlan} returns the instance
 */
SubscriptionPlan.prototype.withPeriodUnit = function withPeriodUnit(unit) {
    this.periodUnit = unit;
    return this;
};

/**
 * set the interval time value to be associated with the interval time unit
 * @param {Number} periodLength - an integer
 * @returns {SubscriptionPlan} returns the instance
 */
SubscriptionPlan.prototype.withPeriodLength = function withPeriodLength(periodLength) {
    this.periodLength = periodLength;
    return this;
};


module.exports = SubscriptionPlan;