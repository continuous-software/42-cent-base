Global
===





---

submitTransaction(order, creditCard, prospect, other) 
-----------------------------
authorize and capture a transaction.

all values must be Strings

**Parameters**

**order**: Object, the fields related to the order
<dl>
    <dt>amount</dt>
    <dd>the amount of the transaction</dd>
</dl>

**creditCard**: Object, object holding credit card information
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

**prospect**: Object, the fields related to the prospect
<dl>
    <dt>customerFirstName</dt>
    <dd>first name of the customer</dd>
    <dt>customerLastName</dt>
    <dd>last name of the customer</dd>
    <dt>customerEmail</dt>
    <dd>email of the customer</dd>
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


---








