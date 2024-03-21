(()=>{"use strict";const e=document.querySelectorAll(".main__banner__nav__button"),t=document.querySelector(".main__banner__svg"),n=[{src:"/src/svg/main__banner__svg_1.svg",alt:"BLACK FRIDAY SALE: up to 60%"},{src:"/src/svg/main__banner__svg_2.svg",alt:"Top 10 books for entrepreneurs"},{src:"/src/svg/main__banner__svg_3.svg",alt:"Check out our cozy books selection"}];let o,s=document.querySelector(".main__banner__nav__button_selected"),r=0,a="Architecture";const i=document.querySelector(".main__books__content"),_=document.querySelectorAll(".main__books__ul__li"),c=document.querySelector(".header__nav__button__cart__counter");let l=[];function u(e){s.classList.remove("main__banner__nav__button_selected"),e.classList.add("main__banner__nav__button_selected"),s=e}function d(e){t.style.opacity=0,setTimeout((()=>{t.src=n[e].src,t.alt=n[e].alt}),500),t.onload=function(){t.style.opacity=1}}function m(e,t,n,o){const s=document.createElement(t);return s.className=n,s.innerHTML=o,e.append(s),s}function b(e,t,n){fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${e}"&key=${t}&printType=books&startIndex=${n}&maxResults=6&langRestrict=en`).then((e=>e.json())).then((e=>{g(e),console.log(e)}))}function v(){c.textContent=l.length,c.style.opacity=l.length>0?1:0}function g(e){r>0&&document.querySelector(".main__button").remove(),e.items.forEach((e=>{function t(t){switch(t){case"imageLinks":return`<img src="${e.volumeInfo.hasOwnProperty(t)?e.volumeInfo.imageLinks.thumbnail:"/src/svg/no-image.svg"}" class="img book__img">`;case"authors":return e.volumeInfo.hasOwnProperty(t)?`<p class="book__author">${e.volumeInfo.authors.join(", ")}</p>`:"";case"averageRating":return e.volumeInfo.hasOwnProperty(t)?`<div class="book__rating"><div class="book__rating__stars">${function(e){let t=Math.floor(e),n=Math.floor(100*(e-Math.floor(e)));const o=document.createElement("div");for(let e=1;e<6;e++)m(o,"div","star",`\n        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <defs>\n                <linearGradient id="Gradient1" x1="0" x2="1" y1="0" y2="0">\n                    <stop offset="${n}%" stop-color="#F2C94C" />\n                    <stop offset="${n}%" stop-color="#EEEDF5" />\n                </linearGradient>\n            </defs>\n            <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="${e<=t?"#F2C94C":e===t+1?"url(#Gradient1)":"#EEEDF5"}" />\n        </svg>`);return o.innerHTML}(e.volumeInfo.averageRating)}</div> ${e.volumeInfo.ratingsCount} reviews</div>`:"";case"description":return e.volumeInfo.hasOwnProperty(t)?`<p class="book__description">${e.volumeInfo.description}</p>`:"";case"retailPrice":return e.saleInfo.hasOwnProperty(t)?`<p class="book__price">${e.saleInfo.retailPrice.amount} ${e.saleInfo.retailPrice.currencyCode}</p>`:"";case"buttonClass":return l.includes(e.id)?"book__button_selected":"book__button_buy";case"buttonText":return l.includes(e.id)?"in the cart":"buy now"}}const n=m(i,"div","main__books__content__book",t("imageLinks")),o=m(n,"div","book__info",`\n            <div class="book__info__main">\n                ${t("authors")}\n                <p class="book__title">${e.volumeInfo.title}</p>\n                ${t("averageRating")}\n            </div>\n            ${t("description")}\n            ${t("retailPrice")}`),s=m(o,"button",`book__button ${t("buttonClass")}`,t("buttonText"));s.addEventListener("click",(()=>{s.className=l.includes(e.id)?"book__button book__button_buy":"book__button book__button_selected",s.innerHTML=l.includes(e.id)?"buy now":"in the cart",l.includes(e.id)?l.splice(l.indexOf(e.id),1):l.push(e.id),localStorage.setItem("cart",JSON.stringify(l)),v()}))})),m(i,"button","main__button","load more").addEventListener("click",(()=>{r+=6,b(a,o,r)}))}_.forEach((e=>{e.addEventListener("click",(()=>{r=0,a=e.id,document.querySelector(".main__books__ul__li_selected").classList.remove("main__books__ul__li_selected"),e.classList.add("main__books__ul__li_selected"),i.innerHTML="",b(a,o,r)}))})),document.addEventListener("DOMContentLoaded",(()=>{let t=1;setInterval((()=>{t=t>2?0:t;let e=document.getElementById(t);u(e),d(e.id),t++}),5e3),e.forEach((e=>{e.addEventListener("click",(()=>{u(e),d(e.id),t=Number(e.id)+1}))})),JSON.parse(localStorage.getItem("cart")).length>0&&(l=JSON.parse(localStorage.getItem("cart")),v()),b("Architecture",o,0)}))})();
//# sourceMappingURL=script.js.map