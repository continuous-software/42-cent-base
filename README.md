# 42-cent-base

[![Greenkeeper badge](https://badges.greenkeeper.io/continuous-software/42-cent-base.svg)](https://greenkeeper.io/)

> Node.js API abstraction for payment gateways.

Used by supported gateways listed in [42-cent](https://github.com/continuous-software/42-cent).

## [Semantic Versioning](http://semver.org/)
  
It is important to note that the BaseGateway API will follow the semantic versioning rules so that:

* Any change on already defined property will define a new API and therefore will result on a different first digit of the BaseGateway version
* New supported parameters/methods will define a new functionality and therefore will result in a different second digit of the BaseGateway version
* Bug fixes/patches should not impact gateways implementation and will result in a different third digit of the BaseGateway version

## BaseGateway API

* <a href="#ctor"><code><b>basegateway()</b></code></a>
* <a href="#basegateway_submitTransaction"><code><b>basegateway#submitTransaction()</b></code></a>
* <a href="#basegateway_authorizeTransaction"><code><b>basegateway#authorizeTransaction()</b></code></a>
* <a href="#basegateway_getSettledBatchList"><code><b>basegateway#getSettledBatchList()</b></code></a>
* <a href="#basegateway_refundTransaction"><code><b>basegateway#refundTransaction()</b></code></a>
* <a href="#basegateway_voidTransaction"><code><b>basegateway#voidTransaction()</b></code></a>
* <a href="#basegateway_createSubscription"><code><b>basegateway#createSubscription()</b></code></a>
* <a href="#basegateway_createCustomer"><code><b>basegateway#createCustomerProfile()</b></code></a>
* <a href="#basegateway_getCustomerProfile"><code><b>basegateway#getCustomerProfile()</b></code></a>
* <a href="#basegateway_chargeCustomer"><code><b>basegateway#chargeCustomer()</b></code></a>

--------------------------------------------------------
<a name="ctor"></a>
#### basegateway(options)

--------------------------------------------------------
<a name="basegateway_submitTransaction"></a>
#### basegateway#submitTransaction(order, creditCard, prospect[, other]) 

Authorize and capture a transaction.  

#### `parameters`

`order` *(object)*
* `'amount'` *(string)*: The amount of the transaction.

`'creditCard'` *(object)*
* `'creditCardNumber'` *(string)*: The credit card (PAN) number.
* `'expirationMonth'` *(string)*: The month of credit card expiration date.
* `'expirationYear'` *(string)*: The year of credit card expiration date (2 or 4 digits).
* `'cvv'` *(string)*: The credit card security code (3 or 4 digits).

`prospect` *(object)*

* `'customerFirstName'` *(string)*: First name of the customer (also used for the billing).
* `'customerLastName'` *(string)*: Last name of the customer (also used for the billing).
* `'customerEmail'` *(string)*: Email of the customer.
* `'billingAddress'` *(string)*: Billing address.
* `'billingCity'` *(string)*: Billing City
* `'billingState'` *(string)*: Billing State
* `'billingZip'` *(string)*: Billing Zip
* `'billingCountry'` *(string)*: Billing Country
* `'shippingFirstName'` *(string)*: 
* `'shippingLastName'` *(string)*: 
* `'shippingAddress'` *(string)*: 
* `'shippingCity'` *(string)*: 
* `'shippingState'` *(string)*: 
* `'shippingZip'` *(string)*: 
* `'shippingCountry'` *(string)*: 

`other` *(object)*

Other fields specific to a gateway SDK implementation.  
Refer to specific SDK for more details.

#### `return value`

Returns a `Promise` with the following object as a result:

* `'transactionId'` *(string)*: A unique identifier of the transaction.
* `'authCode'` *(string)*: Authorization code from the banking institution.
* `'_original'`: The original response from the gateway.

If the promise gets rejected because of the gateway, the reason will be an `object` instance of GatewayError holding the following attributes:

* `'message'` *(string)*: The error message from the gateway.
* `'_original'`: The original response from the specific sdk implementation.

Otherwise it will be an instance of `Error`.

--------------------------------------------------------
<a name="basegateway_authorizeTransaction"></a>
#### basegateway#authorizeTransaction(order, creditCard, prospect[, other]) 

Auhtorize a transaction.

#### `parameters`

See <a href="#basegateway_submitTransaction"><code><b>basegateway#submitTransaction()</b></code></a>.

--------------------------------------------------------
<a name="basegateway_getSettledBatchList"></a>
#### basegateway#getSettledBatchList(from, to) 
get a batch list of settled transaction within the window of time

#### `parameters`

`from` *(Date)*: Lower limit.

`to` *(Date, default: `Date.now()`)*: Upper limit.

#### `return value`

Returns a `Promise` with the following object as a result:

* `'batchList'` *(Array)*: An array of batch where a batch will have the following fields.
  * `'batchId'`: The id the batch is referenced by in the gateway internal system.
  * `'settlementDate'` *(string)*: A string for the settlement date time (UTC).
  * `'chargeAmount'` *(string)*: The total amount from the charged transactions during the window of time.
  * `'chargeCount'` *(string)*: The total count of charged transactions during the window of time.
  * `'refundAmount'` *(string)*: The total amount from the refunded transactions during the window of time.
  * `'refundCount'` *(string)*: The total count of refund transactions during the window of time.
  * `'voidCount'` *(string)*: The total count of voided transactions during the window of time.
  * `'declineCount'` *(string)*: The total count of voided transactions during the window of time.
  * `'errorCount'` *(string)*: The total count of voided transactions during the window of time.

--------------------------------------------------------
<a name="basegateway_refundTransaction"></a>
#### basegateway#refundTransaction(transactionId, options) 

Refund (or credit) a settled transaction.

#### `parameters`

`transactionId` *(string)*: The id referencing the transaction to refund at the gateway.

`options` *(object)*: Set of optional fields.

* `'amount'`: The amount to be refunded (useful for partial refund).

#### `return value` 

Returns a `Promise` with the following object as a result:

* `'_original'`: The original response from the gateway.

If the promise gets rejected because of the gateway, the reason will be an `object` instance of GatewayError holding the following attributes:

* `'message'` *(string)*: The error message from the gateway.
* `'_original'`: The original response from the specific sdk implementation.

Otherwise it will be an instance of `Error`.

--------------------------------------------------------
<a name="basegateway_voidTransaction"></a>
### basegateway#voidTransaction(transactionId[, options]) 

Void a non-settled transaction.

#### `parameters`

`transactionId` *(string)*: The id referencing the transaction to void at the gateway.

`options` *(object)*: Set of optional fields.

#### `return value`

Returns a `Promise` with the following object as a result:

* `'_original'`: The original response from the gateway.

If the promise gets rejected because of the gateway, the reason will be an `object` instance of GatewayError holding the following attributes:

* `'message'` *(string)*: The error message from the gateway.
* `'_original'`: The original response from the specific sdk implementation.

Otherwise it will be an instance of `Error`.

--------------------------------------------------------
<a name="basegateway_createSubscription"></a>
#### basegateway#createSubscription(creditCard, prospect, subscriptionPlan[, other]) 

Create a recurring payment.

#### `parameters`

**creditCard**: CreditCard | Object, the credit card associated to the payment

**prospect**: Prospect | Object, the prospect/customer linked to the subscription

**subscriptionPlan**: SubscriptionPlan | Object, a subscription plan
Note that the tuple [periodUnit , periodLength] must result in a period supported by the gateway implementation otherwise periodUnit should take priority

**other**: Object, a set of options to be used by specific implementations

#### `return value`

Returns a `Promise` with the following object as a result:

* `'subscriptionId'`: An id referencing to the subscription at the gateway.
* `'_original'`: The original response from the gateway.

--------------------------------------------------------
<a name="basegateway_createCustomerProfile"></a>
#### basegateway#createCustomerProfile(payment, billing, shipping, other) 

Create a customer profile in the gateway, useful to charge a customer without having to provide his payment method information again.

#### `parameters`

**payment**: CreditCard | Object, payment info to associate with the customer

**billing**: Object, billing info to associate with the customer

**shipping**: Object, shipping info to associate with the customer

**other**: Object, optional info related to a specific gateway implementation

#### `return value`

Returns a `Promise` with the following object as a result:

* `'profileId'`: A reference id to the customer profile.
* `'_original'`: The original response from the payment gateway.

--------------------------------------------------------
<a name="basegateway_getCustomerProfile"></a>
#### basegateway#getCustomerProfile(profileId) 

Get a previously saved customer profile.

#### `parameters`

`profileId` *(string)*: The id referencing to the customer profile in the gateway.

#### `return value`

Returns a `Promise` with the following object as a result:

if resolved the promise will have the same field than a Prospect instance plus a field `payment` holding a CreditCard

--------------------------------------------------------
<a name="basegateway_chargeCustomer"></a>
#### basegateway#chargeCustomer(order, prospect[, other]) 

Submit a transaction (authorization and capture) using a customer profile.

#### `parameters`

**order**: Object, order information

**prospect**: Prospect, the prospect profile to charge, note that the prospect must have the field profileId set

**other**: Object, optional info related to a specific gateway implementation

#### `return value`

See <a href="#basegateway_submitTransaction"><code><b>basegateway#submitTransaction()</b></code></a>.

