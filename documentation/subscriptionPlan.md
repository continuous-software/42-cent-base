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
SubscriptionPlan.withAmount(amount) 
-----------------------------
set the amount the be billed for each payment

**Parameters**

**amount**: String | Number, the amount

**Returns**: SubscriptionPlan, returns the instance


---








