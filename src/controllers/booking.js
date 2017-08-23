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
                    address : booknow.info.place,
                    agentIds: [booknow.info.photographer._id],
                    appointmentDate: booknow.info.date,
                    appointmentTime : booknow.info.from,
                    appointmentEndTime : booknow.info.to,
                    agentType  : booknow.info.photoseshType,
                    eventType   : booknow.info.eventType,
                    longitude: booknow.position.lng,
                    latitude : booknow.position.lat,
                    photoSeshNow  : booknow.book_type == 'now' ? true : false,
                    offset   : 420,
                    isReschedule    : false,
                    appointmentDuration    : booknow.info.duration,
                    previousBookingId    : '',
                    paymentCardId    : user.defaultCardId,
                    titleOrDescription: booknow.info.title
                }
            }
            request(option, function (error, response, body) {
                if(!error) return resolve(body);
            })
        })

    }
}