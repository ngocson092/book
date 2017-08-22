/**
 * Created by lamtanphiho on 8/22/2017.
 */
const request   = require('request');

module.exports = {
    postBooking: function (user, booknow) {
        return new Promise(function (resolve, reject) {
            const option = {
                method : 'POST',
                url : process.env.API_URL + '/bookingCorner/bookAppointmentRequestMultiple',
                headers: {
                    'authorization': user.accessToken
                },
                form : {
                    appointmentDate: booknow.info.date,
                    appointmentTime : booknow.info.from,
                    agentType  : booknow.info.photoseshType,
                    eventType   : booknow.info.eventType,
                    longitude: booknow.position.lng,
                    latitude : booknow.position.lat,
                    photoSeshNow  : booknow.book_type == 'now' ? true : false,
                    offset   : 42,
                    isReschedule    : true,
                    appointmentDuration    : booknow.info.duration,
                }
            }
            request(option, function (error, response, body) {
                if(!error) return resolve(body);
            })
        })

    }
}