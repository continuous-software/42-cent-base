var Promise = require('bluebird');

function throwNotImplemented() {
    return new Error('method not implemented/supported by this gateway');
}

/**
 * Structural interface, actual implementations must implement
 * @param {Object} [options] - the instance will be extended with the option object
 * @constructor
 */
function BaseGateway(options) {
    Object.assign(this, options);
}

/**
 * authorize and capture a transaction.
 *
 * all values must be Strings
 * @abstract
 * @param {Object} order - the fields related to the order
 * <dl>
 *     <dt>amount</dt>
 *     <dd>the amount of the transaction</dd>
 * </dl>
 * @param {CreditCard | Object} creditCard - object holding credit card information
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
 * @param {Prospect | Object} prospect - the fields related to the prospect
 * <dl>
 *     <dt>customerFirstName</dt>
 *     <dd>first name of the customer (also used for the billing)</dd>
 *     <dt>customerLastName(also used for the billing)</dt>
 *     <dd>last name of the customer</dd>
 *     <dt>customerEmail(also used for the billing)</dt>
 *     <dd>email of the customer</dd>
 *     <dt>billingAddress</dt>
 *     <dd>the billing address</dd>
 *     <dt>billingCity</dt>
 *     <dd>the billing city</dd>
 *     <dt>billingState</dt>
 *     <dd>the billing state</dd>
 *     <dt>billingZip</dt>
 *     <dd>billing zip code</dd>
 *     <dt>billingCountry</dt>
 *     <dd>the billing country</dd>
 *     <dt>shippingFirstName</dt>
 *     <dd>the shipping first name</dd>
 *     <dt>shippingLastName</dt>
 *     <dd>the shipping last name</dd>
 *     <dt>shippingAddress</dt>
 *     <dd>the shipping address</dd>
 *     <dt>shippingCity</dt>
 *     <dd>the shipping city</dd>
 *     <dt>shippingState</dt>
 *     <dd>the shipping state</dd>
 *     <dt>shippingZip</dt>
 *     <dd>shipping zip code</dd>
 *     <dt>shippingCountry</dt>
 *     <dd>the shipping country</dd>
 *
 * </dl>
 * @param {Object} [other] - other field specific to a gateway sdk implementation. refer to specific sdk for more details
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
 * authorize only a transaction
 * same parameters than {@link BaseGateway#submitTransaction}
 * @abstract
 * @param order
 * @param creditCard
 * @param prospect
 * @param other
 */
BaseGateway.prototype.authorizeTransaction = function authorizeTransaction(order, creditCard, prospect, other) {
    return Promise.reject(throwNotImplemented());
};

/**
 * get a batch list of settled transaction within the window of time
 * @abstract
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

/**
 * Refund (or credit) an already settled transaction
 * @abstract
 * @param {String} transactionId - the reference to the transaction to refund (used by the underlying payment gateway system)
 * @param {Object} [options] - a set of optional fields
 * <dl>
 *     <dt>amount</dt>
 *     <dd>the amount to be refunded (partial refund)</dd>
 * </dl>
 * @returns {Promise} - the result promise will have the following fields
 *
 * if resolved
 * <dl>
 *      <dt>_original</dt>
 *      <dd>the original response from the payment gateway</dd>
 * </d>
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
 *
 */
BaseGateway.prototype.refundTransaction = function refundTransaction(transactionId, options) {
    return Promise.reject(throwNotImplemented());
};

/**
 * void a (non settled) transaction
 * @abstract
 * @param {String} transactionId - the reference to the transaction to void (used by the underlying payment gateway system)
 * @param {Object} [options] - a set of optional fields
 * @returns {Promise} - the result promise will have the following fields
 *
 * if resolved
 * <dl>
 *      <dt>_original</dt>
 *      <dd>the original response from the payment gateway</dd>
 * </d>
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
BaseGateway.prototype.voidTransaction = function voidTransaction(transactionId, options) {
    return Promise.reject(throwNotImplemented());
};

/**
 * create a recurring payment
 * @abstract
 * @param {CreditCard | Object} creditCard - the credit card associated to the payment
 * @param {Prospect | Object} prospect - the prospect/customer linked to the subscription
 * @param {SubscriptionPlan | Object} subscriptionPlan - a subscription plan
 * Note that the tuple [periodUnit , periodLength] must result in a period supported by the gateway implementation otherwise periodUnit should take priority
 * @param {Object} [other] - a set of options to be used by specific implementations
 * @returns {Promise} - the result promise will have the following fields
 *
 * if resolved
 * <dl>
 *      <dt>subscriptionId</dt>
 *      <dd>a reference id to the subscription</dd>
 *      <dt>_original</dt>
 *      <dd>the original response from the payment gateway</dd>
 * </d>
 */
BaseGateway.prototype.createSubscription = function createSubscription(creditCard, prospect, subscriptionPlan, other) {
    return Promise.reject(throwNotImplemented());
};

/**
 * create a customer profile in gateway system, useful to charge a customer without having to use his payment info
 * @abstract
 * @param {CreditCard | Object} payment - payment info to associate with the customer
 * @param {Object} billing - billing info to associate with the customer
 * @param {Object} [shipping]- shipping info to associate with the customer
 * @param {Object} [other] - optional info related to a specific gateway implementation
 * @returns {Promise} - the resolve promise will have the following fields
 *
 * if resolved
 * <dl>
 *      <dt>profileId</dt>
 *      <dd>a reference id to the customer profile</dd>
 *      <dt>_original</dt>
 *      <dd>the original response from the payment gateway</dd>
 * </d>
 *
 */
BaseGateway.prototype.createCustomerProfile = function createCustomerProfile(payment, billing, shipping, other) {
    return Promise.reject(throwNotImplemented());
};

/**
 * get a customer profile
 * @abstract
 * @param {String} profileId - the id related to the customer profile in the gateway system
 * @returns {Promise } -
 * if resolved the promise will have the same field than a Prospect instance plus a field `payment` holding a CreditCard
 */
BaseGateway.prototype.getCustomerProfile = function getCustomerProfile(profileId) {
    return Promise.reject(throwNotImplemented());
};

/**
 * submit a transaction (auth+capture) from a customer profile.
 * @param {Object} order - order information
 * @param {Prospect} prospect - the prospect profile to charge, note that the prospect must have the field profileId set
 * @param {Object} [other] - optional info related to a specific gateway implementation
 * @returns {Promise} cf BaseGateway#submitTransaction
 */
BaseGateway.prototype.chargeCustomer = function chargeCustomer(order, prospect, other) {
    return Promise.reject(throwNotImplemented());
};

module.exports = BaseGateway;
