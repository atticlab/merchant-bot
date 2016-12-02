var Conf   = require('../config');

var Helpers = {
    decodeRiakData: function (string) {
        return JSON.parse(string);
    },
    encodeRiakData: function (object) {
        return JSON.stringify(object);
    },
    getObjectByBucketAndID: function(bucket, id) {
        var fetchOptions = {
            bucketType: Conf.riak_options.default_bucket_type,
            bucket: bucket,
            key: id
        };

        return new Promise(function (resolve, reject) {
            Conf.riak.fetchValue(fetchOptions, function (err, rslt) {
                if (err) {
                    Conf.log.error('Error while trying get object from bucket [' + bucket + '] with id [' + id + ']. Details below');
                    Conf.log.error(err);
                } else if (rslt.isNotFound) {
                    Conf.log.error('Object in bucket [' + bucket + '] with id [' + id + '] not found');
                } else {
                    resolve(rslt.values.shift());
                }
                reject();
            });
        });
    },
    updateRiakObject: function(riakObj, data) {
        riakObj.setValue(Helpers.encodeRiakData(data));

        return new Promise(function (resolve, reject) {
            Conf.riak.storeValue({ value: riakObj }, function (err, rslt) {
                if (err) {
                    reject(err);
                }
                resolve(rslt);
            });
        });
    }
};
module.exports = Helpers;