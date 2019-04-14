; (function(){
    'use strict'
    window.ms={
        set,
        get
    }
    
    function set(key,val){
        localStorage.setItem(key,JSON.stringify(val));
    }

    function get(key){
        let json = localStorage.getItem(key);
        return json ? JSON.parse(json) : "";
    }

})();
