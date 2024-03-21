import '../scss/styles.scss';

import { bannerButtons, API_KEY }  from './variables.js';
import { changeButtons, changeBanner }  from './slider.js';
import { getLocaLStorageData, useRequest} from './books.js';


document.addEventListener(`DOMContentLoaded`, () => {
    let id = 1;
    let timerId = setInterval(() => {
        id = id > 2 ? 0 : id;

        let button = document.getElementById(id);

        changeButtons(button);
        changeBanner(button.id);

        id++;

    }, 5000);

    bannerButtons.forEach((button) => {
        button.addEventListener(`click`, () => {

            changeButtons(button);
            changeBanner(button.id);

            id = Number(button.id) + 1;
        });
    });

    getLocaLStorageData();

    let subject = `Architecture`;
    let startIndex = 0;
    useRequest(subject, API_KEY, startIndex);
});