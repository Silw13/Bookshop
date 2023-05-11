let buyButtons = [];
let shopingCartCount = 0;
const BOOK_COUNTER_EL = document.querySelector('.header__shoping-cart-quantity')
const BOOK_COUNTER_TXT = document.querySelector('.header__shoping-cart-quantity-text')

export function addBookToCart(buttonIndex) {
    if (buyButtons[buttonIndex].classList.contains('button_buy-button-active')) {
        buyButtons[buttonIndex].classList.toggle('button_buy-button-active')
        buyButtons[buttonIndex].classList.toggle('button_buy-button-disabled')
        buyButtons[buttonIndex].innerText = 'in the cart'
        shopingCartCount++;
        if (shopingCartCount == 1) {
            BOOK_COUNTER_EL.classList.toggle('header__shoping-cart-quantity_disabled')
        }
        BOOK_COUNTER_TXT.innerText = shopingCartCount;
    } else {
        buyButtons[buttonIndex].classList.toggle('button_buy-button-active')
        buyButtons[buttonIndex].classList.toggle('button_buy-button-disabled')
        buyButtons[buttonIndex].innerText = 'buy now'
        shopingCartCount--;
        if (shopingCartCount == 0) {
            BOOK_COUNTER_EL.classList.toggle('header__shoping-cart-quantity_disabled')
        }
        BOOK_COUNTER_TXT.innerText = shopingCartCount;
    }
}

export function arrangeBuyButtons() {
    buyButtons = document.querySelectorAll('.button_buy-button')
    for (let i = 0; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener('click', () => addBookToCart(i))
    }
}

arrangeBuyButtons()

// Добавить книги и каунтер в локал сторидж, отображение при закгрузке!