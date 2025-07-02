(() => {
    const init = () => {
        if (window.location.href !== 'https://www.e-bebek.com/') {
            console.log('wrong page');
            return;
        }

        if (localStorage.getItem("products") === null) {
            fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("products", JSON.stringify(data));
                    buildHTML();
                    buildCSS();
                    setEvents();
                });
        } else {
            buildHTML();
            buildCSS();
            setEvents();
        }

        
    };

    const buildHTML = () => {
        const products = JSON.parse(localStorage.getItem("products"));
        console.log(products);
        const html = `
            <h1>Merhaba Dünya</h1>
            <p>Bu bir örnek uygulamadır.</p>
        `;

        $carousel = $('div');
        $carousel.classList.add('carousel');
        $carousel.innerHTML = html;
        $('.Section2A').prepend($carousel);

        // There is no html element containing the "product-detail" class.
        // const html = `
        //     <div class="container">
        //         <h1></h1>
        //         <p>Bu bir örnek uygulamadır.</p>
        //     </div>
        // `;
        // $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
            .carousel {
                background-color: red;
                height: 100px;
                width: 100px;
            }
        `;

        $newStyle = $('style');
        $newStyle.classList.add('carousel-style');
        $newStyle.innerHTML = css;
        $('head').append($newStyle);

        // $('<style>').addClass('carousel-style')
        //             .html(css)
        //             .appendTo('head');
    };

    const setEvents = () => {
        $('.carousel').addEventListener('click', () => {
            console.log('clicked');
        });
        // $('.carousel').on('click', () => {
        //     console.log('clicked');
        // });
    };

    init();
})();