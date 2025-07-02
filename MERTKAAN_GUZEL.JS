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
        const html = `
                    <div class="carousel">
                        <div class="carousel-header">
                            <h2 class="title-primary">
                            Beğenebileceğinizi düşündüklerimiz
                            </h2>
                        </div>
                        <div class="nav nav-left">
                            <div class="carousel-arrow-icon-left"></div>
                        </div>
                        <div class="carousel-content"></div>
                        <div class="nav nav-right">
                            <div class="carousel-arrow-icon-right"></div>
                        </div>
                    </div>
                `;

        const carousel = document.createElement('div');
        carousel.classList.add('container');
        carousel.innerHTML = html;
        const section = document.querySelector('.Section2A');
        section.prepend(carousel);
        

        const products = JSON.parse(localStorage.getItem("products"));
        const carouselContent = document.querySelector('.carousel-content');
        products.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = element.name;
            carouselContent.appendChild(card);
        });
    };

    const buildCSS = () => {
        const css = `
            .carousel {
                position: relative;
                width: 50%;
                height: 50px; 
                margin: 0 auto;
                }

            .carousel-content {
                position: relative;
                overflow: hidden;
                transition: width .4s;
                height: 100%;
                }


            .card {
                height: 100%;
                background-color: yellow;
                position: absolute;
                z-index: 1;
                transition: left .4s cubic-bezier(.47,.13,.15,.89);
                }


            .nav {
                position: absolute;
                top: 50%;
                margin-top: -10px;
                background-color: rgba(150,150,150,.3);
                width: 20px;
                height: 20px;
                z-index: 2;
                cursor: pointer;
                border-radius: 50%;
                border: none;
                outline: none;
                color: white;
                }

            .nav-left {
                left: -25px;
                }

            .nav-right {
                right: -25px;
                }

            .carousel-arrow-icon-left {
                margin-left: 5px;
                margin-top: 2px;
                }

            .carousel-arrow-icon-right {
                margin-left: 7px;
                margin-top: 2px;
                }
        `;


        const style = document.createElement('style');
        style.classList.add('carousel-style');
        style.innerHTML = css;
        const head = document.querySelector('head');
        head.append(style);
    };

    const setEvents = () => {
        let carousel = document.querySelector('.carousel');
        let carouselContent = document.querySelector('.carousel-content');
        let cardElements = document.querySelectorAll('.card');
        let arrayOfCards = Array.from(cardElements);
        let numOfCardsDisplayed;
        let widthOfCard;
        let moving = true;

        function addClone() {
        let lastCard = carouselContent.lastElementChild.cloneNode(true);
        lastCard.style.left = (-widthOfCard) + "px";
        carouselContent.insertBefore(lastCard, carouselContent.firstChild);
        }

        function removeClone() {
        let firstCard = carouselContent.firstElementChild;
        firstCard.parentNode.removeChild(firstCard);
        }

        function moveCardsRight() {
        let cardElements = document.querySelectorAll('.card');
        let cardsArray = Array.from(cardElements);
        let width = 0;

        cardsArray.forEach(function(elem){
            elem.style.left = width + "px";
            width += widthOfCard;
        });
        addClone();
        }


        function moveCardsLeft() {
        let cardElements = document.querySelectorAll('.card');
        let cardsArray = Array.from(cardElements);
        cardsArray = cardsArray.reverse();
        let maxWidth = (cardsArray.length - 1) * widthOfCard;

        cardsArray.forEach(function(elem){
            maxWidth -= widthOfCard;
            elem.style.left = maxWidth + "px";
        });
        }



        function setScreenSize() {
        if ( window.innerWidth >= 768 ) {
            numOfCardsDisplayed = 4;
        } else if ( window.innerWidth >= 320 ) {
            numOfCardsDisplayed = 3;
        } else {
            numOfCardsDisplayed = 2;
        }
        getScreenSize();
        }

        function getScreenSize() {
        let cardElements = document.querySelectorAll('.card');
        let cardsArray = Array.from(cardElements);
        widthOfCard = ( carousel.offsetWidth  / numOfCardsDisplayed );
        let initialWidth = -widthOfCard;
        cardsArray.forEach(function(elem) {
            elem.style.width = widthOfCard + "px";
            elem.style.left = initialWidth + "px";
            initialWidth += widthOfCard;
        });
        }


        function moveRight() {
        if ( moving ) {
            moving = false;
            let lastCard = carouselContent.lastElementChild;
            lastCard.parentNode.removeChild(lastCard);
            carouselContent.insertBefore(lastCard, carouselContent.firstChild);
            removeClone();
            let firstCard = carouselContent.firstElementChild;
            firstCard.addEventListener('transitionend', activateAgain);
            moveCardsRight();
        }
        }

        function activateAgain() {
        let firstCard = carouselContent.firstElementChild;
        moving = true;
        firstCard.removeEventListener('transitionend', activateAgain);
        }

        function moveLeft() {
        if ( moving ) {
            moving = false;
            removeClone();
            let firstCard = carouselContent.firstElementChild;
            firstCard.addEventListener('transitionend', replaceToEnd);
            moveCardsLeft();
        }
        }

        function replaceToEnd() {
        let firstCard = carouselContent.firstElementChild;
        firstCard.parentNode.removeChild(firstCard);
        carouselContent.appendChild(firstCard);
        firstCard.style.left = ( (arrayOfCards.length -1) * widthOfCard) + "px";
        addClone();
        moving = true;
        firstCard.removeEventListener('transitionend', replaceToEnd);
        }

        setScreenSize();

        moveCardsRight();

        window.addEventListener('resize', setScreenSize);

        let rightNav = document.querySelector('.nav-right');
        rightNav.addEventListener('click', moveLeft);

        let leftNav = document.querySelector('.nav-left');
        leftNav.addEventListener('click', moveRight);
    };

    init();
})();