; (function () {
    'use strict'
    //variable prepare
    let table, struct, data, thead, tbody, operations;

    //expose variables to global
    window.$render = { boot, render };

    /**
     * @description boot
     * @param {string} tableSelecter
     * @param {object} structure
     * @param {object} list
     * @param {object} ops
     */
    function boot(tableSelecter, structure, list, ops) {
        //select table
        table = document.querySelector(tableSelecter);

        //create thead,tbody and append to table
        let theadHtml = document.createElement('thead'),
            tbodyHtml = document.createElement('tbody');
        table.appendChild(theadHtml);
        table.appendChild(tbodyHtml);
        thead = table.tHead;
        tbody = table.tBodies[0];
        operations = ops;

        //update variables
        struct = structure;
        data = list;

        //call main render
        render();
    }

    /**
     * @description main render
     */
    function render() {
        theadRender();
        tbodyRender();
    }

    /**
     * @description thead render
     */
    function theadRender() {
        //prepare html
        let html = '';
        //for every key in struct
        for (const key in struct) {
            //input the title of each column e.g. name,phone...
            html += `<th>${struct[key]}</th>`;
        }
        //if operations then add the operation column
        if (operations) {
            html += `<th>操作</th>`
        }
        //add to thead
        thead.innerHTML = html;
    }

    /**
     * @description tbody render
     */
    function tbodyRender() {
        //for each user information 
        let idCount = 0;
        data.forEach(it => {
            it.id = idCount;
            idCount++;
            //prepare htmls
            let html = "";
            let opsHtml = '';
            //create a tr element
            let tr = document.createElement('tr');
            //in each tr...
            for (const key in struct) {
                //input each user's detail e.g. frank,number...
                html += `<td>${it[key] || '-'}</td>`;
            }
            //put html on tr
            tr.innerHTML = html;
            //if operations then create buuttons for operation column
            if (operations) {
                //create element
                opsHtml = document.createElement('td');
                //append to tr
                tr.appendChild(opsHtml);
                // for every action in operations create a button and bind events to it
                for (let item in operations) {
                    //create button html
                    let button = document.createElement('button');
                    let action = operations[item];
                    //add button class
                    button.classList.add(action.name);
                    //add button name
                    button.innerText = action.name;
                    //append button to td
                    opsHtml.appendChild(button);
                    //bind events via class name
                    tr
                        .querySelector('.' + action.name)
                        .addEventListener('click', e => {
                            //button custom function
                            action.action(it);
                        });
                }
            }
            //append to tbody
            tbody.appendChild(tr);
            it.tr=tr;
        });
    }
})();