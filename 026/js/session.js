window.$user = null;
boot();

function boot() {
    if (isLoggedIn()) load();
    else render();
}

function isLoggedIn() {
    return localStorage.getItem("TomatoSession");
}

function load() {
    api(
        "user/first",
        { id: isLoggedIn(), only: ["id", "username", "name"] },
        r => {
            $user = r.data;
            render();
        }
    );
}

function render() {
    if ($user) {
        navItemName.innerText = $user.name || $user.username;
        tourist.hidden = !(loggedIn.hidden = false);
    } else {
        tourist.hidden = !(loggedIn.hidden = true);
    }
}

function logOut(){
    localStorage.removeItem('TomatoSession');
    location.reload();
}