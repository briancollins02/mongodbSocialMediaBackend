const moment = require('moment');

function processDate(timestamp) {
    const dateObj = new Date(timestamp);
    const formattedDate = moment(dateObj).format('MMMM Do YYYY, h:mm:ss a')

    return formattedDate 
};


module.exports = processDate(timestamp);