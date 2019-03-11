; (function () {
    'use strict'
    window.is={
        min(value,guide){
            return value >= guide;
        },
        max(value,guide){
            return value <= guide;
        },
        minLength(value,guide){
            return value.length >= guide;
        },
        maxLength(value,guide){
            return value.length <= guide;
        },
        between(value,min,max){
            return value >= min && value <= max;
        },
        lengthBetween(value,min,max){
            return value.length >= min && value.length <= max;
        },
        numeric(value){
            return !isNaN(parseFloat(value));
        },
        startsWith(value,guide){
            return value.startsWith(guide);
        },
        endsWith(value,guide){
            return value.endsWith(guide);
        },
        in(value,arr){
            return arr.indexOf(value) !== value;
        },
    }
})();