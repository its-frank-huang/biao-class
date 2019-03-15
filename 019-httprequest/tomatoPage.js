; (function () {
    'use strict'
    window.tomatoPage = {
        boot,
        render,
    };
    function boot(el, config) {
        tomatoPage.rootEl = document.querySelector(el);
        tomatoPage.config = config;
        tomatoPage.pageAmount = Math.ceil(config.total / config.limit);
        if (!tomatoPage.currentPage) {
            prepare();
        } else {
            setPage(tomatoPage.currentPage);
        }
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
        render(1);

        setPage(1);
        root.addEventListener('click', e => {
            let klass = e.target.classList;
            if (klass.contains('Tfirst')) {
                -
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

    function render(current) {
        tomatoPage.pageList.innerHTML = "";
        let start, end,
            range = 5,
            radius = Math.floor(range / 2);

        start = current - radius;
        end = current + radius;

        if (current - radius <= 0) {
            start = 1;
            end = start + range - 1;
        }

        if (current + radius >= tomatoPage.pageAmount) {
            end = tomatoPage.pageAmount;
            start = end - range + 1;
        }

        if (tomatoPage.pageAmount <= range) {
            start = 1;
            end = tomatoPage.pageAmount;
        }

        for (let index = start; index <= end; index++) {
            let button = document.createElement('button');
            button.innerHTML = index;
            button.$index = index;
            tomatoPage.pageList.appendChild(button);
        }
    }

    function setPage(index) {
        let buttons = tomatoPage.pageList.querySelectorAll('button');
        tomatoPage.currentPage = index;
        buttons.forEach(button => {
            if (button.$index == index) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        tomatoPage.config.onChange(index);
    }
})();