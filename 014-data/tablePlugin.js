; (function () {
    'use strict'
    window.tablePlugin = {
        getData,
        putData
    }
    /**
     * @param  {HTMLElement} formid
     */
    function getData(formid) {
        let form = document.querySelector(formid),
            data = {},
            inputs = form.querySelectorAll('[name]');

        inputs.forEach(element => {
            switch (element.type) {
                case "number":
                    data[element.name] = parseFloat(element.value);
                    break;
                case 'text':
                    data[element.name] = element.value;
                    break;
                case 'radio':
                    if (!element.checked)
                        return;
                    data[element.name] = element.value;
                    break;
                case 'checkbox':
                    if (!Array.isArray(data[element.name]))
                        data[element.name] = [];
                    if (!element.checked)
                        return;
                    data[element.name].push(element.value);
                    break;
            }
        });
        return data;
    }
    /**
     * @param  {object} data
     * @param  {HTMLElement} formid
     */
    function putData(data, formid) {
        let form = document.querySelector(formid);
        for (const key in data) {
            let input = form.querySelector(`[name=${key}]`);
            switch (input.type) {
                case 'radio':
                    let radio = form.querySelector(`[value=${data[key]}]`)
                    if (radio.value == data[key])
                        radio.checked = true;
                    break;
                case 'checkbox':
                    data[key].forEach(it => {
                        let checkbox = form.querySelector(`[name=${key}][value=${it}]`);
                        checkbox && (checkbox.checked = true);
                    });

                    break;
                default:
                    input.value = data[key];
                    break;
            }
        }
    }
})();
