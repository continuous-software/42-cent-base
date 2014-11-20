//todo move mapKeys and flat to a 42-cent-utility module
//todo move Prospect, CreditCard, Subscription plan to a 42-cent-model module
module.exports = {
    BaseGateway: require('./lib/BaseGateway.js'),
    GatewayError: require('./lib/errors.js').GatewayError,
    flat: require('./lib/flat.js'),
    mapKeys: require('./lib/mapKeys.js'),
    Prospect: require('./lib/prospect.js'),
    CreditCard: require('./lib/creditCard.js'),
    SubscriptionPlan: require('./lib/subscriptionPlan.js')
};
