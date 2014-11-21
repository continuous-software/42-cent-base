# 42-cent-base

Interface to implement by 42-cent adaptor. See [documentation](https://github.com/continuous-software/42-cent) for more information.
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
BaseGateway.createSubscription(profile, subscriptionPlan, other) 
-----------------------------
create a recurring payment

**Parameters**

**profile**: CreditCard, the credit card associated to the payment (todo allow customer profile etc)

**subscriptionPlan**: SubscriptionPlan | Object, a subscription plan

**other**: Object, a set of options to be used by specific implementations

**Returns**: Promise, - the result promise will have the following fields

if resolved
<dl>
     <dt>subscriptionId</dt>
     <dd>a reference id to the subscription</dd>
     <dt>_original</dt>
     <dd>the original response from the payment gateway</dd>
</d>


---









Global
===





---

CreditCard
===
Model representing a credit card

CreditCard.withCreditCardNumber(number) 
-----------------------------
set the credit card number of the instance

**Parameters**

**number**: String, a string for the card number (no blank, no special character)

**Returns**: CreditCard, returns the instance
CreditCard.withExpirationMonth(month) 
-----------------------------
set the expiration month of the instance

**Parameters**

**month**: string, a two digit string for the expiration month of the credit card

**Returns**: CreditCard, returns the instance
CreditCard.withExpirationYear(year) 
-----------------------------
set the expiration year of the instance

**Parameters**

**year**: String, a two digit string for the expiration year of the credit card

**Returns**: CreditCard, returns the instance
CreditCard.withCvv(cvv) 
-----------------------------
set the cvv/cvv2/etc code of the instance

**Parameters**

**cvv**: String, a string for the cvv/cvv2/etc code

**Returns**: CreditCard, returns the instance


---









---









Global
===





---

SubscriptionPlan
===
model for subscription plan

SubscriptionPlan.withStartingDate(date) 
-----------------------------
set the starting date for the recurring payment

**Parameters**

**date**: Date | String, a javascript date or a string resulting to a valid Javascript Date when called with new Date()

**Returns**: SubscriptionPlan, - returns the instance
SubscriptionPlan.withIterationCount(count) 
-----------------------------
set the number of payments to be done within the plan duration

**Parameters**

**count**: String, the number of payments to be done within the plan duration

**Returns**: SubscriptionPlan, returns the instance
SubscriptionPlan.withPeriodUnit(unit) 
-----------------------------
set the interval time unit

**Parameters**

**unit**: String, interval unit ['month', 'day', 'week']

**Returns**: SubscriptionPlan, returns the instance
SubscriptionPlan.withPeriodLength(periodLength) 
-----------------------------
set the interval time value to be associated with the interval time unit

**Parameters**

**periodLength**: Number, an integer

**Returns**: SubscriptionPlan, returns the instance


---









## license

42-cent-base module is under MIT license:

> Copyright (C) 2014 Laurent Renard.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.