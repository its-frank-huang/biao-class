; (function () {
    'use strict'
    window.$validate = {
        isUsername,
        isEmail,
        isPhone,
        isPassword,
        betweenLength,
        between
    };
    /**
     * @param  {} username
     */
    function isUsername(username) {
        if (!betweenLength(username, 4, 20))
            return false;
        return true;
    }

    function isEmail(email) {
        if (!email.includes('@'))
            return false;
        return true;
    }

    function isPhone(phone) {
        if ((phone.length != 11 &&
            phone.length != 13 &&
            phone.length != 14) ||
            !phone.startsWith('1'))
            return false;
        return true;
    }

    function isPassword(password) {
        if (!betweenLength(password, 6, 20))
            return false;
        return true;
    }

    function betweenLength(str, min, max) {
        return str.length >= min && str.length <= max;
    }

    function between(num, min, max) {
        return num >= min && num <= max;
    }
})();