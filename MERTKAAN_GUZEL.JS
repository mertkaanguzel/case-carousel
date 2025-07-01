(() => {
    const init = () => {
        buildHTML();
        buildCSS();
        setEvents();
    };

    const buildHTML = () => {
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