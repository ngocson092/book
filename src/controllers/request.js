/**
 * Created by lamtanphiho on 8/23/2017.
 */
const qs        = require('querystring')
const request   = require('request');

module.exports = {
    get : function (url, params = {}, header = {}) {
        return new Promise(function (resolve, reject) {
            request.get(process.env.API_URL+url+'?'+qs.stringify(params),header, function (error, response, body) {
                if(!error) return resolve(JSON.parse(body));
            })
        })

    },
    request: function (option) {
        return new Promise(function (resolve, reject) {
            request(option, function (error, response, body) {
                if(!error) return resolve(JSON.parse(body));
            })
        })

    }
}
