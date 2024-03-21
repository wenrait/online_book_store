import { API_KEY, startIndex, subject, books, categories, counter, cart } from './variables'

function createNode(parentNode, tag, className, innerHTML) {
    const node = document.createElement(tag);
    node.className = className;
    node.innerHTML = innerHTML;
    parentNode.append(node);

    return node
}

function useRequest(subject, key, startIndex) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
    .then(response => response.json())
    .then((json) => {
        displayResult(json);
        console.log(json)
    })
}

function getLocaLStorageData() {
    if (JSON.parse(localStorage.getItem(`cart`)).length > 0) {
        cart = JSON.parse(localStorage.getItem(`cart`));
        switchCounter();
    }
}

function switchCounter() {
    counter.textContent = cart.length;
    counter.style.opacity = cart.length > 0 ? 1 : 0;
}

categories.forEach((category) => {
    category.addEventListener(`click`, () => {
        startIndex = 0;
        subject = category.id;
        const previousCategory = document.querySelector(`.main__books__ul__li_selected`);
        previousCategory.classList.remove(`main__books__ul__li_selected`);
        category.classList.add(`main__books__ul__li_selected`);
        books.innerHTML = ``;
        useRequest(subject, API_KEY, startIndex);
    });
});


function displayStars(rating) {
    let int = Math.floor(rating);
    let fract = Math.floor((rating - Math.floor(rating))*100);

    const stars = document.createElement(`div`);

    function displayStar(fill) {
       createNode(stars, `div`, `star`, `
        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="Gradient1" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="${fract}%" stop-color="#F2C94C" />
                    <stop offset="${fract}%" stop-color="#EEEDF5" />
                </linearGradient>
            </defs>
            <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="${fill}" />
        </svg>`
        );
    }

    for (let i = 1; i < 6; i++) {
        displayStar(`${i <= int ? `#F2C94C` : i === int + 1 ? `url(#Gradient1)` : `#EEEDF5`}`)
    }

    return stars.innerHTML
}


function displayResult(apiData) {
    startIndex > 0 ? document.querySelector(`.main__button`).remove() : ``;

    apiData.items.forEach((item) => {
        function setProperty(property) {
            switch(property) {
                case `imageLinks`:
                    return `<img src="${item.volumeInfo.hasOwnProperty(property) ? item.volumeInfo.imageLinks.thumbnail : `/src/svg/no-image.svg`}" class="img book__img">`
                case `authors`:
                    return item.volumeInfo.hasOwnProperty(property) ? `<p class="book__author">${item.volumeInfo.authors.join(`, `)}</p>` : ``
                case `averageRating`:
                    return item.volumeInfo.hasOwnProperty(property) ? `<div class="book__rating"><div class="book__rating__stars">${displayStars(item.volumeInfo.averageRating)}</div> ${item.volumeInfo.ratingsCount} reviews</div>` : ``
                case `description`:
                    return item.volumeInfo.hasOwnProperty(property) ? `<p class="book__description">${item.volumeInfo.description}</p>` : ``
                case `retailPrice`:
                    return item.saleInfo.hasOwnProperty(property) ? `<p class="book__price">${item.saleInfo.retailPrice.amount} ${item.saleInfo.retailPrice.currencyCode}</p>` : ``
                case `buttonClass`:
                    return cart.includes(item.id) ? `book__button_selected` : `book__button_buy`
                case `buttonText`:
                    return cart.includes(item.id) ? `in the cart` : `buy now`
                }
        }

        const book = createNode(books, `div`, `main__books__content__book`, setProperty(`imageLinks`));
        const info = createNode(book, `div`, `book__info`, `
            <div class="book__info__main">
                ${setProperty(`authors`)}
                <p class="book__title">${item.volumeInfo.title}</p>
                ${setProperty(`averageRating`)}
            </div>
            ${setProperty(`description`)}
            ${setProperty(`retailPrice`)}`);

        const button = createNode(info, `button`, `book__button ${setProperty(`buttonClass`)}`, setProperty(`buttonText`));
        button.addEventListener(`click`, () => {
            button.className = cart.includes(item.id) ? `book__button book__button_buy` : `book__button book__button_selected`;
            button.innerHTML = cart.includes(item.id) ?  `buy now` : `in the cart`;
            cart.includes(item.id) ? cart.splice(cart.indexOf(item.id), 1) : cart.push(item.id);

            localStorage.setItem(`cart`, JSON.stringify(cart));
            switchCounter();
        });        
    });

    const loadButton = createNode(books, `button`, `main__button`, `load more`);
    loadButton.addEventListener(`click`, () => {
        startIndex += 6;
        useRequest(subject, API_KEY, startIndex);
    });
}

export { getLocaLStorageData, useRequest, API_KEY }