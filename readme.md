# 42-cent-base

Interface to implement by 42-cent adaptor. See [documentation](https://github.com/continuous-software/42-cent) for more information.
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