var _ = require('lodash');
var Promise = require('bluebird');

function throwNotImplemented() {
    return new Error('method not implemented/supported by this gateway');
}

function BaseGateway(options) {
    _.assign(this, options);
}

/**
 * authorize and capture a transaction.
 *
 * all values must be Strings
 *
 * @param {Object} order - the fields related to the order
 * <dl>
 *     <dt>amount</dt>
 *     <dd>the amount of the transaction</dd>
 * </dl>
 * @param {Object} creditCard - object holding credit card information
 * <dl>
 *     <dt>creditCardNumber</dt>
 *     <dd>the credit card number used for the transaction - a string with card number digit, no blank, no dash, etc</dd>
 *     <dt>expirationMonth - two digit string : 01 -> 12</dt>
 *     <dd>The month of credit card expiration date</dd>
 *     <dt>expirationYear</dt>
 *     <dd>The year of credit card expiration date - four or two digits string 2016 or 16</dd>
 *     <dt>cvv</dt>
 *     <dd>the credit card cvv number</dd>
 * </dl>
 * @param {Object} prospect - the fields related to the prospect
 * <dl>
 *     <dt>customerFirstName</dt>
 *     <dd>first name of the customer</dd>
 *     <dt>customerLastName</dt>
 *     <dd>last name of the customer</dd>
 *     <dt>customerEmail</dt>
 *     <dd>email of the customer</dd>
 * </dl>
 * @param {Object} other - other field specific to a gateway sdk implementation. refer to specific sdk for more details
 * @return {Promise} - the promise will have these different fields
 *
 * if resolved
 * <dl>
 *      <dt>transactionId</dt>
 *      <dd>A unique identifier of the transaction.</dd>
 *      <dt>authCode</dt>
 *      <dd>authorization code from the banking institution</dd>
 *      <dt>_original<dt>
 *      <dd>the original response from the specific sdk implementation<dd>
 * </dl>
 *
 * if rejected
 *
 * if the rejection occurs because of the gateway the reason will be an instance of {@link GatewayError} holding the following information
 * <dl>
 *     <dt>message</dt>
 *     <dd>The error message from the gateway</dd>
 *     <dt>_original</dt>
 *     <dd>The original response from the specific sdk implementation</dd>
 * </dl>
 *
 * otherwise it will be an instance of standard javascript Error
 */
BaseGateway.prototype.submitTransaction = function submitTransaction(order, creditCard, prospect, other) {
    return Promise.reject(throwNotImplemented());
};

/**
 * get a batch list of settled transaction within the window of time
 * @param {String | Date} from - Lower limit. If String, it must be a valid date string: a string which will result in a valid Javascript Date object if passed as argument of the Date constructor
 * @param {String | Date} [to] - Upper limit (or today if not provided). If String, it must be a valid date string: a string which will result in a valid Javascript Date object if passed as argument of the Date constructor
 * @returns {Promise} - The promise should resolve with the following fields
 * <dl>
 *     <dt>batchList</dt>
 *     <dd>An array of batch where a batch will have the following fields
 *       <dl>
 *           <dt>batchId</dt>
 *           <dd>The id the batch is referenced by in the gateway internal system</dd>
 *           <dt>settlementDate</dt>
 *           <dd>A string for the settlement date time (UTC)</dd>
 *           <dt>chargeAmount</dt>
 *           <dd>the total amount from the charged transactions during the window of time</dd>
 *           <dt>chargeCount</dt>
 *           <dd>the total count of charged transactions during the window of time</dd>
 *           <dt>refundAmount</dt>
 *           <dd>the total amount from the refunded transactions during the window of time</dd>
 *           <dt>refundCount</dt>
 *           <dd>the total count of refund transactions during the window of time</dd>
 *           <dt>voidCount</dt>
 *           <dd>the total count of voided transactions during the window of time</dd>
 *           <dt>declineCount</dt>
 *           <dd>the total count of voided transactions during the window of time</dd>
 *           <dt>errorCount</dt>
 *           <dd>the total count of voided transactions during the window of time</dd>
 *       </dl>
 *     </dd>
 * </dl>
 */
BaseGateway.prototype.getSettledBatchList = function getTransactionsList(from, to) {
    return Promise.reject(throwNotImplemented());
};


module.exports = BaseGateway;

