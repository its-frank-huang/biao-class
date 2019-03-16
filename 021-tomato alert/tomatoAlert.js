; (function () {
    'use strict'
    window.tomatoAlert = tomatoAlert;

    const defaultConfig = {
        type: 'info',
        timeout: 2000,
        clickToClose: true
    };

    function tomatoAlert(title, userConfig) {
        let config = { ...defaultConfig, ...userConfig, title };

        prepare(config);
        render(config);

        if (config.clickToClose)
            bindClick(config);

        open(config);

    }
    
    function open(config){
        
        setTimeout(e => {
            close(config);
        }, config.timeout);
    }

    function bindClick(config) {
        config.item.addEventListener('click', e => {
            close(config);
        });
    }

    function prepare(config) {
        if (!!document.querySelector('.tomatoAlertContainer')) {
            config.rootEl = document.querySelector('.tomatoAlertContainer');
            return;
        }
        config.rootEl = document.createElement('div');
        config.rootEl.classList.add('tomatoAlertContainer');
        document.body.appendChild(config.rootEl);
    }

    function close(config) {
        config.item.remove();
    }

    function render(config) {
        let item = document.createElement('div');
        item.classList.add('tomatoAlert');

        item.innerHTML = `
            <div class="inner">
                <div class="title">${config.title}</div>
                ${ config.desc ? `<div class="desc">${config.desc}</div>` : ""}
            </div>
            `;

        config.item = item;
        config.rootEl.appendChild(item);
    }
})();