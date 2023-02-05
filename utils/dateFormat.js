const moment = require('moment');

module.exports = (timestamp) => {
    const dateObj = new Date(timestamp);
    const formattedDate = moment(dateObj).format('MMMM Do YYYY, h:mm:ss a')

    return formattedDate 
};