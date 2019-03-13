; (function () {
    'use strict'
    window.tomatoPage = {
        boot,
    };
    function boot(el, config) {
        tomatoPage.rootEl = document.querySelector(el);
        tomatoPage.config = config;
        tomatoPage.pageAmount = Math.ceil(config.total / config.limit);

        prepare();
        tomatoPage.config.onChange(tomatoPage) ;
    };

    function prepare() {
        let html = `<span class="Tspecial">
                        <button class="Tfirst">first</button>
                        <button class="Tprev">prev</button>
                    </span>
                    <span class="Tpage-list">
                    </span>
                    <span class="Tspecial">
                        <button class="Tnext">next</button>
                        <button class="Tlast">last</button>
                    </span>`;
        let root = tomatoPage.rootEl;
        root.innerHTML = html;

        tomatoPage.prev = root.querySelector('.Tprev');
        tomatoPage.next = root.querySelector('.Tnext');
        tomatoPage.first = root.querySelector('.Tfirst');
        tomatoPage.last = root.querySelector('.Tlast');
        tomatoPage.pageList = root.querySelector('.Tpage-list');

        for (let index = 1; index <= tomatoPage.pageAmount; index++) {
            let button = document.createElement('button');
            button.innerHTML = index;
            button.$index = index;

            tomatoPage.pageList.appendChild(button);
        }
        setPage(1);
        root.addEventListener('click', e => {
            let klass = e.target.classList;
            if (klass.contains('Tfirst')) {
                setPage(1);
            } else
                if (klass.contains('Tprev')) {
                    if (tomatoPage.currentPage == 1)
                        return;
                    setPage(tomatoPage.currentPage - 1);
                } else
                    if (klass.contains('Tnext')) {
                        if (tomatoPage.currentPage == tomatoPage.pageAmount)
                            return;
                        setPage(tomatoPage.currentPage + 1);
                    } else
                        if (klass.contains('Tlast')) {
                            setPage(tomatoPage.pageAmount);
                        } else {
                            setPage(e.target.$index);
                        }
        });

    }

    function setPage(index) {
        let buttons = tomatoPage.pageList.querySelectorAll('button');
        tomatoPage.currentPage = index;
        buttons.forEach(button => {
            button.$index == index ?
                button.classList.add('active') :
                button.classList.remove('active');
        });
    }
})();