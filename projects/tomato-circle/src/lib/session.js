import store from './store'

function loggedin(){
    
    return localStorage.getItem('sessionId');
}

function login(sessionId,user){
    localStorage.setItem('sessionId',sessionId);
    store.set('user',user);
}

function logout(redirect = '/'){
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    location.href = redirect;
}

function user(){
    return store.get('user');
}

export default{
    loggedin,
    login,
    logout,
    user,
}