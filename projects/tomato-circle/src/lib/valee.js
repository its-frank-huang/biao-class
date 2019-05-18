function email(email) {
    if (!email.includes("@")) return false;
    return true;
}

function phone(phone) {
    if (
        (phone.length != 11 && phone.length != 13 && phone.length != 14) ||
        !phone.startsWith("1")
    )
        return false;
    return true;
}

function regex(value,regex){
    if(typeof regex == 'string')
        regex = new RegExp(regex);
    
    return regex.test(value)
}

function min(value,guide){
    return value >= guide;
}
function max(value,guide){
    return value <= guide;
}
function minLength(value,guide){
    return value.length >= guide;
}
function maxLength(value,guide){
    return value.length <= guide;
}
function between(value,min,max){
    return value >= min && value <= max;
}
function lengthBetween(value,min,max){
    return value.length >= min && value.length <= max;
}
function numeric(value){
    return !isNaN(parseFloat(value));
}
function startsWith(value,guide){
    return value.startsWith(guide);
}
function endsWith(value,guide){
    return value.endsWith(guide);
}
function isIn(value,arr){
    return arr.indexOf(value) !== value;
}

export default {
    email,
    phone,
    regex,
    min,
    max,
    minLength,
    maxLength,
    between,
    lengthBetween,
    numeric,
    startsWith,
    endsWith,
    isIn,
};
