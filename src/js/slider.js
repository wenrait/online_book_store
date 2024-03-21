import { banner, banners, previousButton } from './variables'

function changeButtons(button) {
    previousButton.classList.remove(`main__banner__nav__button_selected`);
    button.classList.add(`main__banner__nav__button_selected`);

    previousButton = button;
}

function changeBanner(id) {
    banner.style.opacity = 0;

    setTimeout(() => {
        banner.src = banners[id].src;
        banner.alt = banners[id].alt;
    }, 500)
    
    banner.onload = function() {
        banner.style.opacity = 1
    }
}

export {changeButtons, changeBanner}

