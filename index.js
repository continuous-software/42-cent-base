module.exports = {
    BaseGateway: require('./lib/BaseGateway.js'),
    GatewayError: require('./lib/errors.js').GatewayError,
    flat: require('./lib/flat.js'),
    mapKeys: require('./lib/mapKeys.js'),
    Prospect: require('./lib/prospect.js'),
    CreditCard: require('./lib/creditCard.js')
};
