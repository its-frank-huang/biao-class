; (function () {
    'use strict'
    let elform = document.querySelector('#form1'),
        eltable = document.querySelector('#table1'),
        inputs = elform.querySelectorAll('input'),
        users = [
            {
                username: 'whh',
                gender: 'female',
                email: 'whh@email.com',
                balance: 110
            },
            {
                username: 'ken',
                gender: 'male',
                email: 'ken@email.com',
                balance: 120
            },
        ];
    boot();
    function boot() {
        render();
        bindSubmit();
    }

    function bindSubmit() {
        elform.addEventListener('submit', e => {
            e.preventDefault();
            let data = {};
            inputs.forEach(input => {
                data[input.name] = input.value;
            })
            users.push(data);
            render()
            elform.reset();
        });
    }
    function render() {
        eltable.tBodies[0].innerHTML = "";
        users.forEach((user, index) => {
            if (user == null) { return; }
            let tr = document.createElement('tr');
            for (let key in user) {
                tr.innerHTML += `<td>${user[key]}</td>`;
            }
            tr.innerHTML += `<td>
                            <button class="delete">Delete</button>
                            <button class="update">Update</button>
                            </td>`;
            tr.addEventListener('click', e => {
                if (e.target.classList.contains('delete')) {
                    users[index] = null;
                    tr.remove();
                }
                if (e.target.classList.contains('update')) {
                    inputs.forEach(input=>{
                        if(input.name == 'gender'){
                            if(input.value==user[input.name]){
                                input.checked = true;
                            }
                            return;
                        }
                        input.value = user[input.name];
                    });
                    users[index] = null;
                    tr.remove();
                }
            });
            eltable.tBodies[0].appendChild(tr);

        });
    }
})();