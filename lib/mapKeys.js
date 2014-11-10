var _ = require('lodash');

module.exports = function mapKeys(source, schema, target) {
    var obj = target || {};

    _.forOwn(schema, function (value, key) {

        if (source[key]) {
            if (_.isFunction(value)) {
                value(source[key], key, source, obj);
            } else {
                obj[value] = source[key];
            }
        }

    });

    return obj;
};
