import api from './api'
export default {
    email(email) {
        if (!email.includes("@")) return false;
        return true;
    },
    phone(phone) {
        if (
            (phone.length != 11 && phone.length != 13 && phone.length != 14) ||
            !phone.startsWith("1")
        )
            return false;
        return true;
    },
    regex(value,regex){
        if(typeof regex == 'string')
            regex = new RegExp(regex);
        
        return regex.test(value)
    },
    unique(value,model,action,prop){
        return api(`${model}/${action}`,{where:{
            and:{
                [prop]:value
            }
        }}).then(r=>{
            return !r.data;
        });
    },
    required(value){
        return !!(value || value === 0);
    },
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
        if(!value) return false;
        
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
    isIn(value,arr){
        return arr.indexOf(value) !== value;
    },
};
