const { Utils } = require('@koushikpuppala/erela.js');

module.exports = (duration) => {
    if(isNaN(duration) || typeof duration === 'undefined') return '00:00';
    if(duration > 3600000000) return 'Live';
    return Utils.formatTime(duration, true);
};