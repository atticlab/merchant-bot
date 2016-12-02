var Conf    = require('../config'),
    Handler = require('./Handler');

var Stream = () => {

    Conf.horizon.transactions()
        .cursor('now')
        .stream({
            onmessage: function (transaction) {
                Handler(transaction);
            },
            onerror: function (error) {
                Conf.log.error(Conf.errors.horizon_err);
                Conf.log.error(error);
            }
        });
}

module.exports = Stream;