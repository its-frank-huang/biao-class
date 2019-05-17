import store from './store'

function loggedin(){
    
    return localStorage.getItem('sessionId');
}

function login(sessionId,user){
    localStorage.setItem('sessionId',sessionId);

    

    store.set('user',user);
}

function logout(redirect = '/#/login'){
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    location.href = redirect;
    location.reload();
}

function user(){
    return store.get('user');
}

function isAdmin(){
    return this.user().IS_ADMIN;
}

export default{
    loggedin,
    login,
    logout,
    user,
    isAdmin,
}