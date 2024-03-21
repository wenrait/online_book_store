
const bannerButtons = document.querySelectorAll('.main__banner__nav__button');
const banner = document.querySelector(`.main__banner__svg`);

const banners = [
    {
        src: `/src/svg/main__banner__svg_1.svg`,
        alt: `BLACK FRIDAY SALE: up to 60%`
    },
    {
        src: `/src/svg/main__banner__svg_2.svg`,
        alt: `Top 10 books for entrepreneurs`
    },
    {
        src: `/src/svg/main__banner__svg_3.svg`,
        alt: `Check out our cozy books selection`
    },
];

let previousButton = document.querySelector(`.main__banner__nav__button_selected`);



let API_KEY;
let startIndex = 0;
let subject = `Architecture`;

const books = document.querySelector(`.main__books__content`);
const categories = document.querySelectorAll(`.main__books__ul__li`);
const counter = document.querySelector(`.header__nav__button__cart__counter`);

let cart = [];


export { bannerButtons, banner, banners, previousButton, API_KEY, startIndex, subject, books, categories, counter, cart }
