(()=>{"use strict";const t=[{img:"/img/slide_1.png"},{img:"/img/slide_2.png"},{img:"/img/slide_3.png"}],e=document.querySelector(".slider__image"),s=document.querySelectorAll(".slider__dot");let o=0;function i(i){o!=i&&(s[o].classList.toggle("slider__dot_active"),s[i].classList.toggle("slider__dot_active"),e.src=t[i].img,o=i)}for(let t=0;t<s.length;t++)s[t].addEventListener("click",(()=>{i(t)}));setInterval((function(){o==t.length-1?i(0):i(o+1)}),5e3);let n=[],l=0;const c=document.querySelector(".header__shoping-cart-quantity"),u=document.querySelector(".header__shoping-cart-quantity-text");!function(){n=document.querySelectorAll(".button_buy-button");for(let t=0;t<n.length;t++)n[t].addEventListener("click",(()=>{var e;n[e=t].classList.contains("button_buy-button-active")?(n[e].classList.toggle("button_buy-button-active"),n[e].classList.toggle("button_buy-button-disabled"),n[e].innerText="in the cart",l++,1==l&&c.classList.toggle("header__shoping-cart-quantity_disabled"),u.innerText=l):(n[e].classList.toggle("button_buy-button-active"),n[e].classList.toggle("button_buy-button-disabled"),n[e].innerText="buy now",l--,0==l&&c.classList.toggle("header__shoping-cart-quantity_disabled"),u.innerText=l)}))}();const a=["subject:Architecture","subject:Art","subject:Biography&Autobiography","subject:Business","subject:Crafts&Hobbies","subject:Drama","subject:Fiction","subject:Cooking","subject:Health&Fitness","subject:History","subject:Humor","subject:Poetry","subject:Psychology","subject:Science","subject:Technology","subject:Travel"];!async function(){let t=await async function(t){let e=[];return await fetch(`https://www.googleapis.com/books/v1/volumes?q="${t}"&key=AIzaSyDQNaxmJEUQ2_ySf9hL41JpK439DoaBxwY&printType=books&startIndex=0&maxResults=6&langRestrict=en`).then((t=>t.json())).then((t=>{let s={};for(let o=0;o<6;o++){if(s={},t.items[o].volumeInfo.authors.length>1){let e=t.items[o].volumeInfo.authors.join(", ");s.author=e}else s.author=t.items[o].volumeInfo.authors[0];s.cover=t.items[o].volumeInfo.imageLinks.thumbnail,s.title=t.items[o].volumeInfo.title,s.rating=t.items[o].volumeInfo.averageRating,s.reviews=t.items[o].volumeInfo.ratingsCount,s.description=t.items[o].volumeInfo.description,"NOT_FOR_SALE"==t.items[o].saleInfo.saleability?s.price="no data":s.price=t.items[o].saleInfo.retailPrice.amount,e.push(s)}})),e}(a[0]);console.log(t),console.log(t[0].author)}()})();