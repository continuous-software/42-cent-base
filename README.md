# 42-cent-base

> Node.js API abstraction for payment gateways.

Used by supported gateways listed in [42-cent](https://github.com/continuous-software/42-cent).

---

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
### basegateway()

--------------------------------------------------------
<a name="basegateway_submitTransaction"></a>
### basegateway#submitTransaction(order, creditCard, prospect, other) 

`submitTransaction()` authorize and capture a transaction.  

#### `parameters`

`'order'` *(object)*
* `'amount'` *(string)*: The amount of the transaction.

`'creditCard'` *(object)*
* `'creditCardNumber'` *(string)*: The credit card (PAN) number.
* `'expirationMonth'` *(string)*: The month of credit card expiration date.
* `'expirationYear'` *(string)*: The year of credit card expiration date (2 or 4 digits).
* `'cvv'` *(string)*: The credit card security code (3 or 4 digits).

`'prospect'` *(object)*

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

`'other'`  

Other fields specific to a gateway SDK implementation.  
Refer to specific SDK for more details.

##### `return value`

`result` *(Promise)*
* `'transactionId'` *(string)*: A unique identifier of the transaction.
* `'authCode'` *(string)*: Authorization code from the banking institution.
* `'_original'`: The original response from the gateway.

If the promise gets rejected because of the gateway, the reason will be an `object` instance of {@link GatewayError} holding the following attributes:

* `'message'` *(string)*: The error message from the gateway.
* `'_original'`: The original response from the specific sdk implementation.

Otherwise it will be an instance of `Error`.

--------------------------------------------------------
<a name="basegateway_authorizeTransaction"></a>
### basegateway#authorizeTransaction(order, creditCard, prospect, other) 

authorize only a transaction
same parameters than {@link BaseGateway#submitTransaction}

**Parameters**

**order**: authorize only a transaction
same parameters than {@link BaseGateway#submitTransaction}

**creditCard**: authorize only a transaction
same parameters than {@link BaseGateway#submitTransaction}

**prospect**: authorize only a transaction
same parameters than {@link BaseGateway#submitTransaction}

**other**: authorize only a transaction
same parameters than {@link BaseGateway#submitTransaction}

--------------------------------------------------------
<a name="basegateway_getSettledBatchList"></a>
### basegateway#getSettledBatchList(from, to) 
get a batch list of settled transaction within the window of time

**Parameters**

**from**: String | Date, Lower limit. If String, it must be a valid date string: a string which will result in a valid Javascript Date object if passed as argument of the Date constructor

**to**: String | Date, Upper limit (or today if not provided). If String, it must be a valid date string: a string which will result in a valid Javascript Date object if passed as argument of the Date constructor

**Returns**: Promise, - The promise should resolve with the following fields
<dl>
    <dt>batchList</dt>
    <dd>An array of batch where a batch will have the following fields
      <dl>
          <dt>batchId</dt>
          <dd>The id the batch is referenced by in the gateway internal system</dd>
          <dt>settlementDate</dt>
          <dd>A string for the settlement date time (UTC)</dd>
          <dt>chargeAmount</dt>
          <dd>the total amount from the charged transactions during the window of time</dd>
          <dt>chargeCount</dt>
          <dd>the total count of charged transactions during the window of time</dd>
          <dt>refundAmount</dt>
          <dd>the total amount from the refunded transactions during the window of time</dd>
          <dt>refundCount</dt>
          <dd>the total count of refund transactions during the window of time</dd>
          <dt>voidCount</dt>
          <dd>the total count of voided transactions during the window of time</dd>
          <dt>declineCount</dt>
          <dd>the total count of voided transactions during the window of time</dd>
          <dt>errorCount</dt>
          <dd>the total count of voided transactions during the window of time</dd>
      </dl>
    </dd>
</dl>

--------------------------------------------------------
<a name="basegateway_refundTransaction"></a>
### basegateway#refundTransaction(transactionId, options) 

Refund (or credit) an already settled transaction

**Parameters**

**transactionId**: String, the reference to the transaction to refund (used by the underlying payment gateway system)

**options**: Object, a set of optional fields
<dl>
    <dt>amount</dt>
    <dd>the amount to be refunded (partial refund)</dd>
</dl>

**Returns**: Promise, - the result promise will have the following fields

if resolved
<dl>
     <dt>_original</dt>
     <dd>the original response from the payment gateway</dd>
</d>

if rejected

if the rejection occurs because of the gateway the reason will be an instance of {@link GatewayError} holding the following information
<dl>
    <dt>message</dt>
    <dd>The error message from the gateway</dd>
    <dt>_original</dt>
    <dd>The original response from the specific sdk implementation</dd>
</dl>

otherwise it will be an instance of standard javascript Error

--------------------------------------------------------
<a name="basegateway_voidTransaction"></a>
### basegateway#voidTransaction(transactionId, options) 

void a (non settled) transaction

**Parameters**

**transactionId**: String, the reference to the transaction to void (used by the underlying payment gateway system)

**options**: Object, a set of optional fields

**Returns**: Promise, - the result promise will have the following fields

if resolved
<dl>
     <dt>_original</dt>
     <dd>the original response from the payment gateway</dd>
</d>

if rejected

if the rejection occurs because of the gateway the reason will be an instance of {@link GatewayError} holding the following information
<dl>
    <dt>message</dt>
    <dd>The error message from the gateway</dd>
    <dt>_original</dt>
    <dd>The original response from the specific sdk implementation</dd>
</dl>

otherwise it will be an instance of standard javascript Error

--------------------------------------------------------
<a name="basegateway_createSubscription"></a>
### basegateway#createSubscription(creditCard, prospect, subscriptionPlan, other) 

create a recurring payment

**Parameters**

**creditCard**: CreditCard | Object, the credit card associated to the payment

**prospect**: Prospect | Object, the prospect/customer linked to the subscription

**subscriptionPlan**: SubscriptionPlan | Object, a subscription plan
Note that the tuple [periodUnit , periodLength] must result in a period supported by the gateway implementation otherwise periodUnit should take priority

**other**: Object, a set of options to be used by specific implementations

**Returns**: Promise, - the result promise will have the following fields

if resolved
<dl>
     <dt>subscriptionId</dt>
     <dd>a reference id to the subscription</dd>
     <dt>_original</dt>
     <dd>the original response from the payment gateway</dd>
</d>

--------------------------------------------------------
<a name="basegateway_createCustomerProfile"></a>
### basegateway#createCustomerProfile(payment, billing, shipping, other) 

create a customer profile in gateway system, useful to charge a customer without having to use his payment info

**Parameters**

**payment**: CreditCard | Object, payment info to associate with the customer

**billing**: Object, billing info to associate with the customer

**shipping**: Object, shipping info to associate with the customer

**other**: Object, optional info related to a specific gateway implementation

**Returns**: Promise, - the resolve promise will have the following fields

if resolved
<dl>
     <dt>profileId</dt>
     <dd>a reference id to the customer profile</dd>
     <dt>_original</dt>
     <dd>the original response from the payment gateway</dd>
</d>

--------------------------------------------------------
<a name="basegateway_getCustomerProfile"></a>
### basegateway#getCustomerProfile(profileId) 

get a customer profile

**Parameters**

**profileId**: String, the id related to the customer profile in the gateway system

**Returns**: Promise, -
if resolved the promise will have the same field than a Prospect instance plus a field `payment` holding a CreditCard

--------------------------------------------------------
<a name="basegateway_chargeCustomer"></a>
#### basegateway#chargeCustomer(order, prospect, other) 

submit a transaction (auth+capture) from a customer profile.

**Parameters**

**order**: Object, order information

**prospect**: Prospect, the prospect profile to charge, note that the prospect must have the field profileId set

**other**: Object, optional info related to a specific gateway implementation

**Returns**: Promise, cf BaseGateway#submitTransaction

