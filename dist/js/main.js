(()=>{"use strict";const t=[{img:"/img/slide_1.png"},{img:"/img/slide_2.png"},{img:"/img/slide_3.png"}],e=document.querySelector(".slider__image"),n=document.querySelectorAll(".slider__dot");let o=0;function i(i){o!=i&&(n[o].classList.toggle("slider__dot_active"),n[i].classList.toggle("slider__dot_active"),e.src=t[i].img,o=i)}for(let t=0;t<n.length;t++)n[t].addEventListener("click",(()=>{i(t)}));function s(t,e,n,o,i,s,c){const a=document.createElement("div");a.classList.add("main-content__book-card");const l=document.createElement("img");l.classList.add("main-content__book-cover"),0==e?l.setAttribute("src","/img/example-cover.png"):l.setAttribute("src",e),l.setAttribute("alt","book cover");const r=document.createElement("div");r.classList.add("main-content__book-info");const u=document.createElement("p");u.classList.add("main-content__book-author"),u.textContent=t;const m=document.createElement("p");m.classList.add("main-content__book-name"),m.textContent=n;const d=document.createElement("div");d.classList.add("main-content__book-rating");for(let t=0;t<5;t++){let e=Math.floor(o),n=document.createElement("span");n.classList.add("main-content__book-rating-star"),n.textContent="★",e-1>=t&&n.classList.add("main-content__book-rating-star_active"),d.append(n)}const g=document.createElement("span");g.classList.add("main-content__book-reviews"),g.textContent=`${i} review`;const b=document.createElement("p");b.classList.add("main-content__book-description"),b.textContent=s;const _=document.createElement("p");_.classList.add("main-content__book-price"),_.textContent=c;const v=document.createElement("button");v.classList.add("button","button_buy-button","button_buy-button-active"),v.textContent="buy now",d.append(g),r.append(u,m,d,b,_,v),a.append(l,r),document.querySelector(".main-content__book-catalog").append(a)}setInterval((function(){o==t.length-1?i(0):i(o+1)}),5e3);const c=["subject:Architecture","subject:Art","subject:Biography&Autobiography","subject:Business","subject:Crafts&Hobbies","subject:Drama","subject:Fiction","subject:Cooking","subject:Health&Fitness","subject:History","subject:Humor","subject:Poetry","subject:Psychology","subject:Science","subject:Technology","subject:Travel"],a="AIzaSyDQNaxmJEUQ2_ySf9hL41JpK439DoaBxwY",l=document.querySelector(".main-content__book-catalog"),r=document.querySelectorAll(".main-content__navigation-list-item"),u=document.querySelector(".button_load-more-button"),m=document.querySelector(".header__shoping-cart-quantity"),d=document.querySelector(".header__shoping-cart-quantity-text");let g,b,_=[],v=[],h=[];function p(t){v=[],v=document.querySelectorAll(".button_buy-button");for(let e=t;e<v.length;e++)v[e].addEventListener("click",(()=>{var t;v[t=e].classList.contains("button_buy-button-active")?(v[t].classList.toggle("button_buy-button-active"),v[t].innerText="in the cart",_.push(h[t]),console.log(_),1==_.length&&m.classList.toggle("header__shoping-cart-quantity_disabled"),d.innerText=_.length):(v[t].classList.toggle("button_buy-button-active"),v[t].innerText="buy now",_=_.filter((e=>JSON.stringify(e)!==JSON.stringify(h[t]))),console.log(_),0==_.length&&m.classList.toggle("header__shoping-cart-quantity_disabled"),d.innerText=_.length)})),console.log(v[e])}async function f(t,e){let n=[];return await fetch(`https://www.googleapis.com/books/v1/volumes?q="${t}"&key=${a}&printType=books&startIndex=${e}&maxResults=6&langRestrict=en`).then((t=>t.json())).then((t=>{let e={};for(let o=0;o<6;o++){if(e={},null==t.items[o].volumeInfo.authors)e.author="no author";else if(t.items[o].volumeInfo.authors.length>1){let n=t.items[o].volumeInfo.authors.join(", ");e.author=n}else e.author=t.items[o].volumeInfo.authors[0];null==t.items[o].volumeInfo.imageLinks?e.cover=!1:e.cover=t.items[o].volumeInfo.imageLinks.thumbnail,e.title=t.items[o].volumeInfo.title,e.rating=t.items[o].volumeInfo.averageRating,null==t.items[o].volumeInfo.ratingsCount?e.reviews="No":e.reviews=t.items[o].volumeInfo.ratingsCount,e.description=t.items[o].volumeInfo.description,"NOT_FOR_SALE"==t.items[o].saleInfo.saleability?e.price="no data":"FREE"==t.items[o].saleInfo.saleability?e.price="free":e.price=`${t.items[o].saleInfo.retailPrice.amount} ₽`,n.push(e)}})),n}async function y(t,e){b=0,g=e,l.replaceChildren(),h=[];let n=await f(t,b);document.querySelector(".main-content__navigation-list-item-active").classList.toggle("main-content__navigation-list-item-active"),r[e].classList.toggle("main-content__navigation-list-item-active");for(let t=0;t<6;t++)h.push(n[t]),s(n[t].author,n[t].cover,n[t].title,n[t].rating,n[t].reviews,n[t].description,n[t].price);p(b),L()}function L(){for(let t=0;t<h.length;t++)for(let e=0;e<_.length;e++)JSON.stringify(h[t])===JSON.stringify(_[e])&&(v[t].classList.toggle("button_buy-button-active"),v[t].innerText="in the cart")}for(let t=0;t<r.length;t++)r[t].addEventListener("click",(()=>{y(c[t],t)}));u.addEventListener("click",(()=>{!async function(){b+=6;let t=await f(g,b);for(let e=0;e<6;e++)h.push(t[e]),s(t[e].author,t[e].cover,t[e].title,t[e].rating,t[e].reviews,t[e].description,t[e].price);p(b),L()}()})),y(c[0],0),L()})();