; (function () {
    'use strict'
    let todoList = document.querySelector('.todo-list'),
        todoForm = document.querySelector('#todo-form'),
        todoInput = todoForm.querySelector('input');

    let catList = document.querySelector('.cat-list'),
        catForm = document.querySelector('#cat-form'),
        catInput = catForm.querySelector('input'),
        catCancel = catForm.querySelector('.cancel'),
        addBtn = document.querySelector('.add button');

    boot();

    function boot() {

        todoRead();
        catRead();
        bindEvents();
    }

    function bindEvents() {
        todoSubmit();
        toggleCat();
        catSubmit();
    }

    function toggleCat() {
        addBtn.addEventListener('click', e => {
            setCatFormInvisible(true);
        });

        catCancel.addEventListener('click', e => {
            setCatFormInvisible(false);
        });
    }

    function setCatFormInvisible(invisible = true) {
        addBtn.hidden = invisible;
        catForm.hidden = !invisible;
    }

    function todoSubmit() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();

            if (todoInput._update) {
                todoUpdate(todoInput);
            }
            else {
                todoCreate(todoInput.value);
            }
            todoForm.reset();
        });
    }

    function catSubmit() {
        catForm.addEventListener('submit', e => {
            e.preventDefault();
            if (catInput._update) {
                catUpdate(catInput);
            }
            else {
                catCreate(catInput.value);
            }
            catForm.reset();
        });
    }

    function todoUpdate(input) {
        api('todo/update', { id: input._update, content: input.value }, r => {
            todoRead();
        });
    }

    function todoCreate(val) {
        api('todo/create', { content: val }, r => {
            todoRead();
        });
    }

    function todoRead() {
        api('todo/read', null, r => {
            todoRender(r.data);
        });
    }

    function todoRender(data) {
        todoList.innerHTML = "";
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
                <div class="content">${it.content}</div>
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
                    todoInput.value = it.content;
                    todoInput._update = it.id;
                    todoInput.focus();
                }

                if (target.classList.contains('remove')) {
                    api('todo/delete', { id: it.id }, r => {
                        todoRead();
                    });
                }
            });

            todoList.appendChild(item);
        });
    }

    function catUpdate(input) {
        api('cat/update', { id: input._update, name: input.value }, r => {
            catRead();
        });
    }

    function catCreate(val) {
        api('cat/create', { name: val }, r => {
            catRead();
        });
    }

    function catRead() {
        api('cat/read', null, r => {
            catRender(r.data);
        });
    }

    function catRender(data) {
        catList.innerHTML = "";
        data.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                <span></span>
                <span>${it.name}</span>
                <span class="operations">
                    <span class="update">Update</span>
                    <span class="delete">Delete</span>
                </span>
            `;

            let operations = item.querySelector('.operations');

            operations.addEventListener('click', e => {
                let klass = e.target.classList;

                if (klass.contains('update')) {
                    setCatFormInvisible(true);
                    catInput.value = it.name;
                    catInput._update = it.id;
                    catInput.focus();
                }

                if (klass.contains('delete')) {
                    api('cat/delete', { id: it.id }, r => {
                        catRead();
                    });
                }
            });

            catList.appendChild(item);
        });

    }

    function setComplete(id, checked) {
        api('todo/update', { id, completed: checked }, r => {
            todoRead();
        });
    }

})();