Global
===





---

BaseGateway
===
Structural interface, actual implementations must implement

BaseGateway.submitTransaction(order, creditCard, prospect, other) 
-----------------------------
authorize and capture a transaction.

all values must be Strings

**Parameters**

**order**: Object, the fields related to the order
<dl>
    <dt>amount</dt>
    <dd>the amount of the transaction</dd>
</dl>

**creditCard**: CreditCard | Object, object holding credit card information
<dl>
    <dt>creditCardNumber</dt>
    <dd>the credit card number used for the transaction - a string with card number digit, no blank, no dash, etc</dd>
    <dt>expirationMonth - two digit string : 01 -> 12</dt>
    <dd>The month of credit card expiration date</dd>
    <dt>expirationYear</dt>
    <dd>The year of credit card expiration date - four or two digits string 2016 or 16</dd>
    <dt>cvv</dt>
    <dd>the credit card cvv number</dd>
</dl>

**prospect**: Prospect | Object, the fields related to the prospect
<dl>
    <dt>customerFirstName</dt>
    <dd>first name of the customer (also used for the billing)</dd>
    <dt>customerLastName(also used for the billing)</dt>
    <dd>last name of the customer</dd>
    <dt>customerEmail(also used for the billing)</dt>
    <dd>email of the customer</dd>
    <dt>billingAddress</dt>
    <dd>the billing address</dd>
    <dt>billingCity</dt>
    <dd>the billing city</dd>
    <dt>billingState</dt>
    <dd>the billing state</dd>
    <dt>billingZip</dt>
    <dd>billing zip code</dd>
    <dt>billingCountry</dt>
    <dd>the billing country</dd>
    <dt>shippingFirstName</dt>
    <dd>the shipping first name</dd>
    <dt>shippingLastName</dt>
    <dd>the shipping last name</dd>
    <dt>shippingAddress</dt>
    <dd>the shipping address</dd>
    <dt>shippingCity</dt>
    <dd>the shipping city</dd>
    <dt>shippingState</dt>
    <dd>the shipping state</dd>
    <dt>shippingZip</dt>
    <dd>shipping zip code</dd>
    <dt>shippingCountry</dt>
    <dd>the shipping country</dd>

</dl>

**other**: Object, other field specific to a gateway sdk implementation. refer to specific sdk for more details

**Returns**: Promise, - the promise will have these different fields

if resolved
<dl>
     <dt>transactionId</dt>
     <dd>A unique identifier of the transaction.</dd>
     <dt>authCode</dt>
     <dd>authorization code from the banking institution</dd>
     <dt>_original<dt>
     <dd>the original response from the specific sdk implementation<dd>
</dl>

if rejected

if the rejection occurs because of the gateway the reason will be an instance of {@link GatewayError} holding the following information
<dl>
    <dt>message</dt>
    <dd>The error message from the gateway</dd>
    <dt>_original</dt>
    <dd>The original response from the specific sdk implementation</dd>
</dl>

otherwise it will be an instance of standard javascript Error
BaseGateway.authorizeTransaction(order, creditCard, prospect, other) 
-----------------------------
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

BaseGateway.getSettledBatchList(from, to) 
-----------------------------
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
BaseGateway.refundTransaction(transactionId, options) 
-----------------------------
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
BaseGateway.voidTransaction(transactionId, options) 
-----------------------------
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
BaseGateway.createSubscription(creditCard, prospect, subscriptionPlan, other) 
-----------------------------
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
BaseGateway.createCustomerProfile(payment, billing, shipping, other) 
-----------------------------
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
BaseGateway.getCustomerProfile(profileId) 
-----------------------------
get a customer profile

**Parameters**

**profileId**: String, the id related to the customer profile in the gateway system

**Returns**: Promise, -
if resolved the promise will have the same field than a Prospect instance plus a field `payment` holding a CreditCard
BaseGateway.chargeCustomer(order, prospect, other) 
-----------------------------
submit a transaction (auth+capture) from a customer profile.

**Parameters**

**order**: Object, order information

**prospect**: Prospect, the prospect profile to charge, note that the prospect must have the field profileId set

**other**: Object, optional info related to a specific gateway implementation

**Returns**: Promise, cf BaseGateway#submitTransaction


---








