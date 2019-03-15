; (function () {
    'use strict'
    let rootEl = document.querySelector('.todo-list'),
        form = document.querySelector('form'),
        input = form.querySelector('input');

    boot();

    function boot() {

        read();

        bindEvents();
    }

    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();

            if (input._update) {
                update(input);
            }
            else {
                create(input.value);
            }
            form.reset();
        });
    }

    function update(input) {
        api('todo/update', { id: input._update, content: input.value }, r => {
            read();
        });
    }

    function create(val) {
        api('todo/create', { content: val }, r => {
            read();
        });
    }

    function read() {
        api('todo/read', null, r => {
            console.log(r.data);
            render(r.data);
        });
    }

    function render(data) {
        rootEl.innerHTML = "";
        data.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
                <div class="checkbox">
                    <label class="checkbox-input">
                        <input type="checkbox" ${it.completed ? 'checked' : ""}>
                        <span></span>
                    </label>
                </div>
                <div class="content">
                    ${it.content}
                </div>
                <div class="operations">
                    <button class="update">Update</button>
                    <button class="remove">Delete</button>
                </div>
            `;

            let checkbox = item.querySelector('.checkbox [type="checkbox"]');
            let operations = item.querySelector('.operations');

            checkbox.addEventListener('change', e => {
                setComplete(it.id, checkbox.checked);
            });

            operations.addEventListener('click', e => {
                let target = e.target;

                if (target.classList.contains('update')) {
                    input.value = it.content;
                    input._update = it.id;
                }

                if (target.classList.contains('remove')) {
                    api('todo/delete', { id: it.id }, r => {
                        read();
                    });
                }
            });

            rootEl.appendChild(item);
        });
    }

    function setComplete(id, checked) {
        api('todo/update', { id, completed: checked }, r => {
            read();
        });
    }

})();