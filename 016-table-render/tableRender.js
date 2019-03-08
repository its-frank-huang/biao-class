; (function () {
    'use strict'
    //variable prepare
    let table, struct, data, thead, tbody;

    //expose variables to global
    window.$render = { boot };

    /**
     * @description boot
     * @param {string} tableSelecter
     * @param {object} structure
     * @param {object} list
     */
    function boot(tableSelecter, structure, list) {
        //select table
        table = document.querySelector(tableSelecter);

        //create thead,tbody and append to table
        let theadHtml = document.createElement('thead'),
        tbodyHtml = document.createElement('tbody');
        table.appendChild(theadHtml);
        table.appendChild(tbodyHtml);
        thead = table.tHead;
        tbody = table.tBodies[0];
        
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
        //for every key in struct
        for (const key in struct) {
            //create a th element
            let th = document.createElement('th');
            //input the title of each column e.g. name,phone...
            th.innerText = struct[key];
            //append to thead
            thead.appendChild(th);
        }
    }

    /**
     * @description tbody render
     */
    function tbodyRender() {
        //for each user information 
        data.forEach(it => {
            //create a tr element
            let tr = document.createElement('tr');
            //in each tr...
            for (const key in struct) {
                //create a td element
                let td = document.createElement('td');
                //input each user's detail e.g. frank,number...
                td.innerText = it[key] || "-";
                //append to tr
                tr.appendChild(td);
            }
            //append to tbody
            tbody.appendChild(tr);
        });
    }
})();